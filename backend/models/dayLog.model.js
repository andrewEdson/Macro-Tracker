import mongoose from "mongoose";

const dayLogSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: () => {
        // Set to start of day (midnight) for consistent date comparison
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
      },
    },
    breakfast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
    lunch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
    dinner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
    snack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
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

// Calculate totals from referenced meals
dayLogSchema.methods.calculateTotals = async function () {
  // Populate meal references to get their totals
  await this.populate(["breakfast", "lunch", "dinner", "snack"]);

  this.totalCalories = 0;
  this.totalProtein = 0;
  this.totalCarbs = 0;
  this.totalFats = 0;

  // Sum up totals from each meal
  const meals = [this.breakfast, this.lunch, this.dinner, this.snack];
  meals.forEach((meal) => {
    if (meal) {
      this.totalCalories += meal.totalCalories || 0;
      this.totalProtein += meal.totalProtein || 0;
      this.totalCarbs += meal.totalCarbs || 0;
      this.totalFats += meal.totalFats || 0;
    }
  });
};

// Automatically calculate totals before saving
dayLogSchema.pre("save", async function (next) {
  await this.calculateTotals();
  next();
});

// Create unique index to prevent duplicate day logs for same user/date
dayLogSchema.index({ userID: 1, date: 1 }, { unique: true });

const DayLog = mongoose.model("DayLog", dayLogSchema);
export default DayLog;
