import {useState} from "react";
import {useNavigate} from "react-router-dom";

function UserProfile() {
    const [user, setUser] = useState({
        id: 1,
        fullName: "John Doe",
        username: "johndoe123",
        dob: "1990-05-15",
        phoneNumber: "+1 234 567 890",
        address: "123 Main St, Springfield, IL",
        city: "Springfield",
        role: "Admin",
        document: "document1.pdf",
        loginPhoto: "https://via.placeholder.com/150",
    });

    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    // const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false); // Exit edit mode
        // Here you can add logic to save the updated user data (e.g., API call)
        console.log("Updated User Data:", user);
    };

    return (
        <div className="relative isolate p-16 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
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

            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-7">
                {isEditing ? "Edit Profile" : "User Profile"}
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto space-y-6">
                {/* Login Photo */}
                <div className="flex justify-center">
                    <img
                        src={user.loginPhoto || "https://via.placeholder.com/150"}
                        alt="Login Photo"
                        className="w-32 h-32 rounded-full"
                    />
                </div>

                {isEditing ? (
                    // Edit Mode: Form
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-lg text-gray-800">Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={user.fullName}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-64"
                            />
                        </div>

                        {/* Username */}
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-lg text-gray-800">Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-64"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-lg text-gray-800">Date of Birth:</label>
                            <input
                                type="date"
                                name="dob"
                                value={user.dob}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-64"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-lg text-gray-800">Phone Number:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={user.phoneNumber}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-64"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-lg text-gray-800">Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={user.address}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-64"
                            />
                        </div>

                        {/* City */}
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-lg text-gray-800">City:</label>
                            <input
                                type="text"
                                name="city"
                                value={user.city}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-64"
                            />
                        </div>

                        {/* Role */}
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-lg text-gray-800">Role:</label>
                            <select
                                name="role"
                                value={user.role}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded px-3 py-2 w-64"
                            >
                                <option value="" disabled>Select Role</option>
                                {/* Placeholder option */}
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>

                        {/* Document */}
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-lg text-gray-800">Document:</label>
                            <input
                                type="file"
                                name="document"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setUser({...user, document: file.name});
                                }}
                                className="border border-gray-300 rounded px-3 py-2 w-64"
                            />
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    // View Mode: Display User Data
                    <>
                        {/* Full Name */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-gray-800">Full Name:</span>
                            <span className="text-gray-600">{user.fullName}</span>
                        </div>

                        {/* Username */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-gray-800">Username:</span>
                            <span className="text-gray-600">{user.username}</span>
                        </div>

                        {/* Date of Birth */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-gray-800">Date of Birth:</span>
                            <span className="text-gray-600">{user.dob}</span>
                        </div>

                        {/* Phone Number */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-gray-800">Phone Number:</span>
                            <span className="text-gray-600">{user.phoneNumber}</span>
                        </div>

                        {/* Address */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-gray-800">Address:</span>
                            <span className="text-gray-600">{user.address}</span>
                        </div>

                        {/* City */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-gray-800">City:</span>
                            <span className="text-gray-600">{user.city}</span>
                        </div>

                        {/* Role */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-gray-800">Role:</span>
                            <span className="text-gray-600">{user.role}</span>
                        </div>

                        {/* Document */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-gray-800">Document:</span>
                            <a
                                href={user.document || "#"}
                                className="text-indigo-600 hover:text-indigo-800"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {user.document ? "View Document" : "No Document Uploaded"}
                            </a>
                        </div>

                        {/* Edit Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserProfile;