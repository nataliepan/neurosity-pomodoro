from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, origins="*")
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/v1/hello-world')
def hellp_world():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(debug=True, port=8080)   