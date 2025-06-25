import express from "express";
import {
  createFood,
  getFoods,
  getFoodByName,
  deleteFood,
  getFoodByBarcode,
} from "../controllers/food.controller.js";

const router = express.Router();

router.post("/", createFood); // Create a new food item
router.get("/", getFoods); // Get all food items
router.get("/search/:name", getFoodByName); // Get a food item by name from external API
router.delete("/:id", deleteFood); // Delete a food item by ID
router.get("/barcode/:barcode", getFoodByBarcode); // Get food item by barcode from external API
export default router;
