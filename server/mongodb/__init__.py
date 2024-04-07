from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
# from .mongodb import *
from datetime import datetime

uri = "mongodb+srv://alanchelmickjr:2Qv09Q3j0HQ78huZ@cluster0.ykpjajh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Connect to MongoDB
db = client['brainwaves_db']
collection = db['brainwave_data']

def record_brainwaves(data):
    try:
        # Get the data from the request
        print(data)
        # Extract the relevant information from the data
        timestamp = datetime.now()
        state = "testing"
        session_id = "000"
        group_id = "testing"
        device_id = "90632889d635c755819aa11ffee21e2a"
        power_by_band = data.get('data')

        # Create a list of documents to be stored in MongoDB
        documents = []
        document = {
            'timestamp': timestamp,
            'state': state,
            'session_id': session_id,
            'group_id': group_id,
            'device_id': device_id,
            'power_by_band': data,
        }
        documents.append(document)

        # Insert the documents into the MongoDB collection
        collection.insert_many(documents)

    except Exception as e:
        # Handle any errors that occur
        return ({'error': str(e)})