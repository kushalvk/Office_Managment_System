import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotifications, deleteNotification } from "../../Services/NotificationService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert.jsx";
import Loader from "../Loader/Loader.jsx";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [closing, setClosing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const user = await loggedUser();
                setLoggedIn(user);

                const response = await fetchNotifications();
                await new Promise(resolve => setTimeout(resolve, 1000));
                setNotifications(response || []);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch notifications.");
                setLoggedIn(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const onConfirmDelete = async () => {
        try {
            await deleteNotification(deleteId);
            setNotifications(prev => prev.filter(notification => notification._id !== deleteId));
            toast.success("Notification deleted successfully!");
        } catch (err) {
            console.error("Error deleting notification:", err);
            toast.error("Failed to delete notification.");
        } finally {
            setDeleteId(null);
            setShowConfirm(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 pt-15">
            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Notifications
                </h1>
            </div>

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
                                <div className="flex-grow">
                                    <h4 className="text-xl font-semibold text-gray-800">{notification.title}</h4>
                                    <p className="text-gray-600 mt-1">{notification.message}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <span className="font-medium">Date:</span> {new Date(notification.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

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

            <DeleteConfirmationAlert
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                deleteId={deleteId}
                setDeleteId={setDeleteId}
                closing={closing}
                setClosing={setClosing}
                onConfirm={onConfirmDelete}
            />
        </div>
    );
}

export default Notification;