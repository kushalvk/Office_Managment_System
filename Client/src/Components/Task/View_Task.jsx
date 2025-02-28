import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchTaskById, updateWorkById } from "../../Services/WorkService.js";
import { loggedUser } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function ViewTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        title: "",
        description: "",
        completionDate: "",
    });
    const [loggedIn, setLoggedIn] = useState(null);

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
        const getTask = async () => {
            try {
                const response = await fetchTaskById(id);
                setTask(response.tasks);
                setUpdatedTask({
                    title: response.tasks.title,
                    description: response.tasks.description,
                    completionDate: new Date(response.tasks.completionDate).toISOString().split("T")[0],
                });
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch task details.");
            }
        };
        getTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await updateWorkById(id, updatedTask);
            setTask(prev => ({ ...prev, ...updatedTask }));
            setEditMode(false);
            toast.success("Work updated successfully!");
        } catch (e) {
            console.log("Update failed:", e);
            toast.error("Failed to update work.");
        }
    };

    if (!task) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 flex justify-center items-center">
                <p className="text-white text-lg font-semibold">Loading...</p>
            </div>
        );
    }

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
                    Work Details
                </h1>
            </div>

            {/* Task Details Card */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    {editMode ? (
                        <input
                            type="text"
                            name="title"
                            value={updatedTask.title}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                        />
                    ) : (
                        <h2 className="text-2xl font-semibold text-gray-800 mt-1">{task.title}</h2>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    {editMode ? (
                        <textarea
                            name="description"
                            value={updatedTask.description}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1 h-24 resize-y"
                        />
                    ) : (
                        <p className="text-gray-600 mt-1">{task.description}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                    {editMode ? (
                        <input
                            type="date"
                            name="completionDate"
                            value={updatedTask.completionDate}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                        />
                    ) : (
                        <p className="text-gray-600 mt-1">{new Date(task.completionDate).toLocaleDateString()}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                    <div className="flex flex-col sm:flex-row gap-6 mt-2">
                        {task.groupName.length > 0 && (
                            <div>
                                <p className="text-blue-700 font-semibold">Group Name:</p>
                                <ul className="mt-2 space-y-1 text-gray-600">
                                    {task.groupName.map((group, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            {group}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {task.empoyeeName.length > 0 && (
                            <div>
                                <p className="text-blue-700 font-semibold">Employee:</p>
                                <ul className="mt-2 space-y-1 text-gray-600">
                                    {task.empoyeeName.map((employee, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            {employee}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Creation Date</label>
                    <p className="text-gray-600 mt-1">{new Date(task.createdAt).toLocaleDateString()}</p>
                </div>

                {task.createdAt !== task.updatedAt && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Updated Date</label>
                        <p className="text-gray-600 mt-1">{new Date(task.updatedAt).toLocaleDateString()}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p
                        className={`mt-1 text-sm font-medium ${
                            task.workStatus === "complete" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {task.workStatus}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 mt-8">
                {loggedIn?.role === "Manager" && (
                    <>
                        {editMode ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 w-full sm:w-auto"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto"
                            >
                                Edit
                            </button>
                        )}
                    </>
                )}
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 mb-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 max-w-2xl"
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default ViewTask;