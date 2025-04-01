import {useEffect, useState} from "react";
import {loggedUser} from "../../Services/AuthService.js";
import toast from "react-hot-toast";
import {checkIn, checkOut, getAttendanceData} from "../../Services/Attendance.js";

const Attendance = () => {
    const [status, setStatus] = useState('Not Marked');
    const [loggedIn, setLoggedIn] = useState({});
    const [attendanceData, setAttendanceData] = useState(null);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const user = await loggedUser();
                setLoggedIn(user);
            } catch (e) {
                console.log(e.message);
                toast.error("Failed to load user profile.");
            }
        };

        fetchLoggedInUser();
    }, []);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await getAttendanceData({username: loggedIn.username});
                if (response) {
                    setAttendanceData(response);

                    if (response.check_in && !response.check_out) {
                        setStatus("Checked In");
                    } else if (response.check_in && response.check_out) {
                        setStatus("Checked Out");
                    } else {
                        setStatus("Not Marked");
                    }
                }
            } catch (e) {
                console.log(e.message);
            }
        };
        fetchAttendanceData();
    },[loggedIn])

    const handleCheckIn = async () => {
        try {
            const now = new Date();
            const currentHour = now.getHours();

            if (currentHour < 8 || currentHour >= 9) {
                toast.error("Check-in allowed only between 8:00 AM and 9:00 AM.");
                return;
            }

            const response = await checkIn({ username: loggedIn.username });
            toast.success(response.message);
            setStatus("Checked In");
            setAttendanceData((prev) => ({ ...prev, check_in: new Date() }));
        } catch (e) {
            console.error("Check-in Error:", e.message);
            toast.error(e.message);
            return;
        }
    };


    const handleCheckOut = async () => {
        try {
            const now = new Date();
            const currentHour = now.getHours();

            if (currentHour < 18 || currentHour >= 19) {
                toast.error("Check-out allowed only between 6:00 PM and 7:00 PM.");
                return;
            }

            const response = await checkOut({ username: loggedIn.username });
            toast.success(response.message);
            setStatus("Checked Out");
            setAttendanceData((prev) => ({ ...prev, check_out: new Date() }));
        } catch (e) {
            console.error("Check-out Error:", e.message);
            toast.error(e.message);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-full sm:max-w-md lg:max-w-lg">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
                    Attendance
                </h2>

                {loggedIn && (
                    <div className="mb-6 sm:mb-8">
                        <div
                            className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-4">
                            <span className="text-gray-600 font-medium text-base sm:text-lg">Full Name:</span>
                            <span className="text-gray-800 text-base sm:text-lg">{loggedIn.fullName}</span>
                        </div>
                        <div
                            className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-4">
                            <span className="text-gray-600 font-medium text-base sm:text-lg">Email:</span>
                            <span className="text-gray-800 text-base sm:text-lg">{loggedIn.email}</span>
                        </div>
                        <div
                            className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                            <span className="text-gray-600 font-medium text-base sm:text-lg">Date:</span>
                            <span
                                className="text-gray-800 text-base sm:text-lg">{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                )}

                <div className="mb-6 sm:mb-8">
                    <p className="text-center text-gray-700 text-lg sm:text-xl">
                        Status:
                        <span
                            className={`ml-2 sm:ml-3 font-semibold text-lg sm:text-xl ${
                                status === "Checked In"
                                    ? "text-green-600"
                                    : status === "Checked Out"
                                        ? "text-red-600"
                                        : "text-gray-500"
                            }`}
                        >
                    {status}
                </span>
                    </p>

                    {attendanceData && (
                        <div className="mt-3 sm:mt-4 text-center text-base sm:text-lg">
                            {attendanceData.check_in && (
                                <p className="text-green-600">Check-in: {new Date(attendanceData.check_in).toLocaleString()}</p>
                            )}
                            {attendanceData.check_out && (
                                <p className="text-red-600">Check-out: {new Date(attendanceData.check_out).toLocaleString()}</p>
                            )}
                        </div>
                    )}
                </div>

                <div
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                    <button
                        onClick={handleCheckIn}
                        disabled={status === "Checked In"}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-base sm:text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                            status === "Checked In"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                    >
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={status === "Checked Out" || status === "Not Marked"}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-base sm:text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                            status === "Checked Out" || status === "Not Marked"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                    >
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
