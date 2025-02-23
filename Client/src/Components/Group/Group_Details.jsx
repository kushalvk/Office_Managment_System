import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {fetchGroupById, deleteGroup, updateGroup} from "../../Services/GroupService.js";
import {loggedUser} from "../../Services/AuthService.js";

function GroupDetails() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loggedin, setLoggedin] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedGroup, setUpdatedGroup] = useState({groupName: "", description: "", groupType: "", groupStatus: ""});

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
                setUpdatedGroup({
                    groupName: response.group.groupName,
                    description: response.group.description,
                    groupType: response.group.groupType,
                    groupStatus: response.group.groupStatus
                });
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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedGroup({
            groupName: group.groupName,
            description: group.description,
            groupType: group.groupType,
            groupStatus: group.groupStatus
        });
    };

    const handleSave = async () => {
        try {
            await updateGroup(id, updatedGroup);
            setGroup(prev => ({...prev, ...updatedGroup}));
            setIsEditing(false);
            alert("Group updated successfully!");
        } catch (err) {
            console.error("Error updating group:", err);
            alert("Failed to update group. Please try again.");
        }
    };

    if (!group) {
        return <div>Group not found!</div>;
    }

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <div className="mx-auto max-w-2xl pt-[14vw] sm:pt-[6vw] text-center">
                <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4">Group Details</h1>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={updatedGroup.groupName}
                            onChange={(e) => setUpdatedGroup({...updatedGroup, groupName: e.target.value})}
                            className="w-full p-2 border rounded-md"
                        />
                        <textarea
                            value={updatedGroup.description}
                            onChange={(e) => setUpdatedGroup({...updatedGroup, description: e.target.value})}
                            className="w-full p-2 border rounded-md mt-2"
                        />
                        <select
                            value={updatedGroup.groupType}
                            onChange={(e) => setUpdatedGroup({...updatedGroup, groupType: e.target.value})}
                            className="w-full p-2 border rounded-md mt-2"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                        <select
                            value={updatedGroup.groupStatus}
                            onChange={(e) => setUpdatedGroup({...updatedGroup, groupStatus: e.target.value})}
                            className="w-full p-2 border rounded-md mt-2"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl text-gray-800"><b>Group Name: </b>{group.groupName}</h2>
                        <p className="text-gray-600 mt-2"><b>Description: </b>{group.description}</p>
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
                    </>
                )}
                <p className="text-gray-600 mt-2"><b>Created By: </b>{group.createdBy}</p>
                <p className="text-gray-600 mt-2"><b>Created At: </b>{new Date(group.createdAt).toLocaleString()}</p>
                {group.createdAt !== group.updatedAt && (
                    <p className="text-gray-600 mt-2"><b>Updated At: </b>{new Date(group.updatedAt).toLocaleString()}
                    </p>
                )}
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-800">Members:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {group.members.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
                {!isEditing && (
                    <button onClick={() => navigate('/show-group')}
                            className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md text-lg">
                        Back to Groups
                    </button>
                )}
                {loggedin?.role === "Manager" && (
                    <>
                        {!isEditing && (
                            <button onClick={handleDelete}
                                    className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md text-lg"
                                    disabled={loading}>
                                {loading ? "Deleting..." : "Delete Group"}
                            </button>
                        )}
                        {isEditing ? (
                            <>
                                <button onClick={handleSave}
                                        className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md text-lg">
                                    Save
                                </button>
                                <button onClick={handleCancel}
                                        className="px-6 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md text-lg">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={handleEdit}
                                    className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md text-lg">
                                Update
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default GroupDetails;