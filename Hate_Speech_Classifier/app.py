import openai
from dotenv import dotenv_values
from flask import Flask, request, jsonify

config = dotenv_values(".env")

app = Flask(__name__)
openai.api_key = config['OPENAI_API_KEY']

# Moderation function
def moderation(prompt):
    response = openai.Moderation.create(input=prompt)
    output = response['results'][0]
    return output

# Root route (GET)
@app.route("/", methods=['GET'])
def index():
    return "<b>Welcome to the moderation API!<br><br>Send a POST request to get your output."

# Moderation route (POST)
@app.route("/moderation", methods=['POST'])
def mode_api():
    data = request.get_json()
    results = moderation(data['input'])
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=1957)