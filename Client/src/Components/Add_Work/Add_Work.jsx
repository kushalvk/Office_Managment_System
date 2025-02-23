import React, { useEffect, useState } from "react";
import { allStaff } from "../../Services/AuthService.js";
import { addWork, generateWorkDescription } from "../../Services/WorkService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function AddTask() {

    const groupOptions = ["Group A", "Group B", "Group C"];
    const [employeeOptions, setEmployeeOption] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        username: 'Select an employee', profilePhoto: 'https://www.pngmart.com/files/23/Profile-PNG-Photo.png'
    });
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "", description: "", completionDate: "", worktype: "task", groupName: [], empoyeeName: [],
    });

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staff = await allStaff();
                setEmployeeOption(staff.employees);
            } catch (e) {
                console.log(e);
            }
        };
        fetchStaff();
    }, []);

    const handleInputChange = ({ target: { name, value } }) => {
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const addGroup = () => {
        if (task.groupName.includes(selectedGroup)) {
            setError("This group has already been added.")
        } else if (selectedGroup === "") {
            setError("Please select an group to add.")
        } else if (selectedGroup && !task.groupName.includes(selectedGroup)) {
            setTask(prevTask => ({ ...prevTask, groupName: [...prevTask.groupName, selectedGroup] }));
            setSelectedGroup("");
            setError("")
        }
    };

    const addEmployee = () => {
        if (selectedOption.username === 'Select an employee') {
            setError('Please select an employee to add.');
            return;
        }

        const memberExists = members.some(member => member.username === selectedOption.username);
        if (memberExists) {
            setError('This member has already been added.');
            return;
        }

        setMembers((prevMembers) => [...prevMembers, {
            username: selectedOption.username, profilePhoto: selectedOption.profilePhoto,
        }]);
        setError('')
        setSelectedOption({
            username: 'Select an employee', profilePhoto: "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
        });
    };

    const removeItem = (itemType, item) => {
        setTask(prevTask => ({
            ...prevTask, [itemType]: prevTask[itemType].filter(i => i !== item),
        }));
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

        const usernames = members.map((member) => member.username);

        const finaltask = {
            ...task, empoyeeName: usernames,
        };

        if (validateForm()) {
            try {
                await addWork(finaltask);
                alert("Work Add Successfully");
                location.reload();
            } catch (error) {
                console.log(error);
                alert("Failed to Add Work. Please try again.");
            }
        }
    };

    const handleSelect = (option) => {
        setSelectedOption({
            ...option,
            profilePhoto: option.profilePhoto ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${option?.profilePhoto}` : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png",
        });
        setIsOpen(false);
    };

    const handleDeleteMember = (username) => {
        setMembers((prevMembers) => prevMembers.filter(member => member.username !== username));
    };

    // Ai
    const generateDescription = async () => {
        if (task.title.length < 3) {
            alert("Please enter at least 3 characters for the title.");
            return;
        }

        setLoading(true);
        try {
            const response = await generateWorkDescription(task.title);
            setTask(prevTask => ({ ...prevTask, description: response.trim() }));
        } catch (error) {
            console.error("Error fetching AI description:", error);
            alert("Error generating description. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (<div
        className="min-h-screen h-full p-6 bg-gradient-to-r from-blue-800 to-blue-400 flex justify-center items-center">
        <button
            className="absolute sm:top-[7.5vw] top-[30vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
            onClick={() => navigate(-1)}
        >
            <ArrowBackIcon /> <p> Back </p>
        </button>
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">Add Work</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-700">Work Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Work Title"
                    value={task.title}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${formErrors.title ? 'border-red-500' : ''}`}
                />

                {formErrors.title && <p className="text-red-500">{formErrors.title}</p>}

                <label className="block text-sm font-medium text-gray-700">Work Description</label>
                <div className="flex items-center space-x-2">
                    <textarea
                        name="description"
                        placeholder="Work Description"
                        value={task.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                    <button
                        type="button"
                        onClick={generateDescription}
                        className={`p-2 rounded-md text-white ${!task.title ? "bg-gray-400 cursor-not-allowed" : loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        disabled={!task.title || loading}
                    >
                        {loading ? "Generating..." : "Ai Generate"}
                    </button>
                </div>


                <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                <input
                    type="date"
                    name="completionDate"
                    value={task.completionDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full p-2 border rounded-md ${formErrors.completionDate ? 'border-red-500' : ''}`}
                />
                {formErrors.completionDate && <p className="text-red-500">{formErrors.completionDate}</p>}

                <label className="block text-sm font-medium text-gray-700">Work Type</label>
                <select name="worktype" value={task.worktype} onChange={handleInputChange}
                    className="w-full p-2 border rounded-md">
                    <option value="task">Task</option>
                    <option value="project">Project</option>
                </select>

                {task.worktype === "project" && (<>
                    <label className="block text-sm font-medium text-gray-700">Group Names</label>
                    <div className="flex space-x-2">
                        <select className="p-2 border rounded-md flex-grow" value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}>
                            <option value="">Select Group</option>
                            {groupOptions.map((group, index) => (
                                <option key={index} value={group}>{group}</option>))}
                        </select>
                        <button type="button" onClick={addGroup}
                            className="p-2 bg-green-500 text-white rounded-md w-[10vw]">+
                        </button>
                    </div>
                </>)}

                {/* Employee Selection */}
                <div className="relative mt-2">
                    <label className="block text-sm font-medium text-gray-900">Assigned to</label>
                    <div className="flex relative space-x-2">
                        <button
                            type="button"
                            className="w-full bg-white border rounded-md py-2 pl-3 pr-2 text-left text-gray-900 flex items-center justify-between"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="flex items-center">
                                <img src={selectedOption.profilePhoto} alt={selectedOption.username}
                                    className="w-5 h-5 rounded-full mr-2" />
                                <span>{selectedOption.username}</span>
                            </span>
                        </button>
                        {isOpen && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-56 overflow-auto">
                                {employeeOptions.map((option, index) => (<li
                                    key={index}
                                    className="flex items-center cursor-pointer py-2 px-3 hover:bg-gray-200"
                                    onClick={() => handleSelect(option)}
                                >
                                    <img
                                        src={option.profilePhoto ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${option.profilePhoto}` : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"}
                                        alt={option.username} className="w-5 h-5 rounded-full mr-2" />
                                    <span>{option.username}</span>
                                </li>))}
                            </ul>)}
                        <button type="button" onClick={addEmployee}
                            className="p-2 bg-green-500 text-white rounded-md w-[12vw]">+
                        </button>
                    </div>
                </div>
                {error && (<div className="col-span-2 mt-4 text-red-600">
                    {error}
                </div>)}

                {/* Group & Employee List */}
                <div className="mt-4">
                    {task.groupName.length > 0 && <h3 className="text-gray-700 font-semibold">Groups:</h3>}
                    {task.groupName.map((group, index) => (
                        <div key={index} className="flex justify-between p-2 bg-gray-200 rounded-md mt-1">
                            {group}
                            <button onClick={() => removeItem('groupName', group)} className="text-red-500">Remove
                            </button>
                        </div>))}

                    {members.length > 0 &&
                        <h3 className="text-gray-700 font-semibold mt-3">Assigned Employees:</h3>}
                    {members.map((employee, index) => (
                        <div key={index} className="flex justify-between p-2 bg-gray-200 rounded-md mt-1">
                            <span className="flex items-center">
                                <img src={employee.profilePhoto} alt={employee.username}
                                    className="w-5 h-5 rounded-full mr-2" />
                                {employee.username}
                            </span>
                            <button onClick={() => handleDeleteMember(employee.username)}
                                className="text-red-500">Remove
                            </button>
                        </div>))}
                </div>

                <button type="submit"
                    className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500">Add
                    Task
                </button>
            </form>
        </div>
    </div>);
}

export default AddTask;
