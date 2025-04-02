import React from "react";
import { useNavigate } from "react-router-dom";
import Back_Button from "../BackButton/Back_Button";

function AboutUs() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 pt-29">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    About Us
                </h1>
                <p className="text-lg text-gray-200 mt-3">
                    Discover who we are and what drives us to empower your organization.
                </p>
            </div>

            <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-xl">
                <div className="space-y-6 text-gray-700">
                    <p className="text-lg leading-relaxed">
                        Welcome to our <span className="font-semibold text-blue-600">Office Management System</span>,
                        where we aim to revolutionize how organizations manage their day-to-day operations with
                        efficiency and precision.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Our system offers advanced tools for managing employees, tracking tasks, monitoring progress,
                        and streamlining workflows—designed to boost productivity and ensure your team’s success.
                    </p>
                    <p className="text-lg leading-relaxed">
                        With a passion for innovation, our dedicated team strives to deliver a seamless user experience,
                        leveraging the latest technology to simplify office management for businesses of all sizes.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;