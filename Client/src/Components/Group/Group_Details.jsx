import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGroupById, deleteGroup, updateGroup } from "../../Services/GroupService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert"; // Import if separate file

function GroupDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedGroup, setUpdatedGroup] = useState({ groupName: "", description: "", groupType: "", groupStatus: "" });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [closingDelete, setClosingDelete] = useState(false);

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
                toast.error(err.message);
            }
        };
        fetchGroup();
    }, [id]);

    const handleDeleteClick = () => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
        setClosingDelete(false);
    };

    const handleDeleteConfirm = async () => {
        setLoading(true);
        try {
            await deleteGroup(deleteId);
            toast.success("Group deleted successfully!");
            navigate('/show-group');
        } catch (err) {
            console.error("Error deleting group:", err);
            toast.error("Failed to delete group. Please try again.");
        } finally {
            setLoading(false);
            setShowDeleteConfirm(false);
            setClosingDelete(false);
            setDeleteId(null);
        }
    };

    const handleEdit = () => setIsEditing(true);

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
            setGroup(prev => ({ ...prev, ...updatedGroup }));
            setIsEditing(false);
            toast.success("Group updated successfully!");
        } catch (err) {
            console.error("Error updating group:", err);
            toast.error("Failed to update group. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedGroup(prev => ({ ...prev, [name]: value }));
    };

    if (!group) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 flex justify-center items-center">
                <p className="text-white text-lg font-semibold">Group not found!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Group Details
                </h1>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
                {isEditing ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Group Name</label>
                            <input
                                type="text"
                                name="groupName"
                                value={updatedGroup.groupName}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={updatedGroup.description}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 h-24 resize-y"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Group Type</label>
                            <select
                                name="groupType"
                                value={updatedGroup.groupType}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Group Status</label>
                            <select
                                name="groupStatus"
                                value={updatedGroup.groupStatus}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                <span className="font-bold">Group Name:</span> {group.groupName}
                            </h2>
                        </div>
                        <p className="text-gray-600">
                            <span className="font-bold">Description:</span> {group.description}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">Group Type:</span>{' '}
                            <span
                                className={`px-2 py-1 rounded-md text-white ${group.groupType === 'public' ? 'bg-blue-500' : 'bg-green-500'}`}
                            >
                                {group.groupType}
                            </span>
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">Group Status:</span>{' '}
                            <span
                                className={`px-2 py-1 rounded-md text-white ${group.groupStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
                            >
                                {group.groupStatus}
                            </span>
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">Created By:</span> {group.createdBy}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">Created At:</span> {new Date(group.createdAt).toLocaleString()}
                        </p>
                        {group.createdAt !== group.updatedAt && (
                            <p className="text-gray-600">
                                <span className="font-bold">Updated At:</span> {new Date(group.updatedAt).toLocaleString()}
                            </p>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mt-4">Members:</h3>
                            <ul className="mt-2 space-y-1 text-gray-600">
                                {group.members.map((member, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        {member}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 mt-8">
                {!isEditing && (
                    <button
                        onClick={() => navigate('/show-group')}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 w-full sm:w-auto"
                    >
                        Back to Groups
                    </button>
                )}
                {loggedIn?.role === "Manager" && (
                    <>
                        {!isEditing ? (
                            <>
                                <button
                                    onClick={handleDeleteClick}
                                    className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 w-full sm:w-auto"
                                    disabled={loading}
                                >
                                    {loading ? "Deleting..." : "Delete Group"}
                                </button>
                                <button
                                    onClick={handleEdit}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 w-full sm:w-auto"
                                >
                                    Update Group
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 w-full sm:w-auto"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>

            <DeleteConfirmationAlert
                showConfirm={showDeleteConfirm}
                setShowConfirm={setShowDeleteConfirm}
                deleteId={deleteId}
                setDeleteId={setDeleteId}
                closing={closingDelete}
                setClosing={setClosingDelete}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}

export default GroupDetails;