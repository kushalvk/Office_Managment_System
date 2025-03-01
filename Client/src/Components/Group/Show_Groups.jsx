import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allGroups } from "../../Services/GroupService.js";
import { loggedUser } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function ShowAllGroups() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const user = await loggedUser();
                setLoggedIn(user);
            } catch (e) {
                console.log(e.message);
                setLoggedIn(null);
            }
        };
        fetchLoggedInUser();
    }, []);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await allGroups();
                let filteredGroups = response.groups;

                if (loggedIn?.role === "Manager") {
                    setGroups(filteredGroups);
                } else if (!loggedIn) {
                    filteredGroups = filteredGroups.filter(group => group.groupType === "public");
                } else {
                    filteredGroups = filteredGroups.filter(
                        group => group.groupType === "public" || group.members.includes(loggedIn.username)
                    );
                }

                setGroups(filteredGroups);
            } catch (e) {
                console.log(e);
                toast.error(e.message);
            }
        };

        if (loggedIn !== null) fetchGroups(); // Wait for loggedIn to be set
    }, [loggedIn]);

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
                    All Groups
                </h1>
                <p className="mt-4 text-lg text-gray-200">
                    Browse the list of available groups below.
                </p>
            </div>

            {loggedIn?.role === "Manager" && (
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => navigate("/add-group")}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add New Group
                    </button>
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6">
                {groups.length === 0 ? (
                    <p className="text-center text-gray-600 font-semibold py-4">No Groups Available</p>
                ) : (
                    <div className="space-y-4">
                        {groups.map((group, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 flex justify-between items-center"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{group.groupName}</h2>
                                    <p className="text-gray-600 text-sm mt-1">{group.description}</p>
                                </div>
                                <button
                                    onClick={() => navigate(`/group-details/${group._id}`)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
                                >
                                    Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowAllGroups;