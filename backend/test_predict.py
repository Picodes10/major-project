import requests

# Sample data for prediction
data = {
    "model_name": "heart_disease",
    "symptoms": [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]  # Example symptoms

}

# Send a POST request to the /predict endpoint
response = requests.post("http://127.0.0.1:8000/predict", json=data)

# Print the response
print(response.json())
