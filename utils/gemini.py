from google import genai
from google.genai import types
import os
import pathlib
from dotenv import load_dotenv
import pandas as pd


def extract_response(file):
    load_dotenv()
    api_key_env = os.getenv('api_key')

    client = genai.Client(api_key=api_key_env)

    # filepath = pathlib.Path(filepath)
    prompt = "You recieved a CSV from Revolut. Want you to split it in months, and give the most spent places from more to less, and give the amount spent. Also value from 0~1 the necessity of it; you should consider: amount, frequency, items (general idea of what it could have bought), etc. Should also add an Alert column, should be 0~1 and should ~0 if it looks normal/stable, ~1 if it seems to have spiked (compared to other months) for no reason. Output be in CSV format, columns being: Month(2 digits),Place(What was the charge for),Amount(int),Necessity(0~1),Alert(0~1),Category(Groceries, Dining, Transport, Shopping, Clothing, Utilities, Health, Entertainment, Travel, Home, Betting, Education, Luxuries, Investment). **ONLY OUTPUT THE CSV, NO MORE TEXT**"

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            types.Part.from_bytes(
              data=file.file.read(),
              mime_type='text/csv',
            ),
            prompt],
        config=types.GenerateContentConfig(
            temperature=0,
            top_k=1,
            top_p=0
        ))

    return response


def gen_goals(file):
    load_dotenv()
    api_key_env = os.getenv('api_key')

    client = genai.Client(api_key=api_key_env)

    # filepath = pathlib.Path(filepath)
    prompt = "You recieved a CSV from Revolut. It has multiple transactions, want you to create 3 goals for the user. They should be: reduce the number of transactions of a site; Reduce the maximun transaction amount in one go; Reduce the total amount spent in the same site/brand in the full month. Each of those should only affect 1 site **SHOULD ONLY OUTPUT THE GOALS IN JSON FORMAT, NO MORE TEXT**. **AI SHOULD BE true**. Example: # insert_goal( goal_type=0, goal=20, goal_text='Reduce Uber Rides to 20 per month', affected_site=['Uber'], AI=False"

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            types.Part.from_bytes(
              data=file.file.read(),
              mime_type='text/csv',
            ),
            prompt],
        # config=types.GenerateContentConfig(
        #     temperature=0,
        #     top_k=1,
        #     top_p=0
        # )
        )
    return response.text.replace('\n', '').strip('```json').strip('```')
