import express from "express";
import {
  createMeal,
  getMealById,
  addFoodToMeal,
  updateMeal,
  removeFoodFromMeal,
  deleteMeal,
} from "../controllers/meal.controller.js";

const router = express.Router();

router.post("/", createMeal); // Create a new meal
router.get("/:id", getMealById); // Get a meal by ID
router.put("/:id", updateMeal); // Update a meal by ID
router.post("/:id/foods", addFoodToMeal); // Add food to a meal
router.delete("/:id/foods/:foodIndex", removeFoodFromMeal); // Remove food from a meal by index
router.delete("/:id", deleteMeal); // Delete a meal by ID
export default router;
