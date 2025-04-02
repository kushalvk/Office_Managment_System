import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { allStaff } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button.jsx";

function M_Attendance() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await allStaff();
                setAttendanceRecords(response.employees || []);
                setFilteredRecords(response.employees || []);
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
            const search = searchTerm.toLowerCase();

            return fullName.includes(search)
        });
        setFilteredRecords(filtered);
    }, [searchTerm, attendanceRecords]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-8 sm:px-6 lg:px-8">
            <Back_Button/>

            <div className="max-w-7xl mx-auto text-center pt-8 pb-6 sm:pt-12 sm:pb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white px-4">
                    All Employee Attendance
                </h1>
            </div>

            <div className="max-w-6xl mx-auto mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <input
                        type="text"
                        placeholder="Search by employee name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {loading ? (
                    <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg p-4">
                        Loading attendance records...
                    </p>
                ) : filteredRecords.length === 0 ? (
                    <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg bg-white p-4 rounded-lg shadow-md mx-2">
                        No attendance records found.
                    </p>
                ) : (
                    <div className="px-2 sm:px-0">
                        <div
                            className="overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                            <table className="w-full bg-white rounded-lg shadow-md table-fixed">
                                <thead>
                                <tr className="bg-gray-200 text-gray-700 text-left text-xs sm:text-sm uppercase font-semibold">
                                    <th className="py-4 px-6 w-40 sm:w-48">Employee Name</th>
                                    <th className="py-4 px-6 w-32 sm:w-40">Department</th>
                                    <th className="py-4 px-6 w-32 sm:w-40">Work Location</th>
                                    <th className="py-4 px-6 w-28 sm:w-32">Salary/Day</th>
                                    <th className="py-4 px-6 w-28 sm:w-32">Total Days</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredRecords.map((record) => (
                                    <tr
                                        key={`${record.username}-${record.date}`}
                                        className="border-t text-gray-700 text-sm sm:text-base hover:bg-gray-200 transition-colors duration-200 snap-start"
                                    >
                                        <td className="py-4 px-6 truncate">
                                            {record.fullName || record.username}
                                        </td>
                                        <td className="py-4 px-6 truncate">
                                            {record.department || "N/A"}
                                        </td>
                                        <td className="py-4 px-6 truncate">
                                            {record.workLocation || "N/A"}
                                        </td>
                                        <td className="py-4 px-6 truncate">
                                            {record.sallary_per_day || "N/A"}
                                        </td>
                                        <td className="py-4 px-6">
                                                <span className="font-semibold text-green-600">
                                                    {record.total_days}
                                                </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default M_Attendance;