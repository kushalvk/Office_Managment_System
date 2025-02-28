import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addSalary} from "../../Services/SalaryService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function AddSalary() {
    const occupationOptions = [
        {value: "", label: "Select Occupation"},
        {value: "Manager", label: "Manager"},
        {value: "Software Engineer", label: "Software Engineer"},
        {value: "Accountant", label: "Accountant"},
        {value: "Sales Executive", label: "Sales Executive"},
    ];

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [occupation, setOccupation] = useState("");
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addSalary({name, email, contact, occupation, amount});
            toast.success("Employee Added successfully!");
            navigate("/sallary");
        } catch (e) {
            console.log(e);
            toast.error("Error adding Employee");
        }
    };

    return (
        <div
            className="h-full p-6 lg:px-8 bg-gradient-to-r from-green-800 to-green-400 min-h-screen flex items-center justify-center">
            <button
                className="absolute sm:top-[7.5vw] top-[80px] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Salary</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="tel"
                        placeholder="Contact Number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />

                    <select
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        required
                        className="w-full p-2 border rounded bg-white"
                    >
                        {occupationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
                    >
                        Add Salary
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddSalary;
