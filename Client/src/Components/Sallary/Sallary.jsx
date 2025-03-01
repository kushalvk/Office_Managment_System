import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSalary, deleteSalary, paysalary } from "../../Services/SalaryService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert.jsx";

function SalaryPage() {
    const [salaries, setSalaries] = useState([]);
    const [editingSalaryId, setEditingSalaryId] = useState(null);
    const [amountInputs, setAmountInputs] = useState({});
    const navigate = useNavigate();

    // State variables for the delete confirmation alert
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [closing, setClosing] = useState(false);

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
        setAmountInputs(prev => ({ ...prev, [id]: amount }));
    };

    const handleAmountChange = (id, value) => {
        setAmountInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleConfirmPayment = async (salary) => {
        const amount = parseFloat(amountInputs[salary._id]);
        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        try {
            await paysalary({ ...salary, amount });
            setEditingSalaryId(null);
            toast.success("Payment processed successfully.");
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Failed to process payment.");
        }
    };

    // Updated handleDelete function to open the confirmation alert
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    // Function to perform the actual deletion after confirmation
    const onConfirmDelete = async () => {
        try {
            await deleteSalary(deleteId);
            setSalaries(salaries.filter((salary) => salary._id !== deleteId));
            toast.success("Salary record deleted successfully.");
        } catch (error) {
            console.error("Error deleting salary:", error);
            toast.error("Failed to delete salary record.");
        } finally {
            // Reset the state variables
            setDeleteId(null);
            setShowConfirm(false); // Close the modal
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
                    Salary Payments
                </h1>
            </div>

            <div className="flex justify-center mb-8">
                <button
                    onClick={() => navigate("/add-salary")}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                >
                    Add Salary
                </button>
            </div>

            <div className="max-w-6xl mx-auto">
                {salaries.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No salary records found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {salaries.map((salary) => (
                            <div
                                key={salary._id}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <h4 className="text-xl font-bold text-gray-800">{salary.name}</h4>
                                <p className="text-sm text-gray-600">Occupation: {salary.occupation}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Last Payment Date: {new Date(salary.updatedAt).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">Email: {salary.email}</p>
                                <p className="text-sm text-gray-500 mt-2">Mobile No: {salary.contact}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Last Payment Amount: {salary.amount}
                                </p>
                                {editingSalaryId === salary._id ? (
                                    <div className="mt-4 space-y-3">
                                        <input
                                            type="number"
                                            value={amountInputs[salary._id]}
                                            onChange={(e) => handleAmountChange(salary._id, e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter Amount"
                                        />
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleConfirmPayment(salary)}
                                                className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300"
                                            >
                                                ✅ Confirm
                                            </button>
                                            <button
                                                onClick={() => setEditingSalaryId(null)}
                                                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-300"
                                            >
                                                ❌ Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex gap-3 mt-6">
                                            <button
                                                onClick={() => handleEditAmount(salary._id, salary.amount)}
                                                className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
                                            >
                                                Pay Now
                                            </button>
                                            <button
                                                onClick={() => handleDelete(salary._id)}
                                                className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
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
                onConfirm={onConfirmDelete}
            />
        </div>
    );
}

export default SalaryPage;
