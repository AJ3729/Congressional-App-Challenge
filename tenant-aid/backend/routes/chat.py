import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY")

def generate_ai_answer():
    user_input = input("How can I help you today? ")

    response = client.responses.create(
        model="gpt-4o",
        instructions="You are a housing assistant to tennants.",
        input=user_input,
    )

    print(response.output_text)

generate_ai_answer()
