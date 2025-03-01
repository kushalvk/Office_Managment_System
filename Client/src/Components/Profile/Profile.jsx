import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loggedUser, updateUserProfile } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function UserProfile() {
    const qualificationOptions = [
        { value: "", label: "Select Qualification" },
        { value: "High School", label: "High School" },
        { value: "Diploma", label: "Diploma" },
        { value: "Bachelor's Degree", label: "Bachelor's Degree" },
        { value: "Master's Degree", label: "Master's Degree" },
        { value: "PhD", label: "PhD" },
        { value: "Other", label: "Other" },
    ];

    const departmentOptions = [
        { value: "", label: "Select Department" },
        { value: "Human Resources", label: "Human Resources" },
        { value: "Finance", label: "Finance" },
        { value: "Information Technology", label: "Information Technology" },
        { value: "Marketing", label: "Marketing" },
        { value: "Sales", label: "Sales" },
        { value: "Operations", label: "Operations" },
        { value: "Customer Support", label: "Customer Support" },
        { value: "Research and Development", label: "Research and Development" },
        { value: "Legal", label: "Legal" },
        { value: "Administration", label: "Administration" },
    ];

    const workLocationOptions = [
        { value: "", label: "Select Work Location" },
        { value: "Office", label: "Office" },
        { value: "Remote", label: "Remote" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "On-Site", label: "On-Site" },
        { value: "Client Location", label: "Client Location" },
    ];

    const [loggedIn, setLoggedIn] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const user = await loggedUser();
                setLoggedIn(user);
            } catch (e) {
                console.log(e.message);
                toast.error("Failed to load user profile.");
            }
        };
        fetchLoggedInUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setLoggedIn(prevUser => ({
            ...prevUser,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in loggedIn) {
                if (loggedIn[key] !== null && loggedIn[key] !== undefined) {
                    formData.append(key, loggedIn[key]);
                }
            }
            const response = await updateUserProfile(loggedIn._id, formData);
            setLoggedIn(response);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
            navigate(0); // Refresh the page instead of `location.reload()` for React Router compatibility
        } catch (error) {
            console.error("Error updating profile:", error.message);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 pt-15">

            <button
                className="fixed top-27 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                <span className="text-sm font-medium">Back</span>
            </button>

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    {isEditing ? "Edit Profile" : "User Profile"}
                </h1>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                            <input
                                type="file"
                                name="profilePhoto"
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1 text-gray-700"
                                accept="image/*"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={loggedIn.fullName || ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={loggedIn.email || ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={loggedIn.address || ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={loggedIn.dob ? new Date(loggedIn.dob).toISOString().split("T")[0] : ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={loggedIn.gender || ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <input
                                type="text"
                                name="mobNo"
                                value={loggedIn.mobNo || ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Qualification</label>
                            <select
                                name="qualification"
                                value={loggedIn.qualification || ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            >
                                {qualificationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={loggedIn.username || ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <select
                                name="department"
                                value={loggedIn.department || ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            >
                                {departmentOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Work Location</label>
                            <select
                                name="workLocation"
                                value={loggedIn.workLocation || ""}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            >
                                {workLocationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Resume</label>
                            <input
                                type="file"
                                name="resume"
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1 text-gray-700"
                                accept=".pdf,.doc,.docx"
                            />
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <img
                                src={
                                    loggedIn.profilePhoto
                                        ? `${loggedIn.profilePhoto}`
                                        : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                }
                                alt="Profile Photo"
                                className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md transition-transform hover:scale-105 duration-300"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.keys(loggedIn).map((key) => (
                                key !== "_id" && key !== "password" && key !== "profilePhoto" && key !== "__v" && (
                                    <div key={key} className="flex justify-between">
                                        <span className="font-semibold text-gray-700 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                                        </span>
                                        {key === "resume" ? (
                                            <a
                                                href={`${loggedIn[key]}`}
                                                className="text-blue-600 hover:text-blue-800"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Resume
                                            </a>
                                        ) : (
                                            <span className="text-gray-600">
                                                {key === "createdAt" || key === "updatedAt"
                                                    ? new Date(loggedIn[key]).toLocaleDateString()
                                                    : loggedIn[key]}
                                            </span>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                            >
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