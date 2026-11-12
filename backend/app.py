import os
import sys
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Ensure backend root is on sys.path
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from services.ai_agent import PortfolioAIAssistant
from services.contact_service import ContactService

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS for frontend development and production
CORS(app, resources={r"/api/*": {"origins": "*"}})

ai_assistant = PortfolioAIAssistant()

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "online",
        "service": "Mayakuntla Lakshmi Vijaya Portfolio API",
        "version": "1.0.0"
    }), 200

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "error": "Query message cannot be empty.",
            "reply": "Please enter a question to ask Ask Vijaya AI.",
            "suggested_questions": ai_assistant.get_suggested_questions()
        }), 400

    response = ai_assistant.respond(message)
    return jsonify(response), 200

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}
    success, message = ContactService.validate_and_save(data)

    if not success:
        return jsonify({
            "success": False,
            "error": message
        }), 400

    return jsonify({
        "success": True,
        "message": message
    }), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
