import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from heatmapController import HeatMapController

app = Flask(__name__)
CORS(app)

start_date = '2018-01-01'
end_date = '2021-03-31'
controller = HeatMapController(start_date=start_date, end_date=end_date)


@app.route('/', methods=['GET'])
def get_binned_count():
    df_binned_cnt = controller.get_binned_info()
    return df_binned_cnt.to_json(orient='records')


@app.route('/drag', methods=['POST'])
def filter_data():
    dragged = request.json
    targets = controller.get_targets(dragged)
    print(targets)

    return jsonify(message='Drag Succesful', data=targets)


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
