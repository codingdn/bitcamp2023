from fastapi import FastAPI
import uvicorn
from backend.similarity import aggregate_similarity
from pydantic import BaseModel
import json

# Creating a request body for input response of a query
class Query(BaseModel):
    query: str

app = FastAPI()

# Creating a POST request
@app.post("/request/")
async def create_query(class_request: Query):
    return json.loads(aggregate_similarity(class_request.query))


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=5001)