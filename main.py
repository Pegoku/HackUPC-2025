from google import genai
from google.genai import types
import os
import pathlib
from dotenv import load_dotenv
import csv

load_dotenv()


def get_rows_with_value(csv_file, column_index, target_value):
    matching_rows = []
    csv_reader = csv.reader(csv_file)
    for row in csv_reader:
        if row[column_index] == target_value:
            matching_rows.append(row)

    return matching_rows


# Gemini
api_key_env = os.getenv('api_key')

client = genai.Client(api_key=api_key_env)

filepath = pathlib.Path('RevolutSimulatedData.csv')
prompt = "You recieved a CSV from Revolut. Want you to split it in months, and give the most spent places from more to less, and give the amount spent. Also value from 0~1 the necessity of it; you should consider: amount, frequency, items (general idea of what it could have bought), etc. Should also add an Alert column, should be 0~1 and should ~0 if it looks normal/stable, ~1 if it seems to have spiked (compared to other months) for no reason. Output be in CSV format, columns being: Month(2 digits),Place(What was the charge for),Amount(int),Necessity(0~1),Alert(0~1). **ONLY OUTPUT THE CSV, NO MORE TEXT**"

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=[
        types.Part.from_bytes(
          data=filepath.read_bytes(),
          mime_type='text/csv',
        ),
        prompt],
    config=types.GenerateContentConfig(
        temperature=0,
        top_k=1,
        top_p=0
    ))

# Clean CSV
response.text = "\n".join(
    line for line in response.text.splitlines() if '`' not in line)
response.text = "\n".join(response.text.splitlines()[1:])


with open("geminiOutput.csv", "w") as output_file:
    output_file.write(response.text)

print(response.text)
