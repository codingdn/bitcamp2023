import requests
import json
import pandas as pd
from urllib.request import urlopen

url = "https://api.umd.io/v1/courses?per_page=20&page="
page_count = 1
response = urlopen(url + str(page_count))
page = json.loads(response.read())
all_courses = pd.json_normalize(page)

while page != []:
    page_count +=1
    print(page_count)
    response = response = urlopen(url + str(page_count))
    page = json.loads(response.read())
    if page == []:
        break
    page_courses = pd.json_normalize(page)
    all_courses = pd.concat([all_courses, page_courses], axis=0, ignore_index=True)

all_courses.to_csv('backend/resources/all_courses.csv')