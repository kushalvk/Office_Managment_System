import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {fetchSalary, deleteSalary, paysalary} from "../../Services/SalaryService.js";

function SalaryPage() {
    const [salaries, setSalaries] = useState([]);
    const navigate = useNavigate();

    const handlePayNow = async (salary) => {
        await paysalary(salary);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this salary record?")) {
            try {
                await deleteSalary(id);
                setSalaries(salaries.filter((salary) => salary._id !== id));
                alert("Salary record deleted successfully.");
            } catch (error) {
                console.error("Error deleting salary:", error);
                alert("Failed to delete salary record.");
            }
        }
    };

    useEffect(() => {
        const salary = async () => {
            try {
                const response = await fetchSalary();
                setSalaries(response);
            } catch (e) {
                console.error(e);
                alert("Error fetching Employees");
            }
        };
        salary();
    }, []);

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <h1 className="text-white text-4xl font-bold mb-4 mt-20">Salary Payments</h1>
            <button
                onClick={() => navigate("/add-salary")}
                className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 mb-4"
            >
                Add Salary
            </button>
            <div className="space-y-4 mt-6">
                {salaries.map((salary, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex flex-col">
                            <h4 className="text-2xl font-bold text-gray-800">{salary.name}</h4>
                            <p className="text-sm font-medium text-gray-800">Occupation: {salary.occupation}</p>
                            <p className="text-xs text-gray-500 mt-1">Last Payment
                                Date: {new Date(salary.updatedAt).toLocaleString()}</p>
                            <p className="text-xs text-gray-500 mt-1">Email: {salary.email}</p>
                            <p className="text-xs text-gray-500 mt-1">Mobile No: {salary.contact}</p>
                            <p className="text-xs text-gray-500 mt-1">Amount: ₹{salary.amount}</p>
                        </div>
                        <div className="flex gap-3">
                        <button
                                onClick={() => handlePayNow(salary)}
                                className="text-white bg-green-600 hover:bg-green-500 font-semibold py-2 px-4 rounded-lg focus:outline-none"
                            >
                                Pay Now
                            </button>
                            <button
                                onClick={() => handleDelete(salary._id)}
                                className="text-white bg-red-600 hover:bg-red-500 font-semibold py-2 px-4 rounded-lg focus:outline-none"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SalaryPage;
