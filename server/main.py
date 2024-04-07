from flask import Flask, request, jsonify
from flask_cors import CORS
import mongodb



app = Flask(__name__)
cors = CORS(app, origins="*")
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/v1/hello-world')
def hellp_world():
    return jsonify({'message': 'MindFocus Pro Project API is up and running!'}), 200

@app.route('/api/v1/brainwaves/pbb/stream', methods=['POST'])
def brainwaves():
    try:
        mongodb.record_brainwaves(request.get_json())
        # Get the data from the request
        data = request.get_json()

        # Extract the relevant information from the data
        timestamp = data.get('timestamp')
        state = data.get('state')
        session_id = data.get('session_id')
        group_id = data.get('group_id')
        device_id = data.get('device_id')
        power_by_band = data.get('data')

        if __debug__:
            # Process the data as needed
            print(f"Timestamp: {timestamp}")
            print(f"State: {state}")
            print(f"Session ID: {session_id}")
            print(f"Group ID: {group_id}")
            print(f"Device ID: {device_id}")
            print(f"Power By Band: {power_by_band}")

        # Return a response
        return jsonify({'message': 'Data received successfully'}), 200

    except Exception as e:
        # Handle any errors that occur
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=8080)   


'''
from Nat 04/06/2024
{
  timestamp: 1213322,
  state: ‘focus’ or ‘break’,
   sessionId: 1,
  groupId: 1,
deviceId: 1
   data: { alpha, }
}'''