import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchSalary, deleteSalary, paysalary} from "../../Services/SalaryService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function SalaryPage() {
    const [salaries, setSalaries] = useState([]);
    const [editingSalaryId, setEditingSalaryId] = useState(null);
    const [amountInputs, setAmountInputs] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await fetchSalary();
                setSalaries(response);
                const amounts = {};
                response.forEach(salary => {
                    amounts[salary._id] = salary.amount;
                });
                setAmountInputs(amounts);
            } catch (e) {
                console.error(e);
                toast.error("Error fetching salaries.");
            }
        };
        fetchSalaries();
    }, []);

    const handleEditAmount = (id, amount) => {
        setEditingSalaryId(id);
        setAmountInputs(prev => ({...prev, [id]: amount}));
    };

    const handleAmountChange = (id, value) => {
        setAmountInputs(prev => ({...prev, [id]: value}));
    };

    const handleConfirmPayment = async (salary) => {
        const amount = parseFloat(amountInputs[salary._id]);
        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        try {
            await paysalary({...salary, amount});
            setEditingSalaryId(null);
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Failed to process payment.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this salary record?")) {
            try {
                await deleteSalary(id);
                setSalaries(salaries.filter((salary) => salary._id !== id));
                toast.success("Salary record deleted successfully.");
            } catch (error) {
                console.error("Error deleting salary:", error);
                toast.error("Failed to delete salary record.");
            }
        }
    };

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute top-4 right-4 flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> Back
            </button>
            <h1 className="text-white text-3xl sm:text-4xl font-bold mb-6 mt-16 text-center sm:text-left">Salary Payments</h1>
            <div className="flex justify-center sm:justify-start">
                <button
                    onClick={() => navigate("/add-salary")}
                    className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 mb-6"
                >
                    Add Salary
                </button>
            </div>
            <div className="space-y-4 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {salaries.map((salary) => (
                    <div
                        key={salary._id}
                        className="flex flex-col bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="mb-3">
                            <h4 className="text-xl font-bold text-gray-800">{salary.name}</h4>
                            <p className="text-sm font-medium text-gray-800">Occupation: {salary.occupation}</p>
                            <p className="text-xs text-gray-500 mt-1">Last Payment Date: {new Date(salary.updatedAt).toLocaleString()}</p>
                            <p className="text-xs text-gray-500 mt-1">Email: {salary.email}</p>
                            <p className="text-xs text-gray-500 mt-1">Mobile No: {salary.contact}</p>
                            <p className="text-xs text-gray-500 mt-1">Last Payment Amount: {salary.amount}</p>
                        </div>
                        {editingSalaryId === salary._id && (
                            <div className="flex flex-col sm:flex-row gap-3 items-center mt-2">
                                <input
                                    type="number"
                                    value={amountInputs[salary._id]}
                                    onChange={(e) => handleAmountChange(salary._id, e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full sm:w-auto"
                                    placeholder="Enter Amount"
                                />
                                <button
                                    onClick={() => handleConfirmPayment(salary)}
                                    className="text-white bg-green-600 hover:bg-green-500 font-semibold py-2 px-4 rounded-lg w-full sm:w-auto"
                                >
                                    ✅ Confirm
                                </button>
                                <button
                                    onClick={() => setEditingSalaryId(null)}
                                    className="text-gray-700 border border-gray-400 rounded-lg py-2 px-4 hover:bg-gray-100 w-full sm:w-auto"
                                >
                                    ❌ Cancel
                                </button>
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button
                                onClick={() => handleEditAmount(salary._id, salary.amount)}
                                className="text-white bg-green-600 hover:bg-green-500 font-semibold py-2 px-4 rounded-lg w-full sm:w-auto"
                            >
                                Pay Now
                            </button>
                            <button
                                onClick={() => handleDelete(salary._id)}
                                className="text-white bg-red-600 hover:bg-red-500 font-semibold py-2 px-4 rounded-lg w-full sm:w-auto"
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
