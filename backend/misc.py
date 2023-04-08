import pandas as pd
import numpy as np
import json

<<<<<<< Updated upstream
# import shutil
# shutil.make_archive("backend/resources/ICM", 'zip', "backend/resources/intent_classifier_model")

# data = pd.read_csv('backend/resources/all_courses.csv')
# course_id = data['course_id'].to_json(orient='table')
# print(course_id)
# # json_course_id = json.dumps({'course_id': course_id})

# with open("frontend/src/data/course_id.json", "w") as outfile:
#     outfile.write(course_id)
=======
data = pd.read_csv('backend/resources/all_courses.csv')
course_id = data['course_id'].to_json()
# json_course_id = json.dumps({'course_id': course_id})

with open("frontend/src/data/course_id.json", "w") as outfile:
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    outfile.write(course_id)
>>>>>>> Stashed changes
=======
    outfile.write(course_id)
>>>>>>> Stashed changes
=======
    outfile.write(course_id)
>>>>>>> Stashed changes
