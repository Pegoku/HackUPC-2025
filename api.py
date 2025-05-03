from fastapi import FastAPI, UploadFile, File
from utils.gemini import extract_response
from utils.csv_functions import parseCSV

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/read-csv")
async def read_csv(csv: UploadFile):

    print("CSV filename:", csv.filename)
    # Pasar el archivo directamente a extract_response
    print("Gemini call API running")
    data = extract_response(csv)
    content = parseCSV(data)
    

    return {
        "filename": csv.filename,
        "content": content
    }

async def generate_goals(data: dict):
    """
    Endpoint to generate goals based on input data.
    """
    # Assuming you have a function in utils.gemini to generate goals
    from utils.gemini import generate_goals

    print("Generating goals...")
    goals = generate_goals(data)

    return {
        "status": "success",
        "goals": goals
    }

@app.post("/gen-goals")


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

    return {
        "graphics": graphics_data,
        "business_info": business_info
    }

@app.post("/create-goal")
async def create_goal(goal_data: dict):
    """
    Endpoint to create a new goal.
    """
    # Assuming you have a function in utils.gemini to handle goal creation
    from utils.gemini import create_goal

    print("Creating a new goal...")
    created_goal = create_goal(goal_data)

    return {
        "status": "success",
        "goal": created_goal
    }