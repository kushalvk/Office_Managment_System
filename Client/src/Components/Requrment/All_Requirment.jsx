import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    allRequrments,
    allRequrmentsByUsername,
    updteRequrments,
    updteRequrmentsEmp
} from "../../Services/RequrmentService.js";
import { loggedUser } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function AllRequirements() {
    const [requirements, setRequirements] = useState([]);
    const [loggedin, setLoggedin] = useState(null);
    const [editRequirement, setEditRequirement] = useState(null);
    const [editedData, setEditedData] = useState({ name: "", reason: "" });

    useEffect(() => {
        const fetchLoggedUser = async () => {
            try {
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
                setLoggedin(null);
            }
        };
        fetchLoggedUser();
    }, []);

    useEffect(() => {
        if (loggedin?.role === "Manager") {
            const fetchRequirements = async () => {
                try {
                    setRequirements(await allRequrments());
                } catch (e) {
                    console.log(e);
                    toast.error("Failed to fetch requirements");
                }
            };
            fetchRequirements();
        } else {
            const fetchRequirements = async () => {
                try {
                    setRequirements(await allRequrmentsByUsername(loggedin?.username));
                } catch (e) {
                    console.log(e);
                    toast.error("Failed to fetch requirements");
                }
            };
            fetchRequirements();
        }
    }, [loggedin?.role, loggedin?.username]);

    const navigate = useNavigate();

    const updateStatus = async (id, newStatus) => {
        try {
            await updteRequrments(id, newStatus);
            setRequirements(requirements.map(req => req._id === id ? { ...req, requrmentStatus: newStatus } : req));
            toast.success(`Requirement ${newStatus} successfully.`);
        } catch (e) {
            console.log(e);
            toast.error(`Failed to ${newStatus} Requirement. Please try again.`);
        }
    };

    const handleEdit = (requirement) => {
        setEditRequirement(requirement._id);
        setEditedData({ name: requirement.name, reason: requirement.reason });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (id) => {
        try {
            await updteRequrmentsEmp(id, editedData);
            setRequirements(requirements.map(req => req._id === id ? { ...req, ...editedData } : req));
            setEditRequirement(null);
            toast.success("Requirement updated successfully.");
        } catch (e) {
            console.log(e);
            toast.error("Failed to update Requirement. Please try again.");
        }
    };

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
                    All Requirements
                </h1>
            </div>

            {/* Add Requirement Button */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => navigate("/submit-requrment")}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                >
                    Add Requirement
                </button>
            </div>

            {/* Requirement List */}
            <div className="max-w-4xl mx-auto">
                {requirements.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No requirements submitted yet.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {requirements.map((requirement, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                            >
                                {/* Requirement Details */}
                                <div className="flex-grow">
                                    {editRequirement === requirement._id ? (
                                        <>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editedData.name}
                                                onChange={handleChange}
                                                className="border border-gray-300 p-2 rounded-md w-full"
                                            />
                                            <input
                                                type="text"
                                                name="reason"
                                                value={editedData.reason}
                                                onChange={handleChange}
                                                className="border border-gray-300 p-2 rounded-md w-full mt-2"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <h4 className="text-xl font-semibold text-gray-800">{requirement.name}</h4>
                                            <p className="text-gray-600 mt-1">{requirement.reason}</p>
                                        </>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">Username: {requirement.username}</p>
                                    <p className="text-sm text-gray-500 mt-1">Date: {new Date(requirement.date).toLocaleDateString()}</p>
                                    <p
                                        className={`text-sm font-medium mt-1 ${
                                            requirement.requrmentStatus === "Approved" ? "text-green-600" :
                                                requirement.requrmentStatus === "Cancelled" ? "text-red-600" : "text-gray-600"
                                        }`}
                                    >
                                        Status: {requirement.requrmentStatus}
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 mt-4 sm:mt-0">
                                    {loggedin?.role === "Manager" ? (
                                        <>
                                            {requirement.requrmentStatus === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(requirement._id, "Approved")}
                                                        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(requirement._id, "Cancelled")}
                                                        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {editRequirement === requirement._id ? (
                                                <button
                                                    onClick={() => handleSave(requirement._id)}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(requirement)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-400 transition-all duration-300"
                                                >
                                                    Update
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllRequirements;