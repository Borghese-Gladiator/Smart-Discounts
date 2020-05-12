import numpy as np
import pandas as pd
import seaborn as sns
from pylab import rcParams
import matplotlib.pyplot as plt
from collections import OrderedDict
from scipy.special import expit
import unittest

sns.set(style='whitegrid', palette='muted', font_scale=1.5)

rcParams['figure.figsize'] = 14, 8

RANDOM_SEED = 42

np.random.seed(RANDOM_SEED)

def run_tests():
  unittest.main(argv=[''], verbosity=1, exit=False)

data = OrderedDict(
    amount_spent =  [50,  10, 20, 5,  95,  70,  100,  200, 0],
    send_discount = [0,   1,  1,  1,  0,   0,   0,    0,   1]
)

df = pd.DataFrame.from_dict(data)

df.plot.scatter(x='amount_spent', y='send_discount', s=108, c="blue");

def sigmoid(z):
#   return 1 / (1 + np.exp(-z))
  return expit(z)

def loss(h, y):
  return (-y * np.log(h) - (1 - y) * np.log(1 - h)).mean()

class LogisticRegressor:
  
  def _add_intercept(self, X):
    intercept = np.ones((X.shape[0], 1)) 
    return np.concatenate((intercept, X), axis=1)

  def predict_probs(self, X):
    X = self._add_intercept(X)
    return sigmoid(np.dot(X, self.W))
  
  def predict(self, X):
    return self.predict_probs(X).round()
      
  def fit(self, X, y, n_iter=100000, lr=0.01):
    X = self._add_intercept(X)
    self.W = np.zeros(X.shape[1])

    for i in range(n_iter):
        z = np.dot(X, self.W)
        h = sigmoid(z)
        gradient = np.dot(X.T, (h - y)) / y.size
        self.W -= lr * gradient
    return self

class TestSigmoid(unittest.TestCase):

    def test_at_zero(self):
      self.assertAlmostEqual(sigmoid(0), 0.5)
        
    def test_at_negative(self):
      self.assertAlmostEqual(sigmoid(-100), 0)
        
    def test_at_positive(self):
      self.assertAlmostEqual(sigmoid(100), 1)

class TestLoss(unittest.TestCase):

  def test_zero_h_zero_y(self):
    self.assertLess(loss(h=0.000001, y=.000001), 0.0001)

  def test_one_h_zero_y(self):
    self.assertGreater(loss(h=0.9999, y=.000001), 9.0)

  def test_zero_h_one_y(self):
    self.assertGreater(loss(h=0.000001, y=0.9999), 9.0)

  def test_one_h_one_y(self):
    self.assertLess(loss(h=0.999999, y=0.999999), 0.0001)

class TestLogisticRegressor(unittest.TestCase):

    def test_correct_prediction(self):
      X = df['amount_spent'].astype('float').values
      y = df['send_discount'].astype('float').values

      X = X.reshape(X.shape[0], 1)
      y_hat = LogisticRegressor().fit(X, y).predict(X)
      self.assertTrue((y_hat == y).all())

if __name__ == '__main__':
    
    X = df['amount_spent'].astype('float').values
    y = df['send_discount'].astype('float').values
    X = X.reshape(X.shape[0], 1)
    clf = LogisticRegressor().fit(X, y)

    X_test = np.array([10, 250])
    X_test = X_test.reshape(X_test.shape[0], 1)
    y_test = clf.predict(X_test)
    print(y_test)
    print(y_test.flatten())