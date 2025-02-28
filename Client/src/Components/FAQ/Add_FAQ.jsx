import React, { useState } from "react";
import {addFaq} from "../../Services/FaqService.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Add_FAQ() {

    const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
    const navigate = useNavigate();

    const handleAddFaq = async () => {
        try {
            await addFaq(newFaq);
            toast.success("Faq added successfully!");
            navigate("/faq");
        } catch (e) {
            console.log(e);
            toast.error("Error adding a faq");
        }
    };

    return (
        <div
            className="relative isolate h-full pt-12 p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute sm:top-[7.5vw] top-[80px] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-10">Frequently Asked Questions</h1>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Add a New FAQ</h2>
                <input
                    type="text"
                    placeholder="Enter question"
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                    className="w-full p-2 border rounded mb-2"
                />
                <textarea
                    placeholder="Enter answer"
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                    className="w-full p-2 border rounded mb-2"
                ></textarea>
                <button onClick={handleAddFaq}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add FAQ
                </button>
            </div>
        </div>
    );
}

export default Add_FAQ;
