import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addRequrment} from "../../Services/RequrmentService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddRequirement() {

    const uname = localStorage.getItem("username");

    const [requirement, setRequirement] = useState({
        name: "",
        reason: "",
        username: uname,
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setRequirement((prevRequirement) => ({...prevRequirement, [name]: value}));
    };

    const handleSubmit = async () => {
        try {
            await addRequrment(requirement);
            alert("Requirement added successfully");
            navigate("/Show-requirment");
        } catch (e) {
            console.log(e);
            alert("Fail to add requirement");
        }
    };

    const navigate = useNavigate();

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute gap-2 top-[7.5vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                 aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>
            <h1 className="text-white text-4xl font-bold mb-4 mt-20">Add Requirement</h1>
            <form className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={requirement.name}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        placeholder="Enter requirement name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reason</label>
                    <textarea
                        name="reason"
                        value={requirement.reason}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        placeholder="Enter reason"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={requirement.username}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        placeholder="Enter username"
                        disabled
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500"
                >
                    Submit Requirement
                </button>
            </form>
        </div>
    );
}

export default AddRequirement;
