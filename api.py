from fastapi import FastAPI, UploadFile, Request, File, Form
from utils.gemini import extract_response, gen_goals
from utils.csv_functions import parseCSV
from utils.db import insert_goal, add_commerce_to_db, add_categories_to_db
from utils.get_statistics_csv import get_stats

import random
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


@app.post("/gen-goals")
async def gen_goals_api(csv: UploadFile):
    try:
        # Process the CSV file using Gemini
        print("Processing CSV file with Gemini...")
        goals_json = gen_goals(csv)  # Generate goals
        goals = json.loads(goals_json)  # Parse the JSON string into a Python list

        # Call /create-goal for each goal
        async with httpx.AsyncClient() as client:
            for goal in goals:
                response = await client.post(
                    "http://localhost:8000/create-goal",  # Assuming the server is running locally
                    json=goal,
                )
                if response.status_code != 200:
                    raise HTTPException(
                        status_code=response.status_code,
                        detail=f"Failed to create goal: {response.text}",
                    )

        return {"message": "Goals created successfully", "goals": goals}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/info-goals")
def get_create_goal_form():
    """
    Endpoint to provide information for rendering graphics and business info.
    """
    graphics_data = {
        # TBD
    }

    business_info = {
        # TBD
    }

    return {"graphics": graphics_data, "business_info": business_info}


@app.post("/create-goal")
async def create_goal(request: Request):
    """
    Endpoint to create a new goal.
    """
    try:
        # Parse JSON
        data = await request.json()

        # Extract fields
        goal_type = data.get("goal_type")
        goal = data.get("goal")
        goal_text = data.get("goal_text")
        affected_site = data.get("affected_site")  # List
        AI = data.get("AI")

        # Validate fields
        if (
            goal_type is None
            or goal is None
            or not goal_text
            or not affected_site
            or AI is None
        ):
            raise HTTPException(status_code=400, detail="Missing required fields")

        if not isinstance(affected_site, list):
            raise HTTPException(status_code=400, detail="affected_site must be a list")

        # Insert into db
        insert_goal(goal_type, goal, goal_text, affected_site, AI)

        return {"message": "Goal created successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
