import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

function TermsConditions() {
    const navigate = useNavigate();
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
        <div
            className="relative isolate h-full pt-12 p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute gap-2 top-[7.5vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-10">Terms & Conditions</h1>

            {/* Terms List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                {terms.map((term) => (
                    <div
                        key={term.id}
                        className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-gray-800">{term.title}</h2>
                        <p className="text-sm text-gray-600 mt-2">{term.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TermsConditions;
