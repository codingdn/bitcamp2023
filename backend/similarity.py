import pandas as pd
from scipy import spatial
# from modules.intent_classifier import get_predicted_topic
import numpy as np
import tensorflow_hub as hub
import json

# Converting CSV to Pandas dataframe and extracting list of questions
data = pd.read_csv('backend/resources/all_courses.csv')
needed = data[["course_id", "dept_id", "name", "department", "credits", "description"]]

needed['Combined'] = needed[needed.columns[1:]].apply(
    lambda x: ','.join(x.dropna().astype(str)),
    axis=1
)

text = data['Combined'].tolist()
classes = data["course_id"].tolist()

model_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
model = hub.load(model_url)

text_vec_list = []
text_vec_USE = np.array(model(text))

courses_vec_list = []
courses_vec_USE = np.array(model(classes))


data['Question_vec'] = questions_vec_USE.tolist()
data['Answer_vec'] = answer_vec_USE.tolist()

def aggregate_similarity(query: str):
    # Setting up lists for similarity scores for SentBERT and USE algorithms
    probs_USE = []

    # Using an intent classifier to filter out questions
    if conf.USE_TOPIC_CLASSIFICATION:
        predicted_topic = get_predicted_topic(query)
        narrowed_questions = data.loc[data[conf.TOPIC_COL_NAME] == predicted_topic]
    else:
        narrowed_questions = data

    # Vectorizing query uing respective models
    query_vec_USE = np.array(conf.SENTENCE_EMBEDDING_MODEL([query]))[0]

    np_question_vec = np.array(narrowed_questions['Question_vec'])
    np_answer_vec = np.array(narrowed_questions['Answer_vec'])
    
    # Finding cosine similarity between Sample_Faq and query
    for vec in range(len(np_question_vec)):
        sim_q_USE = 1 - spatial.distance.cosine(query_vec_USE, np_question_vec[vec])
        sim_a_USE = 1 - spatial.distance.cosine(query_vec_USE, np_answer_vec[vec])
        weighted = (1 * sim_q_USE) + (0.0 * sim_a_USE)
        probs_USE.append(weighted)


    #Adding similarity scores to overall dataframe for each question    
    narrowed_questions['Probabilities_USE'] = probs_USE

    # Sorting dataframe in ascending order by the resepective similarity scores
    sorted_USE = narrowed_questions.sort_values(by = ['Probabilities_USE'], ascending = False)

    # Extracting the predicted question and answer based on highest similarity score
    possible_qa_USE = sorted_USE.iloc[0]


    output = {'id': int(possible_qa_USE.faq_id), 'Topic': possible_qa_USE.topic, 'Question': possible_qa_USE.question, "Answer": possible_qa_USE.answer, "Probability": possible_qa_USE.Probabilities_USE}

    return json.dumps(output)

