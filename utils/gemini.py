from google import genai
from google.genai import types
import os
import pathlib
from dotenv import load_dotenv


def extract_response(file):
    load_dotenv()
    api_key_env = os.getenv("api_key")

    client = genai.Client(api_key=api_key_env)

    prompt = "You receive a CSV file of Revolut transactions, including commerce names; for each commerce name calculate frequency (total number of transactions), avg_amount (average transaction amount) and total_amount (sum of all transaction amounts), then assign each commerce name a necessity score between 0 (non-essential) and 1 (essential) based on those metrics; return a CSV with exactly two columns: commerce name and necessity; ONLY OUTPUT THE CSV, WITH NO ADDITIONAL TEXT."

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            types.Part.from_bytes(
                data=file,
                mime_type="text/csv",
            ),
            prompt,
        ],
        config=types.GenerateContentConfig(temperature=0, top_k=1, top_p=0),
    )

    print("Response received from Gemini API")
    print(response.text)

    return response
