import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { allStaff, deleteStaff } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function All_Staff() {
    const [staff, setStaff] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await allStaff();
                setStaff(response.employees);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch staff data");
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this staff member?")) {
            try {
                await deleteStaff(id);
                setStaff(staff.filter(employee => employee._id !== id));
                toast.success("Staff member deleted successfully!");
            } catch (e) {
                console.log(e);
                toast.error("Failed to delete staff member");
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
                    All Staff
                </h1>
            </div>

            {/* Add Staff Button */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => navigate("/adduser")}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                >
                    Add Staff
                </button>
            </div>

            {/* Staff Grid */}
            <div className="max-w-6xl mx-auto">
                {staff.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No staff members found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {staff.map((employee, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                {/* Profile Photo */}
                                <img
                                    src={employee.profilePhoto
                                        ? `${employee.profilePhoto}`
                                        : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                    }
                                    alt={employee.fullName}
                                    className="w-20 h-20 rounded-full mx-auto mb-4"
                                />

                                {/* Employee Details */}
                                <h4 className="text-xl font-bold text-gray-800 text-center">{employee.fullName}</h4>
                                <p className="text-sm text-gray-600 text-center">{employee.role}</p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm text-gray-700">
                                        <strong>Department:</strong> {employee.department}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Email:</strong> {employee.email}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Phone:</strong> {employee.mobNo}
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 mt-6">
                                    <button
                                        onClick={() => navigate(`/user-details/${employee._id}`)}
                                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                        className="flex-1 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default All_Staff;