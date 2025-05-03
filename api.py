from fastapi import FastAPI, UploadFile, File
from utils.gemini import extract_response
from utils.csv_functions import parseCSV
from utils.get_statistics_csv import get_stats

import pandas as pd

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.post("/read-csv")
async def read_csv(csv: UploadFile):

    csv_text = csv.file.read()

    print("CSV filename:", csv_text)

    # print("CSV filename:", csv.file.read())
    stats = get_stats(csv_text.decode("utf-8"))

    # Pasar el archivo directamente a extract_response
    print("Gemini call API running")
    data = extract_response(csv_text)

    print("Gemini call API finished")
    commerce_necesity = parseCSV(data.text)  #

    # Join the commerce necessity with the stats using the commerce name
    commerce_necesity_df = pd.DataFrame(commerce_necesity)
    commerce_necesity_df.columns = ["commerce", "necessity"]
    stats_df = pd.DataFrame(stats)
    stats_df.columns = [
        "commerce",
        "frequency",
        "avg_amount",
        "total_amount",
        "category",
    ]
    commerce_necesity_df = commerce_necesity_df.merge(
        stats_df, on="commerce", how="inner"
    )
    commerce_necesity_df = commerce_necesity_df.fillna(0)

    print("Stats DataFrame:")
    print(commerce_necesity_df)

    # Devuelve una lista de diccionarios del DataFrame
    return {
        "filename": csv.filename,
        "content": commerce_necesity_df.to_dict(orient="records"),
    }
