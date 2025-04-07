import React, {useEffect, useState} from "react";
import {allStaff} from "../../Services/AuthService.js";
import {addWork, generateWorkDescription} from "../../Services/WorkService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import {allGroups} from "../../Services/GroupService.js";

function AddTask() {
    const [groupOptions, setGroup] = useState([]);
    const [employeeOptions, setEmployeeOption] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        username: 'Select an employee',
        profilePhoto: 'https://www.pngmart.com/files/23/Profile-PNG-Photo.png'
    });

    const [task, setTask] = useState({
        title: "",
        description: "",
        completionDate: "",
        worktype: "task",
        groupName: [],
        empoyeeName: [],
    });

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staff = await allStaff();
                setEmployeeOption(staff.employees);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch staff.");
            }
        };
        const fetchGroup = async () => {
            try {
                const staff = await allGroups();
                const groupNames = staff.groups.map(group => group.groupName);
                setGroup(groupNames);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch staff.");
            }
        };
        fetchGroup();
        fetchStaff();
    }, []);

    const handleInputChange = ({target: {name, value}}) => {
        setTask(prevTask => ({...prevTask, [name]: value}));
        setFormErrors(prev => ({...prev, [name]: ''})); // Clear error on change
    };

    const addGroup = () => {
        if (!selectedGroup) {
            setError("Please select a group to add.");
            toast.error("Please select a group to add.");
            return;
        }
        if (task.groupName.includes(selectedGroup)) {
            setError("This group has already been added.");
            toast.error("This group has already been added.");
            return;
        }
        setTask(prevTask => ({...prevTask, groupName: [...prevTask.groupName, selectedGroup]}));
        setSelectedGroup("");
        setError("");
    };

    const addEmployee = () => {
        if (selectedOption.username === 'Select an employee') {
            setError('Please select an employee to add.');
            toast.error('Please select an employee to add.');
            return;
        }
        if (members.some(member => member.username === selectedOption.username)) {
            setError('This member has already been added.');
            toast.error('This member has already been added.');
            return;
        }
        setMembers(prev => [...prev, selectedOption]);
        setError('');
        setSelectedOption({
            username: 'Select an employee',
            profilePhoto: "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
        });
    };

    const removeItem = (itemType, item) => {
        setTask(prevTask => ({
            ...prevTask,
            [itemType]: prevTask[itemType].filter(i => i !== item),
        }));
    };

    const handleDeleteMember = (username) => {
        setMembers(prev => prev.filter(member => member.username !== username));
    };

    const validateForm = () => {
        const errors = {};
        if (!task.title) errors.title = "Title is required.";
        if (!task.completionDate) errors.completionDate = "Completion date is required.";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const usernames = members.map(member => member.username);
        const finalTask = {...task, empoyeeName: usernames};

        try {
            await addWork(finalTask);
            toast.success("Work Added Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to add work. Please try again.");
        }
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

    const generateDescription = async () => {
        if (task.title.length < 3) {
            toast.error("Please enter at least 3 characters for the title.");
            return;
        }
        setLoading(true);
        try {
            const response = await generateWorkDescription(task.title);
            setTask(prev => ({...prev, description: response.trim()}));
        } catch (error) {
            console.error("Error fetching AI description:", error);
            toast.error("Error generating description. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 pt-15">

            <Back_Button/>

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in">Add Work</h1>
                {error && <p className="text-red-600 font-semibold text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Work Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter work title"
                            value={task.title}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors.title ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Work Description</label>
                        <div className="flex gap-3">
                            <textarea
                                name="description"
                                placeholder="Enter work description"
                                value={task.description}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 resize-y h-24"
                            />
                            <button
                                type="button"
                                onClick={generateDescription}
                                className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${!task.title || loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                                disabled={!task.title || loading}
                            >
                                {loading ? "Generating..." : "AI Generate"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                        <input
                            type="date"
                            name="completionDate"
                            value={task.completionDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split("T")[0]}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors.completionDate ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.completionDate &&
                            <p className="text-red-500 text-sm mt-1">{formErrors.completionDate}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Work Type</label>
                        <select
                            name="worktype"
                            value={task.worktype}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                        >
                            <option value="task">Task</option>
                            <option value="project">Project</option>
                        </select>
                    </div>

                    {task.worktype === "project" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Group Names</label>
                            <div className="flex gap-3">
                                <select
                                    value={selectedGroup}
                                    onChange={(e) => setSelectedGroup(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                                >
                                    <option value="">Select Group</option>
                                    {groupOptions.map((group, index) => (
                                        <option key={index} value={group}>{group}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={addGroup}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Assigned to</label>
                        <div className="flex gap-3">
                            <div className="relative w-full">
                                <button
                                    type="button"
                                    className="w-full p-3 border rounded-lg text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-200"
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
                                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>
                                {isOpen && (
                                    <ul className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                                        {employeeOptions.map((option, index) => (
                                            option.role !== "Manager" && (
                                                <li
                                                    key={index}
                                                    className="flex items-center gap-2 p-3 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                                                    onClick={() => handleSelect(option)}
                                                >
                                                    <img
                                                        src={
                                                            option.profilePhoto
                                                                ? `${option.profilePhoto}`
                                                                : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                                        }
                                                        alt={option.username}
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                    {option.username} <span
                                                    className={"text-gray-400 text-sm"}>({option.department})</span>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={addEmployee}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {(task.groupName.length > 0 || members.length > 0) && (
                        <div className="space-y-4">
                            {task.groupName.length > 0 && (
                                <div>
                                    <h3 className="text-gray-700 font-semibold mb-2">Groups</h3>
                                    <div className="space-y-2">
                                        {task.groupName.map((group, index) => (
                                            <div key={index}
                                                 className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                                                <span>{group}</span>
                                                <button
                                                    onClick={() => removeItem('groupName', group)}
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {members.length > 0 && (
                                <div>
                                    <h3 className="text-gray-700 font-semibold mb-2">Assigned Employees</h3>
                                    <div className="space-y-2">
                                        {members.map((employee, index) => (
                                            <div key={index}
                                                 className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                                                <span className="flex items-center gap-2">
                                                    <img
                                                        src={employee.profilePhoto}
                                                        alt={employee.username}
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                    {employee.username}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteMember(employee.username)}
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        Add Work
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;