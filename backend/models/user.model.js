import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    goal: {
      type: String,
      enum: ["lose weight", "gain weight", "maintain weight"],
    },
    macroGoals: {
      calories: {
        type: Number,
        required: true,
      },
      protein: {
        type: Number,
        required: true,
      },
      carbs: {
        type: Number,
        required: true,
      },
      fats: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
