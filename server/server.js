import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import trackingRouter from "./routes/tracking.route.js";
import activityRouter from "./routes/activity.route.js";
import domainRouter from "./routes/domain.route.js";
import healthRouter from "./routes/health.route.js";
import reminderRouter from "./routes/reminder.route.js";

const app = express();

// Connect DB once (cached for serverless reuse)
let dbConnected = false;
const ensureDB = async () => {
  if (!dbConnected) {
    await connectDB();
    try {
      const Category = (await import("./models/category.model.js")).default;
      await Category.initializeSystemCategories();
    } catch (e) {
      console.error("Category init failed:", e.message);
    }
    dbConnected = true;
  }
};

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://client-delta-navy-37.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// DB middleware — ensures connection before every request in serverless
app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(503).json({ error: "Database unavailable" });
  }
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tracking", trackingRouter);
app.use("/api/activity", activityRouter);
app.use("/api/domain", domainRouter);
app.use("/api/reminders", reminderRouter);
app.use("/api", healthRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// For local dev: start the server normally
if (process.env.NODE_ENV !== "production" || process.env.LOCAL_DEV === "true") {
  const port = process.env.PORT || 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on ${port}`);
  });
}

// For Vercel serverless: export the app
export default app;
