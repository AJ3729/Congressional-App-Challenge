import os
from openai import OpenAI
import re
from langdetect import detect, DetectorFactory
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv 

load_dotenv()
DetectorFactory.seed = 0

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Create Flask Blueprint
chat_bp = Blueprint("chat", __name__)

# Store messages in memory
messages = []

def generate_ai_answer(user_input):
    text = user_input.lower()
    lang_code = detect(user_input)
    if lang_code == "es":
        language = "es"
    else:
        language = "en"
    topics = []
    keyword_topics = {
        "rent": "rent",
        "late fee": "rent payment issues",
        "increase": "rent increase",
        "security deposit": "security deposit",
        "deposit": "security deposit",
        "utilities": "utilities and billing",
        "utility": "utilities and billing",
        "lease": "lease",
        "renewal": "lease renewal",
        "sublet": "subletting",
        "termination": "lease termination",
        "break lease": "lease termination",
        "eviction": "eviction",
        "court": "eviction process",
        "notice": "legal notice",
        "marshal": "eviction enforcement",
        "maintenance": "maintenance",
        "repair": "repairs",
        "repairs": "repairs",
        "repairing": "repairs",
        "heat": "heat and hot water",
        "hot water": "heat and hot water",
        "mold": "building conditions",
        "pest": "building conditions",
        "rodent": "building conditions",
        "leak": "repairs",
        "leaks": "repairs",
        "broken": "repairs",
        "safety": "building safety",
        "landlord": "landlord responsibilities",
        "tenant": "tenant responsibilities",
        "privacy": "tenant privacy",
        "entry": "landlord entry",
        "harassment": "tenant harassment",
        "rent control": "rent regulation",
        "rent stabilized": "rent regulation",
        "voucher": "rental assistance",
        "section 8": "rental assistance",
        "inspection": "housing inspection",
        "311": "tenant help resources"
    }

    # get all matching topics
    for keyword, category in keyword_topics.items():
        if re.search(rf"\b{re.escape(keyword)}\b", text):
            topics.append(category)

    # Remove duplicate topics
    topics = list(dict.fromkeys(topics))

    if not topics:
        topics = ["general"]

    if language == "es":
        system_prompt = f"""
Eres TenantAid, un asistente útil sobre derechos de los inquilinos en NYC.
Explica las leyes de vivienda y los derechos del inquilino claramente en español.
Siempre basa tus respuestas en las regulaciones de NYC o del Estado de Nueva York.
Nunca inventes leyes ni opiniones personales.

La pregunta del usuario trata sobre los siguientes temas: **{', '.join(topics)}**.
Si no estás seguro sobre una ley, indica educadamente que se verifique en los sitios oficiales como nyc.gov/housing o llamando al 311.
        """
    else:
        system_prompt = f"""
You are TenantAid, a helpful NYC tenant rights assistant.
Explain housing laws and tenant rights clearly and accurately in plain English.
Always base answers on NYC or New York State regulations.
Never make up laws or personal opinions.

The user's question is about the following topics: **{', '.join(topics)}**.
If you're not certain about a law, politely say so and suggest checking official NYC housing websites like nyc.gov/housing or calling 311.
        """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt.strip()},
                {"role": "user", "content": user_input}
            ],
            temperature=0.35,
            top_p=0.9,
            max_tokens=300,
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Error: {e}")
        return (
            "Sorry, something went wrong. "
            "Please try again or visit nyc.gov/housing for verified information."
        )


# Flask Routes
@chat_bp.route("/chat", methods=["GET"])
def get_messages():
    """Get all chat messages."""
    return jsonify(messages)

@chat_bp.route("/chat", methods=["POST"])
def send_message():
    """Send a message and get AI response."""
    data = request.get_json()
    user_message = data.get("text", "")
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    # Add user message
    user_msg = {
        "id": len(messages),
        "sender": "user",
        "text": user_message
    }
    messages.append(user_msg)
    
    # Get AI response
    ai_response = generate_ai_answer(user_message)
    bot_msg = {
        "id": len(messages),
        "sender": "bot",
        "text": ai_response
    }
    messages.append(bot_msg)
    
    return jsonify({"user": user_msg, "bot": bot_msg})


# Remove the main block since this is now a Flask route