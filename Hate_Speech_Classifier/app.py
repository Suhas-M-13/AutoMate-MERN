import openai
from dotenv import dotenv_values
from flask import Flask, request, jsonify

# Load configuration from .env file
config = dotenv_values(".env")

# Initialize Flask app
app = Flask(__name__)

# Set OpenAI API key
openai.api_key = config['OPENAI_API_KEY']

# Moderation function to analyze text for hate speech
def moderation(prompt):
    try:
        # Call OpenAI Moderation API
        response = openai.Moderation.create(input=prompt)
        # Extract the moderation results
        output = response['results'][0]
        return output
    except Exception as e:
        # Return an error message if the API call fails
        return {"error": str(e)}

@app.route("/moderation", methods=['POST'])
def mode_api():
    # Parse incoming JSON request
    try:
        data = request.get_json()
        # Ensure input text exists in the request
        if 'input' not in data:
            return jsonify({"error": "Missing 'input' field in request"}), 400
        
        # Get the text to moderate
        input_text = data['input']
        
        # Get moderation results from OpenAI
        results = moderation(input_text)
        
        # Return the moderation results
        return jsonify(results)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=1957)