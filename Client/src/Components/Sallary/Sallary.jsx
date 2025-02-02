import { useState } from "react";

function SalaryPage() {
    const [salaries, setSalaries] = useState([
        {
            id: 1,
            name: "John Doe",
            occupation: "Software Engineer",
            lastPaymentDate: "2024-11-15",
            amount: 50000,
        },
        {
            id: 2,
            name: "Jane Smith",
            occupation: "Project Manager",
            lastPaymentDate: "2024-11-10",
            amount: 60000,
        },
    ]);

    const handlePayNow = (id) => {
        // Handle the logic for paying the salary (e.g., updating the database)
        alert(`Salary paid to employee with ID: ${id}`);
    };

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>
            <h1 className="text-white text-4xl font-bold mb-4 mt-20">Salary Payments</h1>
            <div className="space-y-4 mt-6">
                {salaries.map((salary) => (
                    <div
                        key={salary.id}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex flex-col">
                            <h4 className="text-2xl font-bold text-gray-800">{salary.name}</h4>
                            <p className="text-sm font-medium text-gray-800">Occupation: {salary.occupation}</p>
                            <p className="text-xs text-gray-500 mt-1">Last Payment Date: {salary.lastPaymentDate}</p>
                            <p className="text-xs text-gray-500 mt-1">Amount: ₹{salary.amount}</p>
                        </div>
                        <button
                            onClick={() => handlePayNow(salary.id)}
                            className="ml-4 text-white bg-green-600 hover:bg-green-500 font-semibold py-2 px-4 rounded-lg focus:outline-none"
                        >
                            Pay Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SalaryPage;
