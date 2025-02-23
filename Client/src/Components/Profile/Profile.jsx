import React, {useEffect, useState} from "react";
import {loggedUser, updateUserProfile} from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

function UserProfile() {

    const qualificationOptions = [
        {value: "", label: "Select Qualification"},
        {value: "High School", label: "High School"},
        {value: "Diploma", label: "Diploma"},
        {value: "Bachelor's Degree", label: "Bachelor's Degree"},
        {value: "Master's Degree", label: "Master's Degree"},
        {value: "PhD", label: "PhD"},
        {value: "Other", label: "Other"},
    ];

    const departmentOptions = [
        {value: "", label: "Select Department"},
        {value: "Human Resources", label: "Human Resources"},
        {value: "Finance", label: "Finance"},
        {value: "Information Technology", label: "Information Technology"},
        {value: "Marketing", label: "Marketing"},
        {value: "Sales", label: "Sales"},
        {value: "Operations", label: "Operations"},
        {value: "Customer Support", label: "Customer Support"},
        {value: "Research and Development", label: "Research and Development"},
        {value: "Legal", label: "Legal"},
        {value: "Administration", label: "Administration"},
    ];

    const workLocationOptions = [
        {value: "", label: "Select Work Location"},
        {value: "Office", label: "Office"},
        {value: "Remote", label: "Remote"},
        {value: "Hybrid", label: "Hybrid"},
        {value: "On-Site", label: "On-Site"},
        {value: "Client Location", label: "Client Location"},
    ];

    const [loggedin, setLoggedin] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value, files} = e.target;

        if (files) {
            setLoggedin((prevUser) => ({
                ...prevUser,
                [name]: files[0],
            }));
        } else {
            setLoggedin((prevUser) => ({
                ...prevUser,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            for (const key in loggedin) {
                if (loggedin[key] !== null && loggedin[key] !== undefined) {
                    formData.append(key, loggedin[key]);
                }
            }

            const response = await updateUserProfile(loggedin._id, formData);

            setLoggedin(response);
            setIsEditing(false);
            alert("Profile updated successfully!");
            location.reload();
        } catch (error) {
            console.error("Error updating profile:", error.message);
            alert("Failed to update profile. Please try again.");
        }
    };

    useEffect(() => {
        const logged = async () => {
            try {
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
            }
        }
        logged();
    }, [])

    return (
        <div
            className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen flex flex-col items-center justify-center">
            <button
                className="absolute gap-2 top-[7.5vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <h1 className="text-2xl font-bold text-center md:mt-14 text-white">{isEditing ? "Edit Profile" : "User Profile"}</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full space-y-6 mt-5">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Profile Photo Upload */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 capitalize">Profile Photo:</label>
                            <input
                                type="file"
                                name="profilePhoto"
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                                accept="image/*"
                            />
                        </div>

                        {/* Qualification Dropdown */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 capitalize">Qualification:</label>
                            <select
                                name="qualification"
                                value={loggedin.qualification || ""}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                            >
                                {qualificationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Department Dropdown */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 capitalize">Department:</label>
                            <select
                                name="department"
                                value={loggedin.department || ""}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                            >
                                {departmentOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Work Location Dropdown */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 capitalize">Work Location:</label>
                            <select
                                name="workLocation"
                                value={loggedin.workLocation || ""}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                            >
                                {workLocationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Other Fields */}
                        {Object.keys(loggedin).map((key) => (
                            key !== "_id" && key !== "password" && key !== "profilePhoto" && key !== "__v" &&
                            key !== "qualification" && key !== "department" && key !== "workLocation" && key !== "updatedAt" && key !== "createdAt" && (
                                <div key={key} className="flex flex-col">
                                    <label className="font-semibold text-gray-700 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                                    </label>
                                    {key === "role" ? (
                                        <select
                                            name={key}
                                            value={loggedin[key]}
                                            onChange={handleInputChange}
                                            className="border rounded px-3 py-2 w-full"
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Manager">Manager</option>
                                        </select>
                                    ) : key === "resume" ? (
                                        <input
                                            type="file"
                                            name={key}
                                            onChange={handleInputChange}
                                            className="border rounded px-3 py-2 w-full"
                                            accept=".pdf,.doc,.docx"
                                        />
                                    ) : (
                                        <input
                                            type={key === "dob" ? "date" : "text"}
                                            name={key}
                                            value={loggedin[key]}
                                            onChange={handleInputChange}
                                            className="border rounded px-3 py-2 w-full"
                                        />
                                    )}
                                </div>
                            )
                        ))}

                        {/* Save and Cancel Buttons */}
                        <div className="flex justify-center gap-4">
                            <button type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
                                Save Changes
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        {/* Display Profile Photo */}
                        <div className="flex flex-col items-center">
                            <img
                                src={
                                    loggedin.profilePhoto
                                        ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${loggedin.profilePhoto}`
                                        : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                }
                                alt="Profile Photo"
                                className="w-24 h-24 rounded-full"
                            />
                        </div>

                        {/* Display Other Fields */}
                        {Object.keys(loggedin).map((key) => (
                            key !== "_id" && key !== "password" && key !== "profilePhoto" && key !== "updatedAt" && key !== "createdAt" && key !== "__v" && (
                                <div key={key} className="flex justify-between">
                    <span className="font-semibold text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                                    {key === "resume" ? (
                                        <a href={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${loggedin[key]}`}
                                           className="text-blue-600" target="_blank">
                                            Click to show resume
                                        </a>
                                    ) : (
                                        <span className="text-gray-600">{loggedin[key]}</span>
                                    )}
                                </div>
                            )
                        ))}
                        {loggedin.createdAt && (
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Account Created:</span>
                                <span
                                    className="text-gray-600">{new Date(loggedin.createdAt).toLocaleDateString()}</span>
                            </div>
                        )}
                        {loggedin.updatedAt && (
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Last Updated:</span>
                                <span
                                    className="text-gray-600">{new Date(loggedin.updatedAt).toLocaleDateString()}</span>
                            </div>
                        )}

                        {/* Edit Profile Button */}
                        <div className="flex justify-center">
                            <button onClick={() => setIsEditing(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
