from google import genai
from google.genai import types
import os
import pathlib
from dotenv import load_dotenv
import pandas as pd
from utils.db import get_commerce_csv
import csv
from io import StringIO


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


def gen_goals(month, year):
    load_dotenv()
    api_key_env = os.getenv("api_key")

    client = genai.Client(api_key=api_key_env)

    # filepath = pathlib.Path(filepath)
    prompt = "You receive a CSV file of a user’s Revolut transactions for one month, where each row contains category, necessity, frequency, avg_amount and total_amount; generate exactly three money-saving challenges applicable to all users; for each challenge output four columns—affected_site (the commerce to avoid purchasing), goal_type (0=reduce frequency, 1=reduce total monthly spend, 2=cap average spend), goal (the numeric x target), and goal_text (description and justification of the goal); return exactly three CSV rows; ONLY OUTPUT THE CSV, WITH NO ADDITIONAL TEXT."
    print(month, year)
    le = get_commerce_csv(month, year)
    print(le)

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            types.Part.from_bytes(
                data=le.encode("utf-8"),
                mime_type="text/csv",
            ),
            prompt,
        ],
        # config=types.GenerateContentConfig(
        #     temperature=0,
        #     top_k=1,
        #     top_p=0
        # )
    )
    csv_string = response.text.strip("```json").strip("```")

    reader = csv.DictReader(StringIO(csv_string))

    lista_de_dicts = list(reader)

    return lista_de_dicts
