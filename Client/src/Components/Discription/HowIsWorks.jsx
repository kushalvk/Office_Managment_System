import React from "react";

function HowItWorks() {
    return (
        <div className="container mx-auto p-6 pt-[20vw] sm:pt-[10vw]">
            <h1 className="text-3xl font-bold text-center mb-6">How This Website Works</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold">1. User Registration & Login</h2>
                <p className="text-gray-700">
                    New users can sign up with their details. Once registered, they can log in securely to access personalized features.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold">2. Dashboard Overview</h2>
                <p className="text-gray-700">
                    After logging in, users land on their dashboard, where they can manage tasks, view statistics, and interact with different modules.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold">3. Features & Functionalities</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Manage bookings, staff, and reports easily.</li>
                    <li>Upload and manage project details.</li>
                    <li>Interactive dashboard for real-time updates.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold">4. Secure Transactions</h2>
                <p className="text-gray-700">
                    The website ensures secure transactions for payments, data management, and user authentication using encryption techniques.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold">5. Logout & Security</h2>
                <p className="text-gray-700">
                    Users can log out anytime, and inactive sessions are automatically logged out for security purposes.
                </p>
            </section>

            <div className="text-center mt-6">
                <p className="text-lg font-semibold">Start exploring the features and enhance your experience today!</p>
            </div>
        </div>
    );
}

export default HowItWorks;
