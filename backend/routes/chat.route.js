import express from "express";
import { sendMessage, getFoodMacros } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", sendMessage); // Send message to ChatGPT
router.post("/macros", getFoodMacros); // Get food macros from ChatGPT

export default router;
