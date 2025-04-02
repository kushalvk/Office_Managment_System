import React from "react";
import { useNavigate } from "react-router-dom";
import Back_Button from "../BackButton/Back_Button";

function ContactUs() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Contact Us
                </h1>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Office Address</h2>
                        <p className="text-lg text-gray-600">
                            123 Office Street, Suite 456, Business City, Country
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Phone Number</h2>
                        <p className="text-lg text-gray-600">+1 (123) 456-7890</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Email Address</h2>
                        <p className="text-lg text-gray-600">support@officemanagement.com</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Business Hours</h2>
                        <p className="text-lg text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Location</h2>
                        <div className="bg-gray-300 rounded-lg overflow-hidden">
                            <iframe
                                width="100%"
                                height="300"
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1286886733925!2d72.9173733149303!3d21.181488085915413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0452fffffffff%3A0xffed0ea399687a7a!2sAmbaba%20Commerce%20College!5e0!3m2!1sen!2sin!4v1692091185947!5m2!1sen!2sin"
                                className="border-0"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300"
                        >
                            Get in Touch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;