import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchFacilities } from "../../Services/FacilitiesService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";

function Facilities() {
    const navigate = useNavigate();
    const [facilities, setFacilities] = useState([]);
    const [loggedin, setLoggedin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const logged = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
                setLoggedin(null);
            } finally {
                setIsLoading(false);
            }
        };
        logged();
    }, []);

    useEffect(() => {
        const fetchFacilitiesData = async () => {
            try {
                const response = await fetchFacilities();
                setFacilities(response);
            } catch (e) {
                console.log(e);
                toast.error("Failed to load facilities");
            }
        };
        fetchFacilitiesData();
    }, []);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Facilities
                </h1>
            </div>

            <div className="max-w-4xl mx-auto">
                {facilities.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No facilities found.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {facilities.map((facility, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                            >

                                <img
                                    src={
                                        facility.image
                                            ? `${facility.image}`
                                            : "https://dummyimage.com/150x150/cccccc/ffffff&text=No+Image"
                                    }
                                    alt={facility.title || "Facility Image"}
                                    className="w-24 h-24 rounded-lg object-cover"
                                />

                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold text-gray-800">{facility.title}</h2>
                                    <p className="text-gray-600 mt-2">{facility.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {loggedin?.role === "Manager" && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => navigate("/add-facility")}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add New Facility
                    </button>
                </div>
            )}
        </div>
    );
}

export default Facilities;