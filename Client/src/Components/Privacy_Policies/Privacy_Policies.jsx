import React from "react";
import Back_Button from "../BackButton/Back_Button";

function PrivacyPolicies() {
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
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Privacy Policies
                </h1>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {policies.map((policy) => (
                        <div
                            key={policy.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <h2 className="text-xl font-bold text-gray-800">{policy.title}</h2>
                            <p className="text-sm text-gray-600 mt-2">{policy.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicies;