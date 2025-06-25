import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
      required: true,
    },
    foods: [
      {
        name: {
          type: String,
          required: true,
        },
        brand: String,
        servingSize: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        calories: {
          type: Number,
          required: true,
          min: 0,
        },
        protein: {
          type: Number,
          required: true,
          min: 0,
        },
        carbs: {
          type: Number,
          required: true,
          min: 0,
        },
        fats: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalCalories: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalProtein: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalCarbs: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalFats: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Calculate totals based on foods and their quantities
mealSchema.methods.calculateTotals = function () {
  this.totalCalories = this.foods.reduce(
    (sum, food) => sum + (food.calories * food.quantity || 0),
    0
  );
  this.totalProtein = this.foods.reduce(
    (sum, food) => sum + (food.protein * food.quantity || 0),
    0
  );
  this.totalCarbs = this.foods.reduce(
    (sum, food) => sum + (food.carbs * food.quantity || 0),
    0
  );
  this.totalFats = this.foods.reduce(
    (sum, food) => sum + (food.fats * food.quantity || 0),
    0
  );
};

// Automatically calculate totals before saving
mealSchema.pre("save", function (next) {
  this.calculateTotals();
  next();
});

const Meal = mongoose.model("Meal", mealSchema);
export default Meal;
