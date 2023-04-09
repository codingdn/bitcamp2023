import pandas as pd
from scipy import spatial
import numpy as np
import tensorflow_hub as hub
import json
from sklearn.preprocessing import OneHotEncoder
import tensorflow as tf

# Converting CSV to Pandas dataframe and extracting list of questions
data = pd.read_csv('backend/resources/all_courses.csv')
needed = data[["course_id", "dept_id", "name", "department", "credits", "description"]]

needed['Combined'] = needed[needed.columns[0:]].apply(
    lambda x: ','.join(x.dropna().astype(str)),
    axis=1
)

text = needed['Combined'].tolist()

model_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
model = hub.load(model_url)

text_vec_list = []
text_vec_USE = np.array(model(text))

one_hot_encoder = OneHotEncoder()
departments = data[['dept_id']]
one_hot_encoder.fit_transform(departments).toarray()
trained_model = tf.keras.models.load_model('backend/resources/intent_classifier_model')

data['text_vec'] = text_vec_USE.tolist()

def aggregate_similarity(search):
    print("this is what im getting")
    print(type(search))
    print(dict(search)['query'])


    # print(search[0])
    # print(search["query"])

    request = dict(search)['query']
    # Setting up lists for similarity scores for SentBERT and USE algorithms
    probs_USE = []    

    # Applying model to the query
    pred = trained_model.predict(model([request]))

    department_num = data[["dept_id"]].drop_duplicates()
    zipped = zip(pred[0], list(department_num["dept_id"]))
    res = sorted(zipped, key = lambda x: x[0], reverse=True)
    
    limit = 0
    chosen_departments = []
    for i in range(len(res)):
        limit += res[i][0]
        chosen_departments.append(res[i][1])
        if limit >= 0.5:
            break
    

    narrowed_questions = data[data["dept_id"].isin(chosen_departments)]

    # Vectorizing query using respective models
    request_vec_USE = np.array(model([request]))[0]

    np_text_vec = np.array(narrowed_questions['text_vec'])
    
    # Finding cosine similarity between Sample_Faq and query
    for vec in range(len(np_text_vec)):
        sim_q_USE = 1 - spatial.distance.cosine(request_vec_USE, np_text_vec[vec])
        probs_USE.append(sim_q_USE)


    #Adding similarity scores to overall dataframe for each question    
    narrowed_questions['Probabilities_USE'] = probs_USE

    # Sorting dataframe in ascending order by the resepective similarity scores
    sorted_USE = narrowed_questions.sort_values(by = ['Probabilities_USE'], ascending = False)

    # Extracting the predicted question and answer based on highest similarity score

    # output = "{ data: ["
    # for i in range(len(sorted_USE)):
    #     possible_class_USE = sorted_USE.iloc[i]
    #     output += "{ \"id\": " + str(i) + ": " + str({'Course ID': possible_class_USE.course_id, "Probability": possible_class_USE.Probabilities_USE}) + ", "

    # output += "}"

    possible_class_USE = sorted_USE[['course_id', 'name', 'dept_id', 'description', 'gen_ed', 'relationships.restrictions', 'relationships.additional_info', 'relationships.prereqs', 'relationships.credit_granted_for', 'Probabilities_USE']]

    return possible_class_USE.to_json(orient="records")

# aggregate_similarity("Recommend a course that teaches Artificial Intelligence")