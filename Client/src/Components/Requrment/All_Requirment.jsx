import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {allRequrments, updteRequrments, updteRequrmentsEmp} from "../../Services/RequrmentService.js";
import {loggedUser} from "../../Services/AuthService.js";

function AllRequirements() {
    const [requirements, setRequirements] = useState([]);
    const [loggedin, setLoggedin] = useState(null);
    const [editRequirement, setEditRequirement] = useState(null);
    const [editedData, setEditedData] = useState({name: "", reason: ""});

    useEffect(() => {
        const logged = async () => {
            try {
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
                setLoggedin(null);
            }
        };
        logged();
    }, []);

    useEffect(() => {
        const requrments = async () => {
            try {
                setRequirements(await allRequrments());
            } catch (e) {
                console.log(e);
                alert("Failed to fetch requirements");
            }
        };
        requrments();
    }, []);

    const navigate = useNavigate();

    const updateStatus = async (id, newStatus) => {
        try {
            await updteRequrments(id, newStatus);
            setRequirements(requirements.map(req => req._id === id ? {...req, requrmentStatus: newStatus} : req));
            alert(`Requirement ${newStatus} successfully.`);
        } catch (e) {
            console.log(e);
            alert(`Failed to ${newStatus} Requirement. Please try again.`);
        }
    };

    const handleEdit = (requirement) => {
        setEditRequirement(requirement._id);
        setEditedData({name: requirement.name, reason: requirement.reason});
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedData(prev => ({...prev, [name]: value}));
    };

    const handleSave = async (id) => {
        try {
            await updteRequrmentsEmp(id, editedData);
            setRequirements(requirements.map(req => req._id === id ? {...req, ...editedData} : req));
            setEditRequirement(null);
            alert("Requirement updated successfully.");
        } catch (e) {
            console.log(e);
            alert("Failed to update Requirement. Please try again.");
        }
    };

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <h1 className="text-white text-4xl font-bold mb-4 mt-20">All Requirements</h1>
            <button
                onClick={() => navigate("/submit-requrment")}
                className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
                Add Requirement
            </button>
            <div className="space-y-4 mt-6">
                {requirements.map((requirement, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex flex-col">
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
                                    <h4 className="text-2xl font-bold text-gray-800">{requirement.name}</h4>
                                    <p className="text-sm font-medium text-gray-800">{requirement.reason}</p>
                                </>
                            )}
                            <p className="text-xs text-gray-500 mt-1">Username: {requirement.username}</p>
                            <p className="text-xs text-gray-500 mt-1">Date: {new Date(requirement.date).toLocaleDateString()}</p>
                            <p
                                className={`text-sm font-medium mt-1 ${
                                    requirement.requrmentStatus === "Approved" ? "text-green-600" :
                                        requirement.requrmentStatus === "Cancelled" ? "text-red-600" : "text-gray-600"}`}
                            >
                                Status: {requirement.requrmentStatus}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {loggedin?.role === "Manager" ? (
                                <>
                                    {requirement.requrmentStatus === "Pending" && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(requirement._id, "Approved")}
                                                className="py-2 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => updateStatus(requirement._id, "Cancelled")}
                                                className="py-2 px-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700"
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
                                            className="py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(requirement)}
                                            className="py-2 px-4 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-yellow-600"
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
        </div>
    );
}

export default AllRequirements;
