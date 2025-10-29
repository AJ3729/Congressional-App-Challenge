from flask import Flask, jsonify
from flask_cors import CORS
import logging

# --- App Setup ---
app = Flask(__name__)
CORS(app)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# --- Register Blueprints ---
from routes.faq import faq_bp
from routes.chat_final import chat_bp

app.register_blueprint(faq_bp)
app.register_blueprint(chat_bp)

logging.info("All blueprints registered successfully")


@app.route("/")
def home():
    app.logger.info("Root route hit")
    return {"message": "Hello from TenantAid backend!"}


@app.route("/health")
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "Backend is running"
    })


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)