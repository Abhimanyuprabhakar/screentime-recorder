import express from 'express';
import { saveTrackingData } from '../controllers/tracking.controller.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/', verifyToken, saveTrackingData);

export default router;
