from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/v1/hello-world')
def hellp_world():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(debug=True, port=8080)   