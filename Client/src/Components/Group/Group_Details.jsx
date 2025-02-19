import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {fetchGroupById, deleteGroup} from "../../Services/GroupService.js";
import {loggedUser} from "../../Services/AuthService.js";

function GroupDetails() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(false);
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
        const fetchGroup = async () => {
            try {
                const response = await fetchGroupById(id);
                setGroup(response.group);
            } catch (err) {
                console.log(err);
            }
        };
        fetchGroup();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this group?");
        if (!confirmDelete) return;

        setLoading(true);
        try {
            await deleteGroup(id);
            alert("Group deleted successfully!");
            navigate('/show-group'); // Redirect to groups list
        } catch (err) {
            console.error("Error deleting group:", err);
            alert("Failed to delete group. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!group) {
        return <div>Group not found!</div>;
    }

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                ></div>
            </div>

            {/* Header */}
            <div className="mx-auto max-w-2xl pt-48 text-center">
                <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4">Group Details</h1>
            </div>

            {/* Group Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl text-gray-800"><b>Group Name: </b>{group.groupName}</h2>
                <p className="text-gray-600 mt-2"><b>Description: </b>{group.description}</p>
                <p className="text-gray-600 mt-2"><b>Created By: </b>{group.createdBy}</p>
                <p className="text-gray-600 mt-2"><b>Created At: </b>{new Date(group.createdAt).toLocaleString()}</p>
                {group.createdAt !== group.updatedAt && (
                    <p className="text-gray-600 mt-2"><b>Updated At: </b>{new Date(group.updatedAt).toLocaleString()}
                    </p>
                )}
                <p className="text-gray-600 mt-2">
                    <b>Group Type: </b>
                    <span
                        className={`px-2 py-1 rounded-md text-white ${group.groupType === 'public' ? 'bg-red-500' : 'bg-green-500'}`}>
                        {group.groupType}
                    </span>
                </p>
                <p className="text-gray-600 mt-2">
                    <b>Group Status: </b>
                    <span
                        className={`px-2 py-1 rounded-md text-white ${group.groupStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {group.groupStatus}
                    </span>
                </p>

                {/* Members List */}
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-800">Members:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {group.members.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-8 space-x-4">
                <button
                    onClick={() => navigate('/show-group')}
                    className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md text-lg"
                >
                    Back to Groups
                </button>
                {loggedin?.role === "Manager" && (<>
                    <button
                        onClick={handleDelete}
                        className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md text-lg"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Group"}
                    </button>
                </>)}
            </div>
        </div>
    );
}

export default GroupDetails;
