import express from "express";
import {
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser); // Create a new user
router.get("/", getUsers); // Get all users
router.get("/:id", getUserById); // Get a user by ID
router.put("/:id", updateUser); // Update a user by ID
router.delete("/:id", deleteUser); // Delete a user by ID

export default router;
