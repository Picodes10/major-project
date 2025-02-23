import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const diseaseInputs = {
  heart_disease: ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"],
  diabetes: ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"],
  parkinson: [
    "Average Vocal Fundamental Frequency",
    "Maximum Vocal Fundamental Frequency", 
    "Minimum Vocal Fundamental Frequency",
    "Jitter (Percentage)",
    "Jitter (Absolute)",
    "Relative Amplitude Perturbation",
    "Five-point Period Perturbation Quotient",
    "Jitter Differential",
    "Shimmer",
    "Shimmer (Decibels)",
    "Shimmer Amplitude Perturbation (3-point)",
    "Shimmer Amplitude Perturbation (5-point)",
    "Average Perturbation Quotient",
    "Shimmer Differential",
    "Noise-to-Harmonics Ratio",
    "Harmonics-to-Noise Ratio",
    "Status",
    "Recurrence Period Density Entropy",
    "Detrended Fluctuation Analysis",
    "Spread 1",
    "Spread 2",
    "D2",
    "Pitch Period Entropy"
  ],

};

const Prediction = () => {
  const { disease } = useParams();
  const [formData, setFormData] = useState({});
  const [predictionResult, setPredictionResult] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const BASE_URL = "https://disease-prediction-api.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/predict`, {
        model_name: disease,
        symptoms: Object.values(formData),

      });
      setPredictionResult(response.data.predicted_disease);

    } catch (error) {
      console.error("Prediction failed", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">
        Predict {disease.replace("_", " ")}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        {diseaseInputs[disease]?.map((input) => (
          <div key={input} className="mb-4">
            <label className="block font-medium">{input}</label>
            <input
              type="number"
              name={input}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 p-2 bg-green-500 text-white rounded-lg"
        >
          Predict
        </button>
      </form>
      {predictionResult !== null && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Prediction Result:</h2>
          <p className="text-lg">
            {predictionResult === 1 
              ? "The person has the disease." 
              : "The person doesn't have the disease."}
          </p>
        </div>
      )}

    </div>
  );
};

export default Prediction;
