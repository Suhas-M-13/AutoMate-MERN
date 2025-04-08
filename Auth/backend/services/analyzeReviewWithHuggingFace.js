import axios from 'axios';

const HF_MODEL_API_URL = process.env.HF_MODEL_API;
const HF_API_TOKEN = process.env.HF_API_TOKEN; 


export async function analyzeReviewWithHuggingFace(inputText) {
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

        console.log("Hugging Face Response:", response.data);

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

            const ratingMatch = predictedLabel.match(/^(\d+)/);
            if (ratingMatch) {
                predictedRating = parseInt(ratingMatch[1], 10);
            }

            let sentiment = "neutral";
            if (predictedRating >= 4) {
                sentiment = "positive";
            } else if (predictedRating <= 2) {
                sentiment = "negative";
            }

            return {
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