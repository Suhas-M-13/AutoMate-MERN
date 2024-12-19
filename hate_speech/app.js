const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Load the environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());  // For parsing application/json

// Get the Gemini API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Gemini moderation function (using axios)
const geminiModeration = async (prompt) => {
    const url = "https://api.gemini.com/v1/moderation";  // Replace with actual Gemini API URL
    const headers = {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
    };
    
    const payload = {
        input: prompt,
    };
    
    try {
        const response = await axios.post(url, payload, { headers });
        return response.data;
    } catch (error) {
        return { error: 'Something went wrong with the Gemini API' };
    }
};

// Root route (GET)
app.get('/', (req, res) => {
    res.send("<b>Welcome to the Gemini moderation API!<br><br>Send a POST request to get your output.");
});

// Moderation route (POST)
app.post('/moderation', async (req, res) => {
    const { input } = req.body;
    const result = await geminiModeration(input);
    res.json(result);
});

// Start the server
const port = 1957;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
