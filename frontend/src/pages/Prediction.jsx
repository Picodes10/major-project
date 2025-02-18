import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const diseaseInputs = {
    "liver_disease": ["Bilirubin", "Albumin", "ALP", "ALT", "AST"],
    "heart_disease": ["Age", "Cholesterol", "Blood Pressure", "ECG"],
    "diabetes": ["Glucose", "BMI", "Insulin", "Age"],
    "parkinsons": ["Tremor", "Voice Pitch", "Muscle Stiffness"],
    "stroke_risk": ["Age", "BMI", "Blood Pressure", "Heart Disease History"]
};

const Prediction = () => {
    const { disease } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`https://your-api-url/predict/${disease}`, formData);
        navigate("/result", { state: { prediction: response.data } });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl font-bold mb-4">Predict {disease.replace("_", " ")}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
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
                <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded-lg">
                    Predict
                </button>
            </form>
        </div>
    );
}

export default Prediction