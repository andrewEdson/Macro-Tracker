import express from "express";
import {
  createDayLog,
  getDayLog,
  updateDayLog,
  deleteDayLog,
} from "../controllers/dayLog.controller.js";

const router = express.Router();

router.post("/", createDayLog); // Create a new day log for a user on a specific date
router.get("/:userID/:date", getDayLog); // Get day log by user ID
router.put("/:userID/:date", updateDayLog); // Update day log by user ID and date
router.delete("/:userID/:date", deleteDayLog); // Delete day log by user ID

export default router;
