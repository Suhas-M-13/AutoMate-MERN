# import openai
# from dotenv import dotenv_values
# from flask import Flask, request, jsonify

# config = dotenv_values(".env")

# app = Flask(__name__)
# openai.api_key = config['OPENAI_API_KEY']

# # Moderation function
# def moderation(prompt):
#     response = openai.Moderation.create(input=prompt)
#     output = response['results'][0]
#     return output

# # Root route (GET)
# @app.route("/", methods=['GET'])
# def index():
#     return "<b>Welcome to the moderation API!<br><br>Send a POST request to get your output."

# # Moderation route (POST)
# @app.route("/moderation", methods=['POST'])
# def mode_api():
#     data = request.get_json()
#     results = moderation(data['input'])
#     return jsonify(results)

# if __name__ == '__main__':
#     app.run(debug=True, host="0.0.0.0", port=1957)

import requests
from dotenv import dotenv_values
from flask import Flask, request, jsonify

# Load the API key from the .env file
config = dotenv_values(".env")

# Flask app setup
app = Flask(__name__)

# Your Gemini API key (replace with actual key variable or endpoint)
GEMINI_API_KEY = config['GEMINI_API_KEY']

# Gemini moderation function (using requests)
def gemini_moderation(prompt):
    # Define the URL and headers for Gemini API (replace with actual API endpoint)
    url = "https://api.gemini.com/v2/moderation"
    headers = {
        'Authorization': f'Bearer {GEMINI_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Prepare the payload (you can adjust according to Gemini's API specs)
    payload = {
        'input': prompt
    }
    
    # Make the request to the Gemini API
    response = requests.post(url, headers=headers, json=payload)
    
    # Check if the response is successful (status code 200)
    if response.status_code == 200:
        try:
            return response.json()
        except ValueError as e:
            return {'error': f'Failed to parse JSON: {str(e)}. Response content: {response.text}'}
    else:
        return {'error': f'Error with Gemini API: {response.status_code}. Response content: {response.text}'}

# Root route (GET)
@app.route("/", methods=['GET'])
def index():
    return "<b>Welcome to the Gemini moderation API!<br><br>Send a POST request to get your output."

# Moderation route (POST)
@app.route("/moderation", methods=['POST'])
def mode_api():
    data = request.get_json()
    results = gemini_moderation(data['input'])
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=1957)