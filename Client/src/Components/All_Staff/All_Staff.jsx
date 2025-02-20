import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { allStaff, deleteStaff } from "../../Services/AuthService.js";

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
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this staff member?")) {
            try {
                await deleteStaff(id);
                setStaff(staff.filter(employee => employee._id !== id));
                alert("Staff member Deleted successfully!");
            } catch (e) {
                console.log(e);
                alert("Failed to delete staff member");
            }
        }
    };

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <h1 className="text-white text-4xl font-bold mb-4 mt-20">All Staff</h1>
            <button
                onClick={() => navigate("/adduser")}
                className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500"
            >
                Add Staff
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {staff.map((employee, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
                        <img
                            src={employee.profilePhoto
                                ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${employee.profilePhoto}`
                                : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                            }
                            alt={employee.fullName}
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="text-xl font-bold text-gray-800 text-center">{employee.fullName}</h4>
                        <p className="text-sm text-gray-700 text-center">{employee.role}</p>
                        <p className="text-sm text-gray-700 mt-2"><strong>Department:</strong> {employee.department}</p>
                        <p className="text-sm text-gray-700 mt-2"><strong>Email:</strong> {employee.email}</p>
                        <p className="text-sm text-gray-700 mt-2"><strong>Phone:</strong> {employee.mobNo}</p>
                        <button
                            onClick={() => handleDelete(employee._id)}
                            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 w-full"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default All_Staff;
