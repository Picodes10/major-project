from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

# Initialize FastAPI app
app = FastAPI()

# Load the trained models
models = {
    "heart_disease": joblib.load("models/heart.pkl"),
    "diabetes": joblib.load("models/diabetes.pkl"),
    "parkinsons": joblib.load("models/parkinsons.pkl"),
}

# Define input schema for API request
class PredictionInput(BaseModel):
    features: list[float]  # Input features must be a list of floats

# Define prediction endpoint
@app.post("/predict/{disease}")
def predict_disease(disease: str, data: PredictionInput):
    # Check if the disease model exists
    model = models.get(disease)
    if not model:
        return {"error": "Invalid disease name"}

    # Convert input data to numpy array and reshape for prediction
    input_data = np.array(data.features).reshape(1, -1)

    # Perform prediction
    prediction = model.predict(input_data)[0]
    
    # Convert numeric prediction to readable result
    result = "Positive" if prediction == 1 else "Negative"

    return {"disease": disease.replace("_", " ").title(), "result": result}
