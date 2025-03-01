import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { allStaff, deleteStaff } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert.jsx";

function All_Staff() {
    const [staff, setStaff] = useState([]);
    const [filteredStaff, setFilteredStaff] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDept, setSelectedDept] = useState("all");
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [closing, setClosing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await allStaff();
                setStaff(response.employees);
                setFilteredStaff(response.employees);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch staff data");
            }
        };
        fetchData();
    }, []);

    // Search and Filter Logic
    useEffect(() => {
        let result = staff;

        // Search filter
        if (searchTerm) {
            result = result.filter(employee =>
                employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Department filter
        if (selectedDept !== "all") {
            result = result.filter(employee =>
                employee.department.toLowerCase() === selectedDept.toLowerCase()
            );
        }

        setFilteredStaff(result);
    }, [searchTerm, selectedDept, staff]);

    // Get unique departments for filter dropdown
    const departments = ["all", ...new Set(staff.map(emp => emp.department))];

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
        setClosing(false); // Reset closing state when opening
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteStaff(deleteId);
            setStaff(staff.filter(employee => employee._id !== deleteId));
            setFilteredStaff(filteredStaff.filter(employee => employee._id !== deleteId));
            toast.success("Staff member deleted successfully!");
        } catch (e) {
            console.log(e);
            toast.error("Failed to delete staff member");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <button
                className="fixed top-27 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                <span className="text-sm font-medium">Back</span>
            </button>

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    All Staff
                </h1>
            </div>

            <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 bg-white/90 backdrop-blur-sm"
                />
                <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full sm:w-1/4 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 bg-white/90 backdrop-blur-sm"
                >
                    {departments.map((dept) => (
                        <option key={dept} value={dept} className="bg-white">
                            {dept === "all" ? "All Departments" : dept}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => navigate("/adduser")}
                    className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                >
                    Add Staff
                </button>
            </div>

            <div className="max-w-6xl mx-auto">
                {filteredStaff.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No staff members found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStaff.map((employee, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                <img
                                    src={employee.profilePhoto
                                        ? `${employee.profilePhoto}`
                                        : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                    }
                                    alt={employee.fullName}
                                    className="w-20 h-20 rounded-full mx-auto mb-4"
                                />
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
                                <div className="flex gap-4 mt-6">
                                    <button
                                        onClick={() => navigate(`/user-details/${employee._id}`)}
                                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(employee._id)}
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

            <DeleteConfirmationAlert
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                deleteId={deleteId}
                setDeleteId={setDeleteId}
                closing={closing}
                setClosing={setClosing}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}

export default All_Staff;