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

    
