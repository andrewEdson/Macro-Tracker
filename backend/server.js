import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import foodRoutes from "./routes/food.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Macro Tracker API is running!" });
});

app.listen(PORT, async () => {
  console.log("Server started at http://localhost:" + PORT);
  await connectDB();
});
