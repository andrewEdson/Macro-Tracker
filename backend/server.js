import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import foodRoutes from "./routes/food.route.js";
import mealRoutes from "./routes/meal.route.js";
import dayLogRoutes from "./routes/dayLog.route.js";
import chatRoutes from "./routes/chat.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/daylogs", dayLogRoutes);
app.use("/api/chat", chatRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Macro Tracker API is running!" });
});

app.listen(PORT, async () => {
  console.log("Server started at http://localhost:" + PORT);
  await connectDB();
});
