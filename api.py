from fastapi import FastAPI, UploadFile, Request, File, Form
from utils.gemini import extract_response, gen_goals
from utils.csv_functions import parseCSV
from utils.add_goal import add_goal
from utils.db import (
    insert_goal,
    add_commerce_to_db,
    add_categories_to_db,
    get_categories,
    get_commerce,
    get_goals,
)
from utils.get_statistics_csv import get_stats

import json
import httpx
import pandas as pd

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.post("/read-csv")
async def read_csv(
    csv: UploadFile = File(...),
    month: int = Form(...),
    year: int = Form(...),
):

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
        "category",
        "frequency",
        "avg_amount",
        "total_amount",
    ]
    commerce_necesity_df = commerce_necesity_df.merge(
        stats_df, on="commerce", how="inner"
    )
    commerce_necesity_df = commerce_necesity_df.fillna(0)

    comercios_list_dict = commerce_necesity_df.to_dict(orient="records")

    # Add to database
    add_commerce_to_db(
        comercios_list_dict,
        month,
        year,
    )

    commerce_necesity_df = commerce_necesity_df.fillna(0)

    commerce_necesity_df["necessity"] = pd.to_numeric(
        commerce_necesity_df["necessity"], errors="coerce"
    ).fillna(0)
    commerce_necesity_df["avg_amount"] = pd.to_numeric(
        commerce_necesity_df["avg_amount"], errors="coerce"
    ).fillna(0)

    # Group by category and calculate the necessity
    categories_df = (
        commerce_necesity_df.groupby("category")
        .agg(
            necessity=("necessity", "mean"),
            frequency=("frequency", "sum"),
            avg_amount=("avg_amount", "mean"),
            total_amount=("total_amount", "sum"),
        )
        .reset_index()
    )
    categories_df = categories_df.fillna(0)

    add_categories_to_db(
        categories_df.to_dict(orient="records"),
        month,
        year,
    )

    # Devuelve una lista de diccionarios del DataFrame
    return {
        "content": commerce_necesity_df.to_dict(orient="records"),
    }


# With gemini generates the goals
@app.post("/gen-goals")
async def gen_goals_api(year: int = Form(...), month: int = Form(...)):
    # Process the CSV file using Gemini
    print("Gemini call API running")
    goals = gen_goals(month, year)  # Generate goals

    print("Gemini call API finished")

    limpio = [
        {
            **g,  # mantenemos todos los campos originales
            "goal_type": int(g["goal_type"]),
            "goal": int(g["goal"]),
            "IA": False,  # nuevo campo fijo
        }
        for g in goals
    ]

    await add_goal(
        limpio[0]["goal_type"],
        limpio[0]["goal"],
        limpio[0]["goal_text"],
        limpio[0]["affected_site"],
        limpio[0]["IA"],
    )

    return {"message": "Goals created successfully", "goals": limpio}


@app.post("/create-goal")
async def create_goal(
    goal_type: int = Form(...),
    goal: str = Form(...),
    goal_text: str = Form(...),
    affected_site: str = Form(...),
    AI: str = Form(...),
):
    """
    Endpoint to create a new goal.
    """

    # print all the data get from the request
    print("goal_type:", goal_type)
    print("goal:", goal)

    print("goal_text:", goal_text)
    print("affected_site:", affected_site)
    print("AI:", AI)

    return await add_goal(goal_type, goal, goal_text, affected_site, AI)


@app.get("/get-categories")
async def get_categories():
    """
    Endpoint to get all categories.
    """
    try:
        # Get categories from the database
        categories = get_categories()
        return {"categories": categories}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/get-commerce")
async def get_commerces():
    """
    Endpoint to get all commerce.
    """
    try:
        # Get commerce from the database
        commerce = get_commerce()
        return {"commerce": commerce}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
