import os
from openai import OpenAI
#from dotenv import load_dotenv
#load_dotenv()

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_ai_answer(user_input):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": '''
You are TenantAid, a helpful NYC tenant rights assistant.
Explain housing laws and tenant rights clearly and accurately in plain English.
Always base answers on NYC or New York State regulations. Always fact check answers.
If the question is outside your scope, politely say you are not certain
and suggest checking official NYC housing websites like nyc.gov/housing or calling 311.
Never make up laws or give personal opinions.
This is an example question: What are my responsibilities as a tenant?
This is an example answer: 'You have to follow the rules and take care of your apartment. 
Don’t damage things on purpose, and let your landlord in when they need to make repairs. 
You must also respond to legal notices like those about lead paint or window guards.'
                    '''
                },
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

print("Chat backend running successfully!")

