import Food from "../models/food.model.js";
import mongoose from "mongoose";

// Create a new food item
export const createFood = async (req, res) => {
  const { name, brand, servingSize, calories, protein, carbs, fats } = req.body;

  try {
    const food = new Food({
      name,
      brand,
      servingSize,
      calories,
      protein,
      carbs,
      fats,
    });

    await food.save();
    res.status(201).json({ message: "Food item created successfully", food });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all food items
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a food item from external API (openfoodfacts) and optionally save to DB
export const getFoodByName = async (req, res) => {
  const { name } = req.params;

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        name
      )}&search_simple=1&action=process&json=1`
    );
    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Helper function to get nutrition value from multiple possible fields (same as barcode function)
    const getNutrientValue = (nutriments, possibleKeys) => {
      for (const key of possibleKeys) {
        if (
          nutriments &&
          nutriments[key] !== undefined &&
          nutriments[key] !== null
        ) {
          return parseFloat(nutriments[key]) || 0;
        }
      }
      return 0;
    };

    // Process up to 3 products to give users options
    const foodOptions = data.products.slice(0, 3).map((product, index) => {
      const nutriments = product.nutriments || {};

      return {
        id: index + 1,
        name: product.product_name || `Unknown Product ${index + 1}`,
        brand: product.brands || "Unknown Brand",
        servingSize: product.serving_size || "100g",
        calories: getNutrientValue(nutriments, [
          "energy-kcal_100g",
          "energy_kcal_100g",
          "energy-kcal",
          "energy_kcal",
          "energy_100g",
        ]),
        protein: getNutrientValue(nutriments, [
          "proteins_100g",
          "proteins",
          "protein_100g",
          "protein",
        ]),
        carbs: getNutrientValue(nutriments, [
          "carbohydrates_100g",
          "carbohydrates",
          "carbs_100g",
          "carbs",
        ]),
        fats: getNutrientValue(nutriments, [
          "fat_100g",
          "fat",
          "fats_100g",
          "fats",
          "lipids_100g",
          "lipids",
        ]),
      };
    });

    res.status(200).json({
      message: `Found ${foodOptions.length} food options for ${name}`,
      searchTerm: name,
      totalResults: data.products.length,
      foodOptions: foodOptions,
      source: "OpenFoodFacts",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a food item by ID
export const deleteFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid food ID" });
  }

  try {
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search by barcode number
export const getFoodByBarcode = async (req, res) => {
  const { barcode } = req.params;

  // Validate barcode format (basic check)
  if (!barcode || barcode.length < 8) {
    return res.status(400).json({ message: "Invalid barcode format" });
  }

  try {
    const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res
        .status(500)
        .json({ message: "Failed to fetch from external API" });
    }

    const data = await response.json();

    if (!data.product || data.status === 0) {
      return res.status(404).json({
        message: "Food item not found for this barcode",
        barcode: barcode,
        suggestion:
          "Try scanning a different product or manually enter the food data",
        debug: {
          apiStatus: data.status,
          hasProduct: !!data.product,
        },
      });
    } // Create food object from product data
    const product = data.product;

    // Helper function to get nutrition value from multiple possible fields
    const getNutrientValue = (nutriments, possibleKeys) => {
      for (const key of possibleKeys) {
        if (
          nutriments &&
          nutriments[key] !== undefined &&
          nutriments[key] !== null
        ) {
          return parseFloat(nutriments[key]) || 0;
        }
      }
      return 0;
    };

    const nutriments = product.nutriments || {};

    const foodData = {
      name: product.product_name || "Unknown Product",
      brand: product.brands || "Unknown Brand",
      servingSize: product.serving_size || "100g",
      calories: getNutrientValue(nutriments, [
        "energy-kcal_100g",
        "energy_kcal_100g",
        "energy-kcal",
        "energy_kcal",
        "energy_100g",
      ]),
      protein: getNutrientValue(nutriments, [
        "proteins_100g",
        "proteins",
        "protein_100g",
        "protein",
      ]),
      carbs: getNutrientValue(nutriments, [
        "carbohydrates_100g",
        "carbohydrates",
        "carbs_100g",
        "carbs",
      ]),
      fats: getNutrientValue(nutriments, [
        "fat_100g",
        "fat",
        "fats_100g",
        "fats",
        "lipids_100g",
        "lipids",
      ]),
    };

    res.status(200).json({
      message: "Food data retrieved from barcode",
      food: foodData,
      source: "OpenFoodFacts",
      barcode: barcode,
    });
  } catch (error) {
    console.error(`Barcode search error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
