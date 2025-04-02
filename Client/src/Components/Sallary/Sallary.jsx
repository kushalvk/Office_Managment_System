import React, { useEffect, useState } from "react";
import { allStaff, loggedUser } from "../../Services/AuthService.js";
import { paysalary } from "../../Services/SalaryService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";

function SalaryPage() {
    const [staff, setStaff] = useState([]);
    const [editingSalaryId, setEditingSalaryId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const user = await loggedUser();

                const response = await allStaff();
                const employees = response.employees || [];
                await new Promise(resolve => setTimeout(resolve, 2000));
                if (user && user._id) {
                    setStaff(employees.filter(emp => emp._id !== user._id));
                } else {
                    setStaff(employees);
                }
            } catch (e) {
                console.error("Error fetching data:", e);
                toast.error("Failed to fetch staff data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handlePayNow = (staffMember) => {
        setEditingSalaryId(staffMember.username);
    };

    const handleConfirmPayment = async (staffMember) => {
        const amount = (staffMember.sallary_per_day || 700) * (staffMember.total_days || 0);

        if (isNaN(amount) || amount <= 0) {
            toast.error("No payment due (total days is 0 or salary is invalid).");
            setEditingSalaryId(null);
            return;
        }

        try {
            const paymentData = {
                _id: staffMember._id,
                username: staffMember.username,
                name: staffMember.fullName,
                email: staffMember.email,
                contact: staffMember.mobNo,
                amount,
                last_payment_date: new Date().toISOString(),
            };

            await paysalary(paymentData);

            setStaff(prev =>
                prev.map(s =>
                    s.username === staffMember.username
                        ? { ...s, last_payemnt_date: new Date().toISOString() }
                        : s
                )
            );

            setEditingSalaryId(null);
            toast.success(`Payment of ${amount} processed successfully for ${staffMember.fullName}.`);
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Failed to process payment.");
        }
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">
            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Salary Payments
                </h1>
            </div>

            <div className="max-w-6xl mx-auto">
                {staff.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No staff records found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {staff.map((staffMember) => (
                            <div
                                key={staffMember.username}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="flex-grow">
                                    <h4 className="text-xl font-bold text-gray-800">{staffMember.fullName}</h4>
                                    <p className="text-sm text-gray-600">Department: {staffMember.department}</p>
                                    <p className="text-sm text-gray-500 mt-2">Email: {staffMember.email}</p>
                                    <p className="text-sm text-gray-500 mt-2">Mobile No: {staffMember.mobNo}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Total Days: {staffMember.total_days || 0}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Salary per Day: {staffMember.sallary_per_day || 0}
                                    </p>
                                    {staffMember.last_payemnt_date && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            Last Payment: {new Date(staffMember.last_payemnt_date).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                                {editingSalaryId === staffMember.username ? (
                                    <div className="mt-6 space-y-3">
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleConfirmPayment(staffMember)}
                                                className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300"
                                            >
                                                ✅ Confirm Payment
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
                                    <div className="mt-6">
                                        <button
                                            onClick={() => handlePayNow(staffMember)}
                                            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SalaryPage;