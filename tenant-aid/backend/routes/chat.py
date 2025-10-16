import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("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"))

def generate_ai_answer():
    user_input = input("How can I help you today? ")

    response = client.responses.create(
        model="gpt-4o",
        instructions="You are a assistant that helps with people with housing questions.",
        input=user_input,
    )

    print(response.output_text)

generate_ai_answer()
