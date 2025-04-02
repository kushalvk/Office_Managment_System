import React from "react";
import { useNavigate } from "react-router-dom";
import Back_Button from "../BackButton/Back_Button";

function HowItWorks() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    How This Website Works
                </h1>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. User Registration By Manager & Login</h2>
                    <p className="text-gray-600">
                        New users can sign up with their details through the Manager. Once registered, their login credentials are automatically sent to their email. After that, they can log in securely to access personalized features.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. Dashboard Overview</h2>
                    <p className="text-gray-600">
                        After logging in, users land on their dashboard, where they can manage tasks, view statistics, and interact with different modules.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Features & Functionalities</h2>
                    <ul className="list-disc pl-6 text-gray-600">
                        <li>Manage bookings, staff, and reports easily.</li>
                        <li>Upload and manage project details.</li>
                        <li>Interactive dashboard for real-time updates.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Secure Transactions</h2>
                    <p className="text-gray-600">
                        The website ensures secure transactions for payments, data management, and user authentication using encryption techniques.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Logout & Security</h2>
                    <p className="text-gray-600">
                        Users can log out anytime, and inactive sessions are automatically logged out for security purposes.
                    </p>
                </section>

                <div className="text-center mt-6">
                    <p className="text-lg font-semibold text-gray-800">
                        Start exploring the features and enhance your experience today!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;