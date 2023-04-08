import pandas as pd
import numpy as np
import json

data = pd.read_csv('backend/resources/all_courses.csv')
course_id = list(data['course_id'])
json_course_id = json.dumps({'course_id': course_id})

with open("frontend/src/data/course_id.json", "w") as outfile:
    outfile.write(json_course_id)