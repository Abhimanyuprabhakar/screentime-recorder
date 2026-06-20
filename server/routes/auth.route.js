import express from "express";
import passport, { googleOAuthEnabled } from "../config/passport.js";
import { verifyToken } from "../middleware/auth.js";
import {
  register,
  login,
  googleSuccess,
  googleFailure,
  getProfile,
  updateProfile,
  deleteAccount,
  logout,
  verifyToken as verifyTokenController
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/google", (req, res, next) => {
  if (!googleOAuthEnabled) {
    return res.status(503).json({
      success: false,
      message: "Google OAuth is not configured on this server"
    });
  }

  return passport.authenticate("google", {
    scope: ["profile", "email"],
    state: true
  })(req, res, next);
});

router.get("/google/callback", (req, res, next) => {
  if (!googleOAuthEnabled) {
    return res.redirect(
      `${process.env.CLIENT_URL}/login?error=google_oauth_not_configured`
    );
  }

  return passport.authenticate("google", {
    failureRedirect: "/api/auth/google/failure"
  })(req, res, () => googleSuccess(req, res, next));
});

router.get("/google/failure", googleFailure);

router.get("/verify", verifyToken, verifyTokenController);
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.delete("/account", verifyToken, deleteAccount);

router.post("/logout", logout);

export default router;
