import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {addNotification} from "../../Services/NotificationService.js";

function AddNotification() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addNotification({ title, message });
            alert("Notification added successfully!");
            navigate("/notification");
        } catch (e) {
            console.log(e);
            alert("Fail to add Notification");
        }
    };

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen flex items-center justify-center">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                ></div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Notification</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter message"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors w-full"
                    >
                        Add Notification
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddNotification;
