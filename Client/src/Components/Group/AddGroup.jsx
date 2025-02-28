import React, { useEffect, useState } from 'react';
import GroupIcon from '../../../../Storage/Group_Icon.jpg';
import { allStaff } from "../../Services/AuthService.js";
import { addGroup } from "../../Services/GroupService.js";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function Add_Group() {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    // Form data state
    const [formData, setFormData] = useState({
        groupName: '',
        description: '',
        members: '',
        createdBy: username,
        creationDate: '',
        groupType: '',
        groupStatus: '',
    });

    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        username: 'Select an employee',
        profilePhoto: 'https://www.pngmart.com/files/23/Profile-PNG-Photo.png'
    });

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staff = await allStaff();
                setOptions(staff.employees);
            } catch (e) {
                console.log(e);
                toast.error(e.message);
            }
        };
        fetchStaff();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelect = (option) => {
        setSelectedOption({
            ...option,
            profilePhoto: option.profilePhoto
                ? `${option.profilePhoto}`
                : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png",
        });
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usernames = members.map((member) => member.username);
        const updatedFormData = { ...formData, members: usernames };

        try {
            const response = await addGroup(updatedFormData);
            toast.success(response.message);
            navigate("/show-group");
        } catch (error) {
            console.error("Error adding group:", error.message);
            toast.error("Failed to add group. Please try again.");
        }
    };

    const handleAddMember = () => {
        if (selectedOption.username === 'Select an employee') {
            setError('Please select an employee to add.');
            return;
        }
        if (members.some(member => member.username === selectedOption.username)) {
            setError('This member has already been added.');
            return;
        }
        setMembers((prev) => [...prev, selectedOption]);
        setError('');
        setSelectedOption({
            username: 'Select an employee',
            profilePhoto: "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
        });
    };

    const handleDeleteMember = (username) => {
        setMembers((prev) => prev.filter(member => member.username !== username));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 pt-15">
            {/* Back Button */}
            <button
                className="fixed top-4 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                <span className="text-sm font-medium">Back</span>
            </button>

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Add New Group</h1>
                <p className="text-lg text-gray-200 mt-2">Fill out the details below to create a group.</p>
            </div>

            {/* Group Icon */}
            <div className="flex justify-center mb-8">
                <img
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover transition-transform hover:scale-105"
                    src={GroupIcon}
                    alt="Group Icon"
                />
            </div>

            {/* Form Section */}
            <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Group Name</label>
                        <input
                            type="text"
                            name="groupName"
                            value={formData.groupName}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-24"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Add Members</label>
                        <div className="relative mt-1">
                            <button
                                type="button"
                                className="w-full p-3 bg-white border rounded-lg text-left flex items-center justify-between hover:bg-gray-50"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="flex items-center gap-2">
                                    <img
                                        src={selectedOption.profilePhoto}
                                        alt={selectedOption.username}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    {selectedOption.username}
                                </span>
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isOpen && (
                                <ul className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                                    {options.map((option, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 p-3 hover:bg-blue-50 cursor-pointer"
                                            onClick={() => handleSelect(option)}
                                        >
                                            <img
                                                src={option.profilePhoto ? `${option.profilePhoto}` : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"}
                                                alt={option.username}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            {option.username}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleAddMember}
                            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                        >
                            Add Member
                        </button>
                        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Created By</label>
                        <p className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-800">{username}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Creation Date</label>
                        <input
                            type="date"
                            name="creationDate"
                            min={new Date().toISOString().split("T")[0]}
                            value={formData.creationDate}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Group Type</label>
                        <select
                            name="groupType"
                            value={formData.groupType}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="">Select Group Type</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="groupStatus"
                            value={formData.groupStatus}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Add Group
                        </button>
                    </div>
                </form>
            </section>

            {/* Members Table */}
            {members.length > 0 && (
                <section className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Added Members</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left text-sm font-medium text-gray-700">Name</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-700">Image</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-700">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {members.map((member, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 border-t">{member.username}</td>
                                    <td className="p-3 border-t">
                                        <img
                                            src={member.profilePhoto}
                                            alt={member.username}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="p-3 border-t">
                                        <button
                                            onClick={() => handleDeleteMember(member.username)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Add_Group;