from flask import Blueprint, jsonify
import os, json

faq_bp = Blueprint("faq", __name__)

@faq_bp.route("/faq", methods=["GET"])
def get_faq():
    """Return top 5 tenant-rights FAQs."""
    file_path = os.path.join(os.path.dirname(__file__), "../data/tenant_rights.json")
    with open(file_path, "r") as f:
        data = json.load(f)
    return jsonify(data[:5])
