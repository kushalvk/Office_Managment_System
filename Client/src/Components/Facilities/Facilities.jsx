import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchFacilities} from "../../Services/FacilitiesService.js";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Facilities() {
    const navigate = useNavigate();
    const [facilities, setFacilities] = useState([]);
    const [loggedin, setLoggedin] = useState(null);

    useEffect(() => {
        const logged = async () => {
            try {
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
                setLoggedin(null);
            }
        }
        logged();
    }, [])

    useEffect(() => {

        const faciilities = async () => {
            try {
                setFacilities(await fetchFacilities());
            } catch (e) {
                console.log(e);
                alert("Fail to load Facilities");
            }
        }
        faciilities();
    }, [])

    return (
        <div
            className="relative isolate h-full pt-12 p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute sm:top-[7.5vw] top-[30vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>

            {/* Header */}
            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-10">Facilities</h1>

            {/* Facilities List */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto space-y-6 mt-8">
                {facilities.map((facility, idx) => (
                    <div
                        key={idx}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-md"
                    >
                        <img
                            src={facility.image
                                ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/uplodes/${facility.image}`
                                : "https://dummyimage.com/150x150/cccccc/ffffff&text=No+Image"}
                            alt={facility.title || "Facility Image"}
                            className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold text-gray-800">{facility.title}</h2>
                            <p className="text-gray-600">{facility.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {loggedin?.role === "Manager" && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => navigate("/add-facility")}
                        className="py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                        Add New Facility
                    </button>
                </div>
            )}
        </div>
    );
}

export default Facilities;
