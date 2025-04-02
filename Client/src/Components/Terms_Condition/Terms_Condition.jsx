import React from "react";
import Back_Button from "../BackButton/Back_Button";

function TermsConditions() {
    const terms = [
        {
            id: 1,
            title: "Acceptance of Terms",
            description: "By using our services, you agree to abide by our terms and conditions.",
        },
        {
            id: 2,
            title: "User Responsibilities",
            description: "Users must provide accurate information and comply with our policies.",
        },
        {
            id: 3,
            title: "Intellectual Property",
            description: "All content and materials are owned by the company and cannot be copied without permission.",
        },
        {
            id: 4,
            title: "Limitation of Liability",
            description: "We are not responsible for any losses or damages incurred while using our services.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Terms & Conditions
                </h1>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {terms.map((term) => (
                        <div
                            key={term.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <h2 className="text-xl font-bold text-gray-800">{term.title}</h2>
                            <p className="text-sm text-gray-600 mt-2">{term.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TermsConditions;