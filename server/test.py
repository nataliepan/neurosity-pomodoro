from neurosity import NeurositySDK
import os
import matplotlib.pyplot as plt
from collections import deque
import time
import mongodb
import json
from collections import OrderedDict

# Initialize the deque to store data points
data_points = deque(maxlen=500)  # Keeping last 50 data points

# Function to update the line chart
def update_chart(data):
    # Append the new data point to the deque
    data_points.append(data['probability'])
    
    # Clear the previous plot
    plt.clf()
    
    # Plot the data
    plt.plot(data_points)
    
    # Add labels and title
    plt.xlabel('Time')
    plt.ylabel('Data')
    plt.title('Running Line Chart')
    
    # Show the plot
    plt.pause(0.05)  # Pause for a short duration to update the plot

def update_chart_raw(data):
    # Extract frequencies from the data
    frequencies = data["data"]

    # Plot the frequencies
    plt.figure(figsize=(10, 6))
    for i, channel in enumerate(data["info"]["channelNames"]):
        plt.plot(frequencies[i], label=channel)

    # Add labels and title
    plt.xlabel('Data Points')
    plt.ylabel('Frequency')
    plt.title('Frequencies Line Chart')
    plt.legend()

    # Show the plot
    plt.show()


neurosity = NeurositySDK({
    "device_id": "90632889d635c755819aa11ffee21e2a"
})

neurosity.login({
    "email": "natalie.pan@gmail.com",
    "password": "hyjguq-7kabry-gaRfyr"
})

status = neurosity.status_once()
print("*" * 80)
print(status)
print("*" * 80)
# { state: "online", charging: true, battery: 93, ... }

def callback(data):
    print("*" * 80)
    print("data", data)
    print("*" * 80)
    # { state: "online", charging: true, battery: 93, ... }

unsubscribe = neurosity.status(callback)

def callback(data):
    print("-" * 80)
    print("data", data)
    print("-" * 80)
    ordered_dict = OrderedDict(data)
    # Convert OrderedDict to JSON
    json_data = json.dumps(ordered_dict)
    mongodb.record_brainwaves(data)

unsubscribe = neurosity.brainwaves_raw(callback)

# unsubscribe = neurosity.focus(callback)
# time.sleep(2)
# neurosity.add_marker("testing")
# time.sleep(2)
# unsubscribe()