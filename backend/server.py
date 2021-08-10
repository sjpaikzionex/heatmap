import json
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import pyodbc
import pandas

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_data():
    con = pyodbc.connect(

    )
    pass

@app.route('/drag', methods=['POST'])
def filter_data():
    pass

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )