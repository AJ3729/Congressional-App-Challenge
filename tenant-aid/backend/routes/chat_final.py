import os
from openai import OpenAI
import re
#from dotenv import load_dotenv
#load_dotenv()

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_ai_answer(user_input):
    text = user_input.lower()

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

    # print(f"Matched topics: {topics}")

    # system prompt
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
#if __name__ == "__main__":
    while True:
        user_input = input("Ask TenantAid a question (or 'quit' to stop): ")
        if user_input.lower() == "quit":
            break
        answer = generate_ai_answer(user_input)
        print("TenantAid:", answer)

#print("Chat backend running successfully!")
