import React, { useState } from "react";
import { addFaq } from "../../Services/FaqService.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Back_Button from "../BackButton/Back_Button";

function Add_FAQ() {
    const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
    const navigate = useNavigate();

    const handleAddFaq = async () => {
        try {
            await addFaq(newFaq);
            toast.success("FAQ added successfully!");
            navigate("/faq");
        } catch (e) {
            console.log(e);
            toast.error("Error adding FAQ");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Add FAQ
                </h1>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Add a New FAQ</h2>
                    <div className="space-y-6">

                        <div>
                            <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                                Question
                            </label>
                            <input
                                type="text"
                                id="question"
                                placeholder="Enter question"
                                value={newFaq.question}
                                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                                Answer
                            </label>
                            <textarea
                                id="answer"
                                placeholder="Enter answer"
                                value={newFaq.answer}
                                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={handleAddFaq}
                                className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300"
                            >
                                Add FAQ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add_FAQ;