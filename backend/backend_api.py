from fastapi import FastAPI
# import uvicorn
# from backend.similarity import aggregate_similarity
# from pydantic import BaseModel
# import json
from fastapi.middleware.cors import CORSMiddleware


# Creating a request body for input response of a query
# class Query(BaseModel):
#     query: str

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
    "http://localhost:3001",
    "localhost:3001"
]

courses = [
    {
    "id": 1,
    "course_id": "AASP104",
    "name": "Introduction to African American Studies 4",
    "dept_id": "AASP",
    "description": "Significant aspects of the history of African Americans with particular emphasis on the evolution and development of black communities from slavery to the present. Interdisciplinary introduction to social, political, legal and economic roots of contemporary problems faced by blacks in the United States with applications to the lives of other racial and ethnic minorities in the Americas and in other societies.",
    "gened": [["DSHS", "DVUP"]],
    "restriction": "Permission of BSOS-African American Studies department.",
    "additional_info": "Cross-listed with: WGSS265.",
    "prereqs": "AASP101; and (ECON201 or ECON200).",
    "credit_granted_for": "WMST265, AASP298B, WGSS265 or AASP265."
    }
]

searchrequests = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/course", tags=["courses"])
async def get_courses() -> dict:
    return { "data": courses }

@app.post("/course", tags=["courses"])
async def add_course(course:dict) -> dict:
    courses.append(course)
    return { "data": {"request added"} }



# Creating a POST request
# @app.post("/request/")
# async def create_query(class_request: Query):
#     return json.loads(aggregate_similarity(class_request.query))


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=5001)