import React from "react";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function PrivacyPolicies() {
    const navigate = useNavigate();
    const policies = [
        {
            id: 1,
            title: "Data Collection",
            description: "We collect personal data to improve our services and ensure security.",
        },
        {
            id: 2,
            title: "Use of Information",
            description: "Your information will only be used for operational and communication purposes.",
        },
        {
            id: 3,
            title: "Data Security",
            description: "We implement strong security measures to protect your personal information.",
        },
        {
            id: 4,
            title: "Third-Party Sharing",
            description: "We do not sell or share your personal data with third parties without consent.",
        },
    ];

    return (
        <div
            className="relative isolate h-full pt-12 p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute gap-2 sm:top-[7.5vw] top-[32vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-10">Privacy Policies</h1>

            {/* Policies List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                {policies.map((policy) => (
                    <div
                        key={policy.id}
                        className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-gray-800">{policy.title}</h2>
                        <p className="text-sm text-gray-600 mt-2">{policy.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrivacyPolicies;
