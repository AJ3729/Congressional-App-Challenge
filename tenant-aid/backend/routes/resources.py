import json

def read_json(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    
    for question, answer in data.items():
        print(f"Q: {question}")
        print(f"A: {answer}\n")
read_json("../tenant_right.json")
