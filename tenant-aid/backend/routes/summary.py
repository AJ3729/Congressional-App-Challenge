from flask import Blueprint, request, jsonify
from helpers.text_tools import summarize_text

summary_bp = Blueprint("summary", __name__)

@summary_bp.route("/summary", methods=["POST"])
def summarize():
    """Summarize long tenant law text into plain English."""
    data = request.get_json(force=True)
    text = data.get("text", "")
    result = summarize_text(text)
    return jsonify({"summary": result})
