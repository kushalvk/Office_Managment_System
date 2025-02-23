import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {allGroups} from "../../Services/GroupService.js";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ShowAllGroups() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loggedin, setLoggedin] = useState(null);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const user = await loggedUser();
                setLoggedin(user);
            } catch (e) {
                console.log(e.message);
                setLoggedin(null);
            }
        };
        fetchLoggedInUser();
    }, []);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await allGroups();
                let filteredGroups = response.groups;

                if (loggedin?.role === "Manager") {
                    setGroups(response.groups);
                } else if (!loggedin) {
                    filteredGroups = filteredGroups.filter(group => group.groupType === "public");
                } else {
                    filteredGroups = filteredGroups.filter(
                        group => group.groupType === "public" || group.members.includes(loggedin.username)
                    );
                }

                setGroups(filteredGroups);
            } catch (e) {
                console.log(e);
            }
        };

        fetchGroups();
    }, [loggedin]);

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
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
            <div className="mx-auto max-w-2xl pt-[14vw] sm:pt-[6vw] pb-2 text-center">
                <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4">Show All Groups</h1>
                <p className="text-gray-300 text-lg">Here is the list of all groups.</p>
            </div>

            {loggedin?.role === "Manager" && (
                <div className="flex justify-center my-6">
                    <button
                        onClick={() => navigate("/add-group")}
                        className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md text-lg"
                    >
                        Add New Group
                    </button>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                {groups.length === 0 ? (
                    <p className="text-center">No Groups Available.</p>
                ) : (
                    groups.map((group, idx) => (
                        <div key={idx} className="p-4 mb-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-700">{group.groupName}</h2>
                            <p className="text-gray-600">{group.description}</p>
                            <button
                                onClick={() => navigate(`/group-details/${group._id}`)}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Details
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ShowAllGroups;
