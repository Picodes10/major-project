import { useNavigate } from "react-router-dom";

const diseases = ["Heart Disease", "Diabetes", "Parkinson's"];

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Disease Prediction Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                {diseases.map((disease) => (
                    <button
                        key={disease}
                        onClick={() => navigate(`/predict/${disease.toLowerCase().replace(" ", "_")}`)}
                        className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        {disease}
                    </button>
                ))}
            </div>
        </div>
    );
}
