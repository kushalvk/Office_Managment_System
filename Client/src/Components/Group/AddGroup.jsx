

import React, { useState } from 'react';
import GroupIcon from '../../../../Storage/groups.png';

function Add_Group() {
    // Form data state
    const [formData, setFormData] = useState({
        groupName: '',
        description: '',
        members: '',
        createdBy: '',
        creationDate: '',
        groupType: '',
        status: '',
    });

    // Members state
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');

    // Dropdown state
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        name: 'Select an employee',
        image: '#'
    });

    const options = [
        {
            name: 'Wade Cooper',
            image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            name: 'Tom Cook',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
    ];

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle dropdown selection
    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    // Add member to table with validation
    const handleAddMember = () => {
        if (selectedOption.name === 'Select an employee') {
            setError('Please select an employee to add.');
            return;
        }

        // Check if the selected member already exists in the list
        const memberExists = members.some(member => member.name === selectedOption.name);
        if (memberExists) {
            setError('This member has already been added.');
            return;
        }

        // Add member if not already present
        setMembers((prevMembers) => [
            ...prevMembers,
            {
                name: selectedOption.name,
                image: selectedOption.image,
            }
        ]);
        setError('');
        setSelectedOption({ name: 'Select an employee', image: '#' });
    };

    // Handle member deletion
    const handleDeleteMember = (name) => {
        setMembers((prevMembers) => prevMembers.filter(member => member.name !== name));
    };

    return (
        <div className="relative isolate p-6 lg:px-8 bg-gradient-to-r from-green-800 to-green-600">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ff80] to-[#00ff00] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                ></div>
            </div>

            {/* Header Section */}
            <div className="mx-auto max-w-2xl sm:py-48 text-center">
                <h1 className="text-white text-5xl font-bold mb-4">Add New Group</h1>
                <p className="text-gray-300 text-lg">Please fill out the form below to add a new group.</p>
            </div>

            {/* Centered Image Section */}
            <div className="flex justify-center mb-6">
                <img
                    className="object-cover object-center rounded-full h-32 w-32 md:h-48 md:w-48 border-4 border-white shadow-lg"
                    alt="Group Icon"
                    src={GroupIcon}
                />
            </div>

            {/* Form Section */}
            <section className="bg-gray-100 shadow-lg rounded-lg p-8 mx-4 md:mx-8 mb-8">
                <form className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8" onSubmit={handleSubmit}>
                    {/* Form Fields */}
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="groupName">Group Name</label>
                        <input
                            type="text"
                            id="groupName"
                            name="groupName"
                            value={formData.groupName}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        ></textarea>
                    </div>
                    <div className="relative mt-2">
                        <label className="block text-sm font-medium text-gray-900">Assigned to</label>
                        <div className="relative">
                            <button
                                type="button"
                                className="w-full bg-white border rounded-md py-2 pl-3 pr-2 text-left text-gray-900 flex items-center justify-between"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="flex items-center">
                                    <img
                                        src={selectedOption.image}
                                        alt={selectedOption.name}
                                        className="w-5 h-5 rounded-full mr-2"
                                    />
                                    <span>{selectedOption.name}</span>
                                </span>
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {isOpen && (
                                <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-56 overflow-auto">
                                    {options.map((option, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center cursor-pointer py-2 px-3 hover:bg-gray-200"
                                            onClick={() => handleSelect(option)}
                                        >
                                            <img
                                                src={option.image}
                                                alt={option.name}
                                                className="w-5 h-5 rounded-full mr-2"
                                            />
                                            <span>{option.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    {/* Error message */}
                    {error && (
                        <div className="col-span-2 mt-4 text-red-600">
                            {error}
                        </div>
                    )}
                    {/* Add Member Button */}
                    <div className="col-span-2">
                        <button
                            type="button"
                            onClick={handleAddMember}
                            className="w-[12vw] py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                        >
                            Add Member
                        </button>
                    </div>
                    {/* Other form fields */}
                    {/* Rest of form fields */}
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="createdBy">Created By</label>
                        <input
                            type="text"
                            id="createdBy"
                            name="createdBy"
                            value={formData.createdBy}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="creationDate">Creation Date</label>
                        <input
                            type="date"
                            id="creationDate"
                            name="creationDate"
                            value={formData.creationDate}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="groupType">Group Type</label>
                        <select
                            id="groupType"
                            name="groupType"
                            value={formData.groupType}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        >
                            <option value="">Select Group Type</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                        >
                            Add Group
                        </button>
                    </div>
                </form>
            </section>

            {/* Members Table */}
            {members.length > 0 && (
                <div className="mt-6 bg-white shadow-md rounded-lg p-[2vw] m-[2vw]">
                    <h2 className="text-center text-2xl font-semibold mb-4">Added Members</h2>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{member.name}</td>
                                    <td className="border p-2 flex justify-center">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() => handleDeleteMember(member.name)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Add_Group;
