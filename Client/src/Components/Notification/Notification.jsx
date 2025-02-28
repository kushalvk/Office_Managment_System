import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotifications, deleteNotification } from "../../Services/NotificationService.js";
import { loggedUser } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
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
        const getNotifications = async () => {
            try {
                const response = await fetchNotifications();
                setNotifications(response || []);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch notifications.");
            }
        };
        if (loggedIn !== null) getNotifications(); // Wait for loggedIn to be set
    }, [loggedIn]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this notification?")) {
            try {
                await deleteNotification(id);
                setNotifications(prev => prev.filter(notification => notification._id !== id));
                toast.success("Notification deleted successfully!");
            } catch (err) {
                console.error("Error deleting notification:", err);
                toast.error("Failed to delete notification.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 pt-15">
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
                    Notifications
                </h1>
            </div>

            {/* Add Notification Button (Manager Only) */}
            {loggedIn?.role === "Manager" && (
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => navigate("/add-notification")}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add Notification
                    </button>
                </div>
            )}

            {/* Notification List */}
            <div className="max-w-4xl mx-auto">
                {notifications.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No notifications available yet.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {notifications.map((notification, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                            >
                                {/* Notification Details */}
                                <div className="flex-grow">
                                    <h4 className="text-xl font-semibold text-gray-800">{notification.title}</h4>
                                    <p className="text-gray-600 mt-1">{notification.message}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <span className="font-medium">Date:</span> {new Date(notification.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Delete Button (Manager Only) */}
                                {loggedIn?.role === "Manager" && (
                                    <button
                                        onClick={() => handleDelete(notification._id)}
                                        className="mt-4 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notification;