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

function ShowTask() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(null);
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
                const response = loggedIn?.role === "Manager"
                    ? await fetchallTasks()
                    : await fetchemployeeTasks(username);
                setTasks(response.tasks || []);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch tasks.");
            }
        };
        if (loggedIn !== null) fetchTasks();
    }, [loggedIn, username]);

    const completeTask = async (id) => {
        try {
            await completeById(id);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === id ? { ...task, workStatus: "complete" } : task
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

    const deleteTask = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteWorkById(id);
                setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
                toast.success("Task deleted successfully!");
            } catch (e) {
                console.log(e);
                toast.error("Failed to delete task!");
            }
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
                    All Tasks
                </h1>
            </div>

            {/* Add Task Button (Manager Only) */}
            {loggedIn?.role === "Manager" && (
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => navigate("/add-work")}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add Task
                    </button>
                </div>
            )}

            {/* Task List */}
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
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                            >
                                {/* Task Details */}
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

                                {/* Buttons */}
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
                                                    onClick={() => completeTask(task._id)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                                                >
                                                    Complete
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteTask(task._id)}
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
        </div>
    );
}

export default ShowTask;