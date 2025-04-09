const express = require('express');
const axios = require('axios'); // Import axios
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// --- Hugging Face Configuration ---
// Model chosen for 1-5 star rating sentiment analysis
const HF_MODEL_API_URL = "https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment";
// Get a free token from Hugging Face (https://huggingface.co/settings/tokens) for higher rate limits (optional but recommended)
const HF_API_TOKEN = process.env.HF_API_TOKEN; // Add this to your .env file

// --- Sentiment Analysis Function using Hugging Face ---
async function analyzeReviewWithHuggingFace(inputText) {
    try {
        const headers = {};
        if (HF_API_TOKEN) {
            headers["Authorization"] = `Bearer ${HF_API_TOKEN}`;
        }

        console.log("Sending to Hugging Face:", inputText); // Log input

        const response = await axios.post(
            HF_MODEL_API_URL,
            { inputs: inputText },
            { headers: headers }
        );

        console.log("Hugging Face Response:", response.data); // Log raw response

        // --- Process the response ---
        // The model returns scores for each label ("1 star" to "5 stars")
        // Example: [[ { "label": "1 star", "score": 0.01 }, ..., { "label": "5 stars", "score": 0.8 } ]]
        if (response.data && response.data.length > 0 && response.data[0].length > 0) {
            let highestScore = 0;
            let predictedLabel = "neutral"; // Default
            let predictedRating = 3; // Default

            response.data[0].forEach(item => {
                if (item.score > highestScore) {
                    highestScore = item.score;
                    predictedLabel = item.label;
                }
            });

            // Extract rating number from label
            const ratingMatch = predictedLabel.match(/^(\d+)/); // Find the number at the start
            if (ratingMatch) {
                predictedRating = parseInt(ratingMatch[1], 10);
            }

            // Determine basic sentiment based on rating
            let sentiment = "neutral";
            if (predictedRating >= 4) {
                sentiment = "positive";
            } else if (predictedRating <= 2) {
                sentiment = "negative";
            }

            return {
                // NOTE: This model doesn't do moderation. Set to 'not_checked' or similar.
                moderation: "not_checked",
                sentiment: sentiment,
                rating: predictedRating
            };
        } else {
            console.error("Unexpected response format from Hugging Face:", response.data);
            return { moderation: "error", sentiment: "error", rating: "error", details: "Unexpected HF response format" };
        }

    } catch (error) {
        console.error("Error calling Hugging Face API:", error.response ? error.response.data : error.message);
        return { moderation: "error", sentiment: "error", rating: "error", details: error.message };
    }
}

// --- Routes ---

// Root Route (GET) - Unchanged
app.get("/", (req, res) => {
    res.send("<b>Welcome to the review analysis API!<br><br>Send a POST request with 'input' to /analyze to get your analysis.</b>");
});

// Analyze Route (POST) - Modified to use Hugging Face
app.post("/analyze", async (req, res) => {
    try {
        const {title,description} = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: "Missing 'input' in the request body" });
        }



        // Combine title and description if they are sent separately
        let inputText = `Title: ${title}\nDescription: ${description}`;
        // if (data.title && data.description) {
        //      inputText = `Title: ${data.title}\nDescription: ${data.description}`;
        // } else if (data.title) {
        //      inputText = data.title; // Or handle as needed
        // } else if (data.description) {
        //      inputText = data.description; // Or handle as needed
        // }


        // Call the new analysis function
        const results = await analyzeReviewWithHuggingFace(inputText);
        res.json(results);

    } catch (error) {
        console.error("Error processing the request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const port = process.env.PORT || 1957; // Use environment variable for port if available
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
