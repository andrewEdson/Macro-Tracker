import Meal from "../models/meal.model.js";
import mongoose from "mongoose";

// Create a new meal
export const createMeal = async (req, res) => {
  const { userID, name, foods } = req.body;

  // Validate required fields
  if (
    !userID ||
    !name ||
    !foods ||
    !Array.isArray(foods) ||
    foods.length === 0
  ) {
    return res.status(400).json({
      message: "Missing required fields",
      required: ["userID", "name", "foods (array)"],
      received: {
        userID: !!userID,
        name: !!name,
        foods: Array.isArray(foods) ? foods.length + " items" : "not an array",
      },
    });
  }

  // Validate userID format
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ message: "Invalid userID format" });
  }

  // Validate meal name
  const validMealNames = ["Breakfast", "Lunch", "Dinner", "Snack"];
  if (!validMealNames.includes(name)) {
    return res.status(400).json({
      message: "Invalid meal name",
      validOptions: validMealNames,
    });
  }

  // Validate each food item has required fields
  for (let i = 0; i < foods.length; i++) {
    const food = foods[i];
    const requiredFoodFields = [
      "name",
      "servingSize",
      "quantity",
      "calories",
      "protein",
      "carbs",
      "fats",
    ];

    for (const field of requiredFoodFields) {
      if (food[field] === undefined || food[field] === null) {
        return res.status(400).json({
          message: `Missing required field '${field}' in food item ${i + 1}`,
          requiredFoodFields,
        });
      }
    }

    // Validate numeric fields are positive
    if (
      food.quantity <= 0 ||
      food.calories < 0 ||
      food.protein < 0 ||
      food.carbs < 0 ||
      food.fats < 0
    ) {
      return res.status(400).json({
        message: `Invalid values in food item ${
          i + 1
        }. Quantity must be > 0, other values must be >= 0`,
      });
    }
  }

  try {
    const meal = new Meal({
      userID,
      name,
      foods,
    });

    await meal.save();
    res.status(201).json({
      message: "Meal created successfully",
      meal: {
        ...meal.toObject(),
        calculatedTotals: {
          calories: meal.totalCalories,
          protein: meal.totalProtein,
          carbs: meal.totalCarbs,
          fats: meal.totalFats,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a meal by ID
export const getMealById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid meal ID" });
  }

  try {
    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json({
      ...meal.toObject(),
      calculatedTotals: {
        calories: meal.totalCalories,
        protein: meal.totalProtein,
        carbs: meal.totalCarbs,
        fats: meal.totalFats,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a meal by ID
export const updateMeal = async (req, res) => {
  const { id } = req.params;
  const { name, foods } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid meal ID" });
  }

  // Validate meal name
  const validMealNames = ["Breakfast", "Lunch", "Dinner", "Snack"];
  if (name && !validMealNames.includes(name)) {
    return res.status(400).json({
      message: "Invalid meal name",
      validOptions: validMealNames,
    });
  }

  // Validate foods array
  if (foods && (!Array.isArray(foods) || foods.length === 0)) {
    return res.status(400).json({
      message: "Foods must be a non-empty array",
    });
  }

  try {
    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    // Update fields
    if (name) meal.name = name;
    if (foods) meal.foods = foods;

    await meal.save();
    res.status(200).json({
      message: "Meal updated successfully",
      meal: {
        ...meal.toObject(),
        calculatedTotals: {
          calories: meal.totalCalories,
          protein: meal.totalProtein,
          carbs: meal.totalCarbs,
          fats: meal.totalFats,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a food item to an existing meal
export const addFoodToMeal = async (req, res) => {
  const { id } = req.params;
  const { name, brand, servingSize, quantity, calories, protein, carbs, fats } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid meal ID" });
  }

  // Validate required food fields
  const requiredFoodFields = [
    "name",
    "servingSize",
    "quantity",
    "calories",
    "protein",
    "carbs",
    "fats",
  ];
  for (const field of requiredFoodFields) {
    if (req.body[field] === undefined || req.body[field] === null) {
      return res.status(400).json({
        message: `Missing required field '${field}'`,
        requiredFoodFields,
      });
    }
  }

  // Validate numeric fields are positive
  if (quantity <= 0 || calories < 0 || protein < 0 || carbs < 0 || fats < 0) {
    return res.status(400).json({
      message:
        "Invalid values. Quantity must be > 0, other values must be >= 0",
    });
  }

  try {
    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    // Add new food to the foods array
    const newFood = {
      name,
      brand,
      servingSize,
      quantity,
      calories,
      protein,
      carbs,
      fats,
    };

    meal.foods.push(newFood);
    await meal.save(); // This will trigger calculateTotals() automatically

    res.status(200).json({
      message: "Food added to meal successfully",
      meal: {
        ...meal.toObject(),
        calculatedTotals: {
          calories: meal.totalCalories,
          protein: meal.totalProtein,
          carbs: meal.totalCarbs,
          fats: meal.totalFats,
        },
      },
      addedFood: newFood,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a food item from a meal by food index
export const removeFoodFromMeal = async (req, res) => {
  const { id, foodIndex } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid meal ID" });
  }

  const index = parseInt(foodIndex);
  if (isNaN(index) || index < 0) {
    return res.status(400).json({ message: "Invalid food index" });
  }

  try {
    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    if (index >= meal.foods.length) {
      return res.status(400).json({ message: "Food index out of range" });
    }

    const removedFood = meal.foods[index];
    meal.foods.splice(index, 1);
    await meal.save(); // This will trigger calculateTotals() automatically

    res.status(200).json({
      message: "Food removed from meal successfully",
      meal: {
        ...meal.toObject(),
        calculatedTotals: {
          calories: meal.totalCalories,
          protein: meal.totalProtein,
          carbs: meal.totalCarbs,
          fats: meal.totalFats,
        },
      },
      removedFood,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a meal by ID
export const deleteMeal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid meal ID" });
  }

  try {
    const meal = await Meal.findByIdAndDelete(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
