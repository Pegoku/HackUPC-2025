from google import genai
from google.genai import types
import os
import pathlib
from dotenv import load_dotenv
import pandas as pd



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
