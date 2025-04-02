import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRequrment } from "../../Services/RequrmentService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";

function AddRequirement() {
    const uname = localStorage.getItem("username");

    const [requirement, setRequirement] = useState({
        name: "",
        reason: "",
        username: uname,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequirement((prevRequirement) => ({ ...prevRequirement, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await addRequrment(requirement);
            toast.success("Requirement added successfully");
            navigate("/show-requirement");
        } catch (e) {
            console.log(e);
            toast.error("Failed to add requirement");
        }
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">
            {/* Back Button */}
            <Back_Button />

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Add Requirement
                </h1>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto">
                <form className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={requirement.name}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter requirement name"
                            />
                        </div>

                        {/* Reason Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Reason</label>
                            <textarea
                                name="reason"
                                value={requirement.reason}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter reason"
                                rows="4"
                            />
                        </div>

                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={requirement.username}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                placeholder="Enter username"
                                disabled
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300"
                        >
                            Submit Requirement
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddRequirement;