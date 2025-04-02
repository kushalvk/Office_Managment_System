import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { dailyAttendanceData } from "../../Services/AttendanceService.js";
import Back_Button from "../BackButton/Back_Button.jsx";

function M_Attendance() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await dailyAttendanceData();
                console.log(response);
                setAttendanceRecords(response || []);
                setFilteredRecords(response || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
                toast.error("Failed to load attendance records");
                setLoading(false);
            }
        };
        fetchAttendanceData();
    }, []);

    useEffect(() => {
        const filtered = attendanceRecords.filter(record => {
            const fullName = (record.fullName || record.username || "").toLowerCase();
            const date = new Date(record.date).toLocaleDateString().toLowerCase();
            const search = searchTerm.toLowerCase();

            return fullName.includes(search) || date.includes(search);
        });
        setFilteredRecords(filtered);
    }, [searchTerm, attendanceRecords]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-4 sm:p-6 lg:p-8">
            <Back_Button />

            <div className="max-w-6xl mx-auto text-center pt-12 sm:pt-16 pb-6 sm:pb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    All Daily Employee Attendance
                </h1>
            </div>

            <div className="max-w-6xl mx-auto mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <input
                        type="text"
                        placeholder="Search by employee name or date..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                {loading ? (
                    <p className="text-center text-gray-600 text-base sm:text-lg">
                        Loading attendance records...
                    </p>
                ) : filteredRecords.length === 0 ? (
                    <p className="text-center text-gray-600 text-base sm:text-lg bg-white p-4 rounded-lg shadow-md">
                        {searchTerm
                            ? "No matching attendance records found."
                            : "No attendance records found."}
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg shadow-md">
                            <thead>
                            <tr className="bg-gray-200 text-gray-700 text-left text-xs sm:text-sm uppercase font-semibold">
                                <th className="py-3 px-4">Employee Name</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Check-In</th>
                                <th className="py-3 px-4">Check-Out</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredRecords.map((record) => (
                                <tr
                                    key={`${record.username}-${record.date}`}
                                    className="border-t text-gray-700 text-xs sm:text-sm hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4">{record.fullName || record.username}</td>
                                    <td className="py-3 px-4">
                                        {new Date(record.date).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        {record.check_in
                                            ? new Date(record.check_in).toLocaleTimeString()
                                            : "N/A"}
                                    </td>
                                    <td className="py-3 px-4">
                                        {record.check_out
                                            ? new Date(record.check_out).toLocaleTimeString()
                                            : "N/A"}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`font-semibold ${
                                                record.check_in && !record.check_out
                                                    ? "text-green-600"
                                                    : record.check_in && record.check_out
                                                        ? "text-red-600"
                                                        : "text-gray-500"
                                            }`}
                                        >
                                            {record.check_in && !record.check_out
                                                ? "Checked In"
                                                : record.check_in && record.check_out
                                                    ? "Checked Out"
                                                    : "Not Marked"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default M_Attendance;