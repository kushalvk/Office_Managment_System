import React from "react";
import Back_Button from "../BackButton/Back_Button";
import { useNavigate } from "react-router-dom";

function OfficeGallery() {
    const navigate = useNavigate();

    const images = [
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400",
        "https://images.pexels.com/photos/3747132/pexels-photo-3747132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400",
        "https://images.pexels.com/photos/2041629/pexels-photo-2041629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400",
        "https://images.pexels.com/photos/373893/pexels-photo-373893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400",
        "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400",
        "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Office Gallery
                </h1>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <img
                                src={image}
                                alt={`Office ${index + 1}`}
                                className="object-cover w-full h-48"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OfficeGallery;