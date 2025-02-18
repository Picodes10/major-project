import React from 'react';
import { useLocation } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const prediction = location.state?.prediction;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl font-bold mb-4">Prediction Result</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-medium">Diagnosis: {prediction?.result}</p>
                <p className="text-gray-700">Confidence: {prediction?.confidence}%</p>
            </div>
        </div>
    );

}

export default Result