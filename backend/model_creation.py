import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np

# Read in topics and questions from CSV
data = pd.read_csv('backend/resources/all_courses.csv')
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
needed = data[]
>>>>>>> Stashed changes
=======
needed = data[]
>>>>>>> Stashed changes
=======
needed = data[]
>>>>>>> Stashed changes

needed = data[["dept_id", "name", "department", "description"]]

needed['Combined'] = needed[needed.columns[1:]].apply(
    lambda x: ','.join(x.dropna().astype(str)),
    axis=1
)

training_data = needed.sample(frac = 1)

# training_data, testing_data = train_test_split(needed, test_size=0.1, shuffle=True)

department_num = data.drop_duplicates(subset=["dept_id"])["dept_id"].size

training_departments = training_data[["dept_id"]]
training_text = training_data["Combined"].to_numpy()

# testing_department = testing_data[["dept_id"]]
# testing_text = testing_data["Combined"].to_numpy()

# One hot encoding department_ids
one_hot_encoder = OneHotEncoder()
fitted = one_hot_encoder.fit(data[["dept_id"]])
training_dept_id_labels = fitted.transform(training_departments).toarray()

# Vectorizing text setup
model_text = "https://tfhub.dev/google/universal-sentence-encoder/4"
model_vec = hub.load(model_text)
training_text_vec = model_vec(training_text)

# # Building model to train intent classifier
model = tf.keras.Sequential()
# model.add(hub_layer)
# model.add(tf.keras.layers.Normalization())
model.add(tf.keras.layers.Dense(500)),
model.add(tf.keras.layers.Dropout(0.5))
model.add(tf.keras.layers.Dense(216)),
model.add(tf.keras.layers.Dropout(0.2))
model.add(tf.keras.layers.Dense(department_num, activation="softmax"))

# print(model.summary())

# Optimizing model
model.compile(
    optimizer = 'adam', 
    loss = tf.keras.losses.CategoricalCrossentropy(),
    metrics = [tf.keras.metrics.CategoricalAccuracy(name='accuracy')],
    )


reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
            mode = 'auto',
            monitor='loss', factor=0.02,
            patience=2, min_lr=0.001)


# Fitting model to input and output data and optimizing on validation data
history = model.fit(training_text_vec, 
                    training_dept_id_labels, 
                    # validation_data = (x_val, y_val),
                    epochs = 15,
                    batch_size = 512, 
                    verbose = 1,
                    callbacks = [reduce_lr])

# results = model.evaluate(testing_text, testing_dept_id_labels)
# print(results)

# Saving model to file
model.save('backend/resources/intent_classifier_model')

test_vec = model_vec(["recommend a course about fire safety", "CMSC", "Give a one credit course on coding interviews", "course on Artificial Intelligence"])
pred = model.predict(test_vec)
# print(pred)

department_num = data[["dept_id"]].drop_duplicates()

zipped = zip(pred[0], list(department_num["dept_id"]))

res = sorted(zipped, key = lambda x: x[0], reverse=True)

print(str(res))

course = one_hot_encoder.inverse_transform(pred)
print(course)