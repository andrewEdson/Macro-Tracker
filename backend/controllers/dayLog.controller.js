import DayLog from "../models/dayLog.model.js";
import mongoose from "mongoose";

// Create day log for a user
export const createDayLog = async (req, res) => {
  const { userID, date } = req.body;

  try {
    const dayLog = new DayLog({
      userID,
      date: new Date(date),
    });

    await dayLog.save();

    res.status(201).json({ message: "Day log created successfully", dayLog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get day log by user ID and date
export const getDayLog = async (req, res) => {
  const { userID, date } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const dayLog = await DayLog.findOne({
      userID,
      date: new Date(date),
    }).populate(["breakfast", "lunch", "dinner", "snack"]);

    if (!dayLog) {
      return res.status(404).json({ message: "Day log not found" });
    }

    res.status(200).json(dayLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update day log by user ID and date
export const updateDayLog = async (req, res) => {
  const { userID, date } = req.params;
  const { breakfast, lunch, dinner, snack } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const dayLog = await DayLog.findOneAndUpdate(
      { userID, date: new Date(date) },
      { breakfast, lunch, dinner, snack },
      { new: true, runValidators: true }
    ).populate(["breakfast", "lunch", "dinner", "snack"]);

    if (!dayLog) {
      return res.status(404).json({ message: "Day log not found" });
    }

    res.status(200).json(dayLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete day log by user ID and date
export const deleteDayLog = async (req, res) => {
  const { userID, date } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const dayLog = await DayLog.findOneAndDelete({
      userID,
      date: new Date(date),
    });

    if (!dayLog) {
      return res.status(404).json({ message: "Day log not found" });
    }

    res.status(200).json({ message: "Day log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
