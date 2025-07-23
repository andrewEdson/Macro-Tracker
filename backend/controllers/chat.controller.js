import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Send message to ChatGPT
export const sendMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "Failed to contact ChatGPT" });
  }
};

// Get food macros from ChatGPT with web search capability
export const getFoodMacros = async (req, res) => {
  const { foodName, restaurant } = req.body;

  if (!foodName) {
    return res.status(400).json({ error: "No food name provided" });
  }

  try {
    let prompt;

    if (restaurant) {
      // Enhanced prompt for restaurant-specific items
      prompt = `
Search for and return the official nutritional information for "${foodName}" from "${restaurant}" restaurant. 

If you can find the exact nutritional data from ${restaurant}'s official menu or nutritional database, use that information. If not available, provide the best estimate based on similar items from that restaurant or comparable dishes.

Return the data in this exact JavaScript object format:

{
  name: "${foodName}",
  restaurant: "${restaurant}",
  calories: number,
  protein: number, // grams
  carbs: number,   // grams
  fat: number,     // grams
  source: "official" or "estimated"
}

Just return the object only, nothing else.
`;
    } else {
      // Standard prompt for general food items
      prompt = `
Return the estimated macros for "${foodName}" in the following JavaScript object format:

{
  name: "${foodName}",
  calories: number,
  protein: number, // grams
  carbs: number,   // grams
  fat: number      // grams
}

Just return the object only, nothing else.
`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a nutritional expert with access to comprehensive food and restaurant nutritional databases. Provide accurate macro information based on official sources when possible.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const codeBlock = response.choices[0].message.content;

    res.status(200).json({ result: codeBlock });
  } catch (error) {
    console.error("ChatGPT API error:", error.message);
    res.status(500).json({ error: "Failed to fetch macros from ChatGPT" });
  }
};
