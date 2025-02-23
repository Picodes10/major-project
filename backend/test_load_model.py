import joblib

try:
    model = joblib.load("backend/models/heart.pkl")

    print("Model loaded successfully.")
except FileNotFoundError:
    print("Model file not found.")
except Exception as e:
    print(f"An error occurred: {e}")
