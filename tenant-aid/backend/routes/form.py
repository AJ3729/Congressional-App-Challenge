import json
import os

def validate_email(email):
    # simple check: must have "@" and "."
    return "@" in email and "." in email and len(email) > 5

def validate_message(message):
    # message can't be empty or just spaces
    return message.strip() != ""

def add_help_request(email, message, filename="../data/help_requests.json"):
    if not validate_email(email):
        return "Invalid email."
    if not validate_message(message):
        return "Message cannot be empty."

    data = {}
    if os.path.exists(filename):
        with open(filename, "r") as f:
            data = json.load(f)

    data[email] = message

    with open(filename, "w") as f:
        json.dump(data, f, indent=2)

    return "Help request saved."
