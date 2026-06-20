import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });
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
const port = process.env.PORT || 3000;

// Initialize database and categories
const initializeApp = async () => {
  await connectDB();
  try {
    const Category = (await import("./models/category.model.js")).default;
    await Category.initializeSystemCategories();
    console.log("System categories initialized");
  } catch (error) {
    console.error("Category initialization failed:", error);
  }
};

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

initializeApp()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch(error => {
    console.error("Application startup failed:", error);
    process.exit(1);
  });
