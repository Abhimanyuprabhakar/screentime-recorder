import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../.env") });

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const cleanToken = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Silently reject invalid/expired tokens — expected when JWT_SECRET rotates
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export const optionalAuth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return next();
  }

  const cleanToken = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Invalid token on optional routes — just continue unauthenticated
    return next();
  }
};

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Authentication required" });
};
