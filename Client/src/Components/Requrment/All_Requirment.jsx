import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    allRequrments,
    allRequrmentsByUsername,
    updteRequrments,
    updteRequrmentsEmp
} from "../../Services/RequrmentService.js";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert";
import ApproveConfirmationAlert from "../ConfirmetionAlerts/ApproveConfermetionAlert";

function AllRequirements() {
    const [requirements, setRequirements] = useState([]);
    const [loggedin, setLoggedin] = useState(null);
    const [editRequirement, setEditRequirement] = useState(null);
    const [editedData, setEditedData] = useState({name: "", reason: ""});
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [approveId, setApproveId] = useState(null);
    const [closingDelete, setClosingDelete] = useState(false);  // Added closing state
    const [closingApprove, setClosingApprove] = useState(false);  // Added closing state
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isUpdating, setIsUpdating] = useState(false);

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
        const fetchRequirements = async () => {
            try {
                if (!loggedin) return;

                let response;
                if (loggedin.role === "Manager") {
                    response = await allRequrments();
                } else {
                    response = await allRequrmentsByUsername(loggedin.username);
                }

                let filteredRequirements = response || [];

                if (searchTerm) {
                    filteredRequirements = filteredRequirements.filter(req =>
                        req.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                if (filterStatus !== "all") {
                    filteredRequirements = filteredRequirements.filter(req =>
                        req.requrmentStatus.toLowerCase() === filterStatus.toLowerCase()
                    );
                }

                setRequirements(filteredRequirements);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch requirements");
            }
        };

        fetchRequirements();
    }, [loggedin?.role, loggedin?.username, searchTerm, filterStatus]);

    const navigate = useNavigate();

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
        setClosingDelete(false);  // Reset closing state
    };

    const handleDeleteConfirm = async () => {
        try {
            await updteRequrments(deleteId, "Cancelled");  // Assuming this is the delete equivalent
            setRequirements(prev =>
                prev.map(req =>
                    req._id === deleteId ? {...req, requrmentStatus: "Cancelled"} : req
                )
            );
            toast.success("Requirement deleted successfully!");
        } catch (e) {
            console.log(e);
            toast.error("Failed to delete requirement.");
        }
    };

    const handleApproveClick = (id) => {
        setApproveId(id);
        setShowApproveConfirm(true);
        setClosingApprove(false);  // Reset closing state
    };

    const handleApproveConfirm = async () => {
        try {
            await updteRequrments(approveId, "Approved");
            setRequirements(prev =>
                prev.map(req =>
                    req._id === approveId ? {...req, requrmentStatus: "Approved"} : req
                )
            );
            toast.success("Requirement approved successfully!");
        } catch (e) {
            console.log(e);
            toast.error("Failed to approve requirement.");
        }
    };

    const handleUpdateConfirm = async (id) => {
        setIsUpdating(true);
        try {
            await updteRequrmentsEmp(id, editedData);
            setRequirements(prevRequirements =>
                prevRequirements.map(req =>
                    req._id === id ? {...req, ...editedData, requrmentStatus: "Pending"} : req
                )
            );
            toast.success("Requirement updated successfully.");
        } catch (e) {
            console.log(e);
            toast.error("Failed to update requirement. Please try again.");
            const oldData = await allRequrments();
            setRequirements(oldData);
        } finally {
            setIsUpdating(false);
            setEditRequirement(null);
            setEditedData({name: "", reason: ""});
        }
    };

    const handleEdit = (requirement) => {
        setEditRequirement(requirement._id);
        setEditedData({name: requirement.name, reason: requirement.reason});
    };

    const handleCancelEdit = () => {
        setEditRequirement(null);
        setEditedData({name: "", reason: ""});
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedData(prev => ({...prev, [name]: value}));
    };

    const handleSave = (id) => {
        handleUpdateConfirm(id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">
            <button
                className="fixed top-27 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{fontSize: 20}}/>
                <span className="text-sm font-medium">Back</span>
            </button>

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    All Requirements
                </h1>
            </div>

            <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 bg-white/90 backdrop-blur-sm"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full sm:w-1/4 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 bg-white/90 backdrop-blur-sm"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                {loggedin?.role === "Employee" && (
                    <button
                        onClick={() => navigate("/submit-requrment")}
                        className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add Requirement
                    </button>
                )}
            </div>
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
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center transform hover:scale-105"
                            >
                                <div className="flex-grow">
                                    {editRequirement === requirement._id ? (
                                        <>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editedData.name}
                                                onChange={handleChange}
                                                className="border border-gray-300 p-2 rounded-md w-full mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="reason"
                                                value={editedData.reason}
                                                onChange={handleChange}
                                                className="border border-gray-300 p-2 rounded-md w-full"
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
                                        className={`text-sm font-medium mt-1 ${requirement.requrmentStatus === "Approved" ? "text-green-600" : requirement.requrmentStatus === "Cancelled" ? "text-red-600" : "text-gray-600"}`}
                                    >
                                        Status: {requirement.requrmentStatus}
                                    </p>
                                </div>

                                <div className="flex gap-4 mt-4 sm:mt-0">
                                    {loggedin?.role === "Manager" ? (
                                        <>
                                            {requirement.requrmentStatus === "Pending" ? (
                                                <>
                                                    <button
                                                        onClick={() => handleApproveClick(requirement._id)}
                                                        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(requirement._id)}
                                                        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            ) : null}
                                        </>
                                    ) : (
                                        <>
                                            {editRequirement === requirement._id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleSave(requirement._id)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                                                        disabled={isUpdating}
                                                    >
                                                        {isUpdating ? "Saving..." : "Save"}
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
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

            <DeleteConfirmationAlert
                showConfirm={showDeleteConfirm}
                setShowConfirm={setShowDeleteConfirm}
                deleteId={deleteId}
                setDeleteId={setDeleteId}
                closing={closingDelete}
                setClosing={setClosingDelete}
                onConfirm={handleDeleteConfirm}
            />

            <ApproveConfirmationAlert
                showConfirm={showApproveConfirm}
                setShowConfirm={setShowApproveConfirm}
                approveId={approveId}
                setApproveId={setApproveId}
                closing={closingApprove}
                setClosing={setClosingApprove}
                onConfirm={handleApproveConfirm}
            />
        </div>
    );
}

export default AllRequirements;