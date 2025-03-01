import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    completeById,
    deleteWorkById,
    fetchallTasks,
    fetchemployeeTasks
} from "../../Services/WorkService.js";
import { loggedUser } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert"; // Import if separate file
import CompleteConfirmationAlert from "../ConfirmetionAlerts/ComlateConfermetionAlert.jsx"; // Import if separate file

function ShowTask() {
    const [tasks, setTasks] = useState([]);
    const [loggedIn, setLoggedIn] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [completeId, setCompleteId] = useState(null);
    const [closingDelete, setClosingDelete] = useState(false);
    const [closingComplete, setClosingComplete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const user = await loggedUser();
                setLoggedIn(user);
            } catch (e) {
                console.log(e.message);
                setLoggedIn(null);
            }
        };
        fetchLoggedInUser();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                if (!loggedIn) return;

                let response;
                if (loggedIn.role === "Manager") {
                    response = await fetchallTasks();
                } else {
                    response = await fetchemployeeTasks(username);
                }

                // Apply filters after fetching
                let filteredTasks = response.tasks || [];

                // Search filter (by title)
                if (searchTerm) {
                    filteredTasks = filteredTasks.filter(task =>
                        task.title.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                // Status filter (Complete/Not Complete)
                if (filterStatus !== "all") {
                    filteredTasks = filteredTasks.filter(task =>
                        (filterStatus === "complete" ? task.workStatus === "complete" : task.workStatus !== "complete")
                    );
                }

                setTasks(filteredTasks);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch tasks.");
            }
        };

        fetchTasks();
    }, [loggedIn, username, searchTerm, filterStatus]); // Trigger fetch when these change

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
        setClosingDelete(false);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteWorkById(deleteId);
            setTasks(prevTasks => prevTasks.filter(task => task._id !== deleteId));
            toast.success("Task deleted successfully!");
        } catch (e) {
            console.log(e);
            toast.error("Failed to delete task!");
        }
    };

    const handleCompleteClick = (id) => {
        setCompleteId(id);
        setShowCompleteConfirm(true);
        setClosingComplete(false);
    };

    const handleCompleteConfirm = async () => {
        try {
            await completeById(completeId);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === completeId ? { ...task, workStatus: "complete" } : task
                )
            );
            toast.success("Task marked as complete!");
        } catch (e) {
            console.log(e);
            toast.error("Failed to complete task!");
        }
    };

    const viewTaskDetails = (id) => {
        navigate(`/view-details/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <button
                className="fixed top-27 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                <span className="text-sm font-medium">Back</span>
            </button>

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    All Tasks
                </h1>
            </div>

            <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by title..."
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
                    <option value="complete">Complete</option>
                    <option value="not-complete">Not Complete</option>
                </select>

                {loggedIn?.role === "Manager" && (
                    <button
                        onClick={() => navigate("/add-work")}
                        className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add Task
                    </button>
                )}
            </div>

            <div className="max-w-4xl mx-auto">
                {!loggedIn ? (
                    <p className="text-center text-xl text-red-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        Please log in to view tasks!
                    </p>
                ) : tasks.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No tasks available yet. Enjoy your day!
                    </p>
                ) : (
                    <div className="space-y-6">
                        {tasks.map((task, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center transform hover:scale-105"
                            >
                                <div className="flex-grow">
                                    <h4 className="text-xl font-semibold text-gray-800">{task.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        <span className="font-medium">Completion Date:</span> {new Date(task.completionDate).toLocaleDateString()}
                                    </p>
                                    <p
                                        className={`text-sm font-medium mt-1 ${
                                            task.workStatus === "complete" ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        <span className="font-medium">Status:</span> {task.workStatus}
                                    </p>
                                </div>

                                <div className="flex gap-3 mt-4 sm:mt-0">
                                    <button
                                        onClick={() => viewTaskDetails(task._id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                                    >
                                        View
                                    </button>
                                    {loggedIn?.role === "Manager" && (
                                        <>
                                            {task.workStatus !== "complete" && (
                                                <button
                                                    onClick={() => handleCompleteClick(task._id)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                                                >
                                                    Complete
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteClick(task._id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                                            >
                                                Delete
                                            </button>
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

            <CompleteConfirmationAlert
                showConfirm={showCompleteConfirm}
                setShowConfirm={setShowCompleteConfirm}
                completeId={completeId}
                setCompleteId={setCompleteId}
                closing={closingComplete}
                setClosing={setClosingComplete}
                onConfirm={handleCompleteConfirm}
            />
        </div>
    );
}

export default ShowTask;