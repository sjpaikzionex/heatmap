from flask import Flask, request, jsonify
from flask_cors import CORS
from heatmapController import HeatMapController

app = Flask(__name__)
CORS(app)

start_date = '2018-01-01'
end_date = '2021-03-31'
controller = HeatMapController(start_date=start_date, end_date=end_date)

@app.route('/set_dates', methods=['POST'])
def set_dates():
    dates = request.json
    controller.set_dates(dates)

    return jsonify(message='Dates Registered')


@app.route('/', methods=['GET'])
def get_binned_count():
    df_binned_cnt = controller.get_binned_info()
    return df_binned_cnt.to_json(orient='records')


@app.route('/drag', methods=['POST'])
def filter_data():
    dragged = request.json
    targets = controller.get_targets(dragged)

    return targets.to_json(orient='records')

@app.route('/get_selected', methods=['GET'])
def get_targets():
    df_target = controller.targets
    return df_target.to_json(orient='records')

@app.route('/target_count', methods=['POST'])
def get_target_count():
    cnt = request.json
    print(cnt)

    return jsonify(message='Target Count Received', data=cnt)


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
