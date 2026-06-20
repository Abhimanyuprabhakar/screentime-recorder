import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../.env") });

export const googleOAuthEnabled = Boolean(
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CALLBACK_URL
);

if (googleOAuthEnabled) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });

          if (existingUser) {
            existingUser.lastLogin = new Date();
            existingUser.name = profile.displayName || existingUser.name;
            existingUser.picture =
              profile.photos?.[0]?.value || existingUser.picture;
            await existingUser.save();
            return done(null, existingUser);
          }

          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(new Error("Google account did not provide an email"));
          }

          const existingEmailUser = await User.findOne({ email });

          if (existingEmailUser) {
            existingEmailUser.googleId = profile.id;
            existingEmailUser.provider = "google";
            existingEmailUser.picture =
              profile.photos?.[0]?.value || existingEmailUser.picture;
            existingEmailUser.lastLogin = new Date();
            await existingEmailUser.save();
            return done(null, existingEmailUser);
          }

          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName || email.split("@")[0],
            email,
            picture: profile.photos?.[0]?.value,
            provider: "google",
            lastLogin: new Date()
          });

          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          console.error("Google OAuth error:", error);
          return done(error, null);
        }
      }
    )
  );
} else {
  console.warn(
    "Google OAuth is disabled. Configure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL to enable it."
  );
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-password");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
