from flask import Flask
from flask_cors import CORS
import logging

# --- App Setup ---
app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)

# --- Register Blueprints ---
from routes.faq import faq_bp
from routes.summary import summary_bp

app.register_blueprint(faq_bp)
app.register_blueprint(summary_bp)


@app.route("/")
def home():
    app.logger.info("Root route hit")
    return {"message": "Hello from TenantAid backend!"}


if __name__ == "__main__":
    app.run(debug=True)
