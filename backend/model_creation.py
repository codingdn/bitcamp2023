import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from keras.models import Sequential
import keras
import tensorflow as tf
import tensorflow_hub as hub
import matplotlib.pyplot as plt
import numpy as np

# Read in topics and questions from CSV
data = pd.read_csv('backend/resources/all_courses.csv')
needed = data[]

# training_data, testing_data = train_test_split(data, test_size=0.30, shuffle=True)

# emotion_num = data.drop_duplicates(subset=["Emotion"])["Emotion"].size

# training_emotions = training_data[["Emotion"]]
# training_text = training_data["Text"].to_numpy()

# testing_emotions = testing_data[["Emotion"]]
# testing_text = testing_data["Text"].to_numpy()


# # One hot encoding emotions
# one_hot_encoder = OneHotEncoder()
# fitted = one_hot_encoder.fit(data[["Emotion"]])

# training_emotion_labels = fitted.transform(training_emotions).toarray()
# testing_emotion_labels = fitted.transform(testing_emotions).toarray()

# # Vectorizing text setup
# model_text = "https://tfhub.dev/google/universal-sentence-encoder-large/5"
# hub_layer = hub.KerasLayer(model_text, input_shape=[], dtype=tf.string)

# # Building model to train intent classifier
# model = tf.keras.Sequential()
# model.add(hub_layer)
# # model.add(tf.keras.layers.Normalization())
# model.add(tf.keras.layers.Dense(64, activation='relu'))
# model.add(tf.keras.layers.Dropout(0.1))
# model.add(tf.keras.layers.Dense(64, activation='relu'))
# model.add(tf.keras.layers.Dropout(0.1))
# model.add(tf.keras.layers.Dense(128, activation='relu'))
# model.add(tf.keras.layers.Dense(emotion_num, activation='softmax'))

# print(model.summary())

# # Optimizing model
# model.compile(
#     optimizer = 'adam', 
#     loss = tf.keras.losses.CategoricalCrossentropy(),
#     metrics = [tf.keras.metrics.CategoricalAccuracy(name='accuracy')],
#     )


# x_val = np.array(training_text[:10000])
# partial_x_train = np.array(training_text[10000:])

# y_val = np.array(training_emotion_labels[:10000])
# partial_y_train = np.array(training_emotion_labels[10000:])

# # Fitting model to input and output data and optimizing on validation data
# history = model.fit(partial_x_train, 
#                     partial_y_train, 
#                     validation_data = (x_val, y_val),
#                     epochs = 5,
#                     batch_size = 512, 
#                     verbose = 1)

# results = model.evaluate(testing_text, testing_emotion_labels)
# print(results)

# # # Saving model to file
# # model.save('modules/models/intent_classifier_model')