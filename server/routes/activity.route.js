import express from "express";
import Activity from "../models/activity.model.js";
import {
  logActivity,
  getActivitySummary,
  getCategoryAnalytics,
  getProductivityInsights,
  getCategories,
  recategorizeActivities
} from "../controllers/activity.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/log", verifyToken, logActivity);
router.post("/", verifyToken, logActivity);
router.get("/summary", verifyToken, getActivitySummary);

// Category and productivity analytics
router.get("/analytics/categories", verifyToken, getCategoryAnalytics);
router.get("/analytics/productivity", verifyToken, getProductivityInsights);
router.get("/categories", verifyToken, getCategories);
router.post("/recategorize", verifyToken, recategorizeActivities);

router.post("/end-all", verifyToken, async (req, res) => {
  try {
    const result = await Activity.updateMany(
      { userId: req.user.id, isActive: true },
      {
        isActive: false,
        endTime: new Date(),
        action: "close"
      }
    );
    res.json({
      success: true,
      message: `Ended ${result.modifiedCount} active sessions`
    });
  } catch (err) {
    console.error("Error ending sessions:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to end active sessions" });
  }
});

router.delete("/clear-all", verifyToken, async (req, res) => {
  try {
    const result = await Activity.deleteMany({ userId: req.user.id });
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} activity records`
    });
  } catch (err) {
    console.error("Error clearing activity data:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to clear activity data" });
  }
});

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ success: true, message: "Activity API is available" });
});

export default router;
