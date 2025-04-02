import React, { useEffect, useState } from "react";
import { loggedUser } from "../../Services/AuthService.js"; // Assuming this fetches the current user
import toast from "react-hot-toast";
import Back_Button from "../BackButton/Back_Button.jsx";

function E_Salary() {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const user = await loggedUser();
                setEmployee(user);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employee data:", error);
                toast.error("Failed to load salary details");
                setLoading(false);
            }
        };
        fetchEmployeeData();
    }, []);

    const totalSalary = employee
        ? (employee.sallary_per_day) * (employee.total_days || 0)
        : 0;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-full sm:max-w-md lg:max-w-lg">

                <Back_Button />

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
                    Employee Salary
                </h1>

                {loading ? (
                    <p className="text-center text-gray-600 text-base sm:text-lg">Loading salary details...</p>
                ) : employee ? (
                    <div className="space-y-6 sm:space-y-8">

                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <span className="text-gray-600 font-medium text-base sm:text-lg">Full Name:</span>
                                <span className="text-gray-800 text-base sm:text-lg">{employee.fullName}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <span className="text-gray-600 font-medium text-base sm:text-lg">Email:</span>
                                <span className="text-gray-800 text-base sm:text-lg">{employee.email}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <span className="text-gray-600 font-medium text-base sm:text-lg">Department:</span>
                                <span className="text-gray-800 text-base sm:text-lg">{employee.department || "N/A"}</span>
                            </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <span className="text-gray-600 font-medium text-base sm:text-lg">Salary per Day:</span>
                                <span className="text-gray-800 text-base sm:text-lg">
                                    ₹{employee.sallary_per_day || 700}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <span className="text-gray-600 font-medium text-base sm:text-lg">Total Days Worked:</span>
                                <span className="text-gray-800 text-base sm:text-lg">{employee.total_days || 0}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <span className="text-gray-600 font-medium text-base sm:text-lg">Total Salary:</span>
                                <span className="text-gray-800 font-semibold text-lg sm:text-xl">₹{totalSalary}</span>
                            </div>
                            {employee.last_payemnt_date && (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                    <span className="text-gray-600 font-medium text-base sm:text-lg">Last Payment:</span>
                                    <span className="text-gray-800 text-base sm:text-lg">
                                        {new Date(employee.last_payemnt_date).toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-red-600 text-base sm:text-lg">
                        Unable to load employee data.
                    </p>
                )}
            </div>
        </div>
    );
}

export default E_Salary;