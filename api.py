import time
import flask
from flask import request, jsonify

import numpy as np
import pandas as pd
from collections import OrderedDict

from predictor import LogisticRegressor

app = flask.Flask(__name__)

app = flask.Flask(__name__, static_folder='./client/build', static_url_path='/')

app.config["DEBUG"] = True

my_data = {
  'amount_spent': [50,  10, 20, 5,  95,  70,  100,  200, 0],
  'send_discount': [0,   1,  1,  1,  0,   0,   0,    0,   1]
}

df = pd.DataFrame(my_data)    
X = df['amount_spent'].astype('float').values
y = df['send_discount'].astype('float').values
X = X.reshape(X.shape[0], 1)
clf = LogisticRegressor().fit(X, y)

@app.route('/time')
def get_current_time():
  return {'time': time.time()}

@app.route('/')
def index():
    return app.send_static_file('index.html')


# A route to return all of the available entries in our catalog.
@app.route('/api/data/all', methods=['GET'])
def api_all():    
  return jsonify(my_data)

@app.route('/api/data/predict/<id>', methods=['POST'])
def add_message(id):
  """modify/update the information for <user_id>"""
  print(request)
  content = request.json
  print(content)
  

  X_test = np.array(content['arr_amount_spent'])
  X_test = X_test.reshape(X_test.shape[0], 1)
  y_test = clf.predict(X_test)
  
  # return predictions
  return jsonify({"predictions": y_test.tolist()})

@app.route('/api/data/plots', methods=['GET'])
def api_send_plot():
    bytes_obj = clf.do_plot()
    
    return send_file(bytes_obj,
                     attachment_filename='plot.png',
                     mimetype='image/png')

app.run()