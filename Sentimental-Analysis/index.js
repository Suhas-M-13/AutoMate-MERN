const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Moderation and Sentiment Analysis Function
async function analyzeReview(prompt) {
    try {
        const moderationPrompt = `Analyze the following text: "${prompt}". Respond ONLY in valid JSON format. The JSON should have three keys: "moderation", "sentiment", and "rating". First analyze for harmful content (hate_speech, sexually_explicit, violence, harmful). If any harmful content is found, set the "moderation" value to the category of harmful content, set "sentiment" to "error", and set "rating" to "error". Otherwise, analyze the sentiment of the text (positive, negative, or neutral) and set the "sentiment" value accordingly, and provide a rating of the review from 1 to 5 (5 meaning 5 stars, 1 meaning 1 star) based on the sentiment and set the "rating" value to the appropriate rating. Respond ONLY with the JSON object, do not include any extra text, markdown, or any other formatting around the JSON.`;

        const result = await model.generateContent(moderationPrompt);
        const response = await result.response;
        let output = response.text();

        try {
            const parsedOutput = JSON.parse(output);
            return parsedOutput;
        } catch (jsonError) {
            // Attempt to remove code block and extra formatting using regex
            try {
                const cleanedOutput = output.replace(/```(json)?/g, '').trim();
                const parsedOutput = JSON.parse(cleanedOutput);
                return parsedOutput;
            }
            catch (cleanError) {
                console.error("Error cleaning and parsing JSON from Gemini:", cleanError);
                return { moderation: "error", sentiment: "error", rating: "error", rawOutput: output };
            }

        }

    } catch (error) {
        console.error("Error during moderation and sentiment analysis:", error);
        return { moderation: "error", sentiment: "error", rating: "error" };
    }
}

// Root Route (GET)
app.get("/", (req, res) => {
    res.send("<b>Welcome to the review analysis API!<br><br>Send a POST request with 'input' to /analyze to get your analysis.</b>");
});

// Analyze Route (POST)
app.post("/analyze", async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.input) {
            return res.status(400).json({ error: "Missing 'input' in the request body" });
        }

        const results = await analyzeReview(data.input);
        res.json(results);

    } catch (error) {
        console.error("Error processing the request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const port = 1957;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});