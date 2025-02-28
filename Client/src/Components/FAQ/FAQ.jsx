import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFaq } from "../../Services/FaqService.js";
import { loggedUser } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function FAQ() {
    const navigate = useNavigate();
    const [faqs, setFaqs] = useState([]);
    const [loggedin, setLoggedin] = useState(null);

    useEffect(() => {
        const logged = async () => {
            try {
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
                setLoggedin(null);
            }
        };
        logged();
    }, []);

    useEffect(() => {
        const fetchFaqData = async () => {
            try {
                const response = await fetchFaq();
                setFaqs(response);
            } catch (e) {
                console.log(e);
                toast.error("Failed to load FAQs");
            }
        };
        fetchFaqData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">
            {/* Back Button */}
            <button
                className="fixed top-27 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                <span className="text-sm font-medium">Back</span>
            </button>

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Frequently Asked Questions
                </h1>
            </div>

            {/* FAQs Grid */}
            <div className="max-w-6xl mx-auto">
                {faqs.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No FAQs found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <h2 className="text-xl font-bold text-gray-800">{faq.question}</h2>
                                <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add New FAQ Button (Manager Only) */}
            {loggedin?.role === "Manager" && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => navigate("/add-faq")}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add New FAQ
                    </button>
                </div>
            )}
        </div>
    );
}

export default FAQ;