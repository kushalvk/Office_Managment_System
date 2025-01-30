import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        console.log("Updated User Data:", user);
    };

    return (
        <div className="relative isolate p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-center md:mt-14 text-white">{isEditing ? "Edit Profile" : "User Profile"}</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full space-y-6 mt-5">
                <div className="flex flex-col items-center">
                    <img
                        src={user.loginPhoto || "https://via.placeholder.com/150"}
                        alt="Login Photo"
                        className="w-24 h-24 rounded-full"
                    />
                </div>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {Object.keys(user).map((key) => (
                            key !== "id" && key !== "loginPhoto" && (
                                <div key={key} className="flex flex-col">
                                    <label className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
                                    {key === "role" ? (
                                        <select name={key} value={user[key]} onChange={handleInputChange} className="border rounded px-3 py-2 w-full">
                                            <option value="Admin">Admin</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Manager">Manager</option>
                                        </select>
                                    ) : (
                                        <input
                                            type={key === "dob" ? "date" : "text"}
                                            name={key}
                                            value={user[key]}
                                            onChange={handleInputChange}
                                            className="border rounded px-3 py-2 w-full"
                                        />
                                    )}
                                </div>
                            )
                        ))}
                        <div className="flex justify-center gap-4">
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">Save Changes</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        {Object.keys(user).map((key) => (
                            key !== "id" && key !== "loginPhoto" && (
                                <div key={key} className="flex justify-between">
                                    <span className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                    <span className="text-gray-600">{user[key]}</span>
                                </div>
                            )
                        ))}
                        <div className="flex justify-center">
                            <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Edit Profile</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
