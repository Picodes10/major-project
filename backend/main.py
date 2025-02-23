from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

# Initialize FastAPI app
app = FastAPI()

# Load the trained models
models = {}

try:
    models["heart_disease"] = joblib.load("backend/models/heart.pkl")

except FileNotFoundError:
    raise HTTPException(status_code=500, detail="Model file for heart disease not found.")

try:
    models["diabetes"] = joblib.load("backend/models/diabetes.pkl")

except FileNotFoundError:
    raise HTTPException(status_code=500, detail="Model file for diabetes not found.")

try:
    models["parkinsons"] = joblib.load("backend/models/parkinsons.pkl")

except FileNotFoundError:
    raise HTTPException(status_code=500, detail="Model file for Parkinson's disease not found.")

# Define input schema for API request
class PredictionRequest(BaseModel):
    model_name: str
    symptoms: list

@app.post("/predict")
def predict_disease(data: PredictionRequest):
    print(f"Received prediction request for model: {data.model_name}")  # Log the model name
    print(f"Input symptoms: {data.symptoms}")  # Log the input symptoms
    
    if data.model_name not in models:
        raise HTTPException(status_code=400, detail="Invalid model name")

    model = models[data.model_name]
    symptoms_array = np.array([data.symptoms])
    print(f"Formatted input array: {symptoms_array}")  # Log the formatted input
    
    try:
        prediction = model.predict(symptoms_array)
        print(f"Raw prediction output: {prediction}")  # Log the raw prediction
        print(f"Prediction type: {type(prediction)}")  # Log the prediction type
        # Convert numpy types to native Python types for JSON serialization
        prediction_value = int(prediction[0].item()) if hasattr(prediction[0], 'item') else int(prediction[0])
        print(f"Final prediction value: {prediction_value}")  # Log the final value
        return {"predicted_disease": prediction_value}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Disease Prediction API"}
