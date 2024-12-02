import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Notification() {
    const [notifications, setNotifications] = useState([
        { id: 1, title: "Jay Hind", message: "Your task 'Project X' has been updated.", timestamp: "2 hours ago" },
        { id: 2, title: "Jay Bharat", message: "A new user 'John Doe' has been added.", timestamp: "1 day ago" },
        { id: 3, title: "Jay Mhadev", message: "You have a new comment on your report.", timestamp: "3 days ago" },
    ]);
    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-blue-800 to-blue-600 p-6 lg:p-8 ">
                <h1 className="text-white text-4xl font-bold  mb-4 mt-20">Notifications</h1>
                <div className="space-y-4 ">
                    {notifications.map(notification => (
                        <div key={notification.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:-translate-y-2">
                            <div className="flex flex-col  ">
                                <h4 className="text-2xl  font-bold font-medium text-gray-800">{notification.title}</h4>
                                <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                            </div>
                            <button
                                onClick={() => navigate("/view-notification/" + notification.id)}
                                className="ml-4 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Notification;