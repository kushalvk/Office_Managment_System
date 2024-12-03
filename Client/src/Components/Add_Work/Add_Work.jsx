import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        completionDate: "",
        type: "task", // Default to "task"
        groupName: "", // For project type only
        employeeName: "",
    });

    const options = [
        {
            name: "Wade Cooper",
            image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            name: "Tom Cook",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ];

    const [selectedEmployee, setSelectedEmployee] = useState(options[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
        setTask((prevTask) => ({ ...prevTask, employeeName: employee.name }));
        setIsDropdownOpen(false);
    };

    const handleSubmit = () => {
        console.log("Task added:", task);
        navigate("/show-task");
    };

    return (
        <div className="relative isolate p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-600 min-h-screen">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>
            <h1 className="text-white text-4xl font-bold mb-4 mt-20">Add Work</h1>
            <form className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        placeholder="Enter task title"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        placeholder="Enter task description"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                    <input
                        type="date"
                        name="completionDate"
                        value={task.completionDate}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        name="type"
                        value={task.type}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                    >
                        <option value="task">Task</option>
                        <option value="project">Project</option>
                    </select>
                </div>

                {task.type === "project" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Group Name</label>
                            <select
                                name="groupName"
                                value={task.groupName}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border rounded-md"
                            >
                                <option value="">Select Group</option>
                                <option value="Group A">Group A</option>
                                <option value="Group B">Group B</option>
                                <option value="Group C">Group C</option>
                                {/* Add other group options as needed */}
                            </select>
                        </div>
                    </>
                )}


                <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned to</label>
                    <div className="relative">
                        <button
                            type="button"
                            className="w-full bg-white border rounded-md py-2 pl-3 pr-2 text-left flex items-center justify-between"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span className="flex items-center">
                                <img
                                    src={selectedEmployee.image}
                                    alt={selectedEmployee.name}
                                    className="w-5 h-5 rounded-full mr-2"
                                />
                                {selectedEmployee.name}
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
                        {isDropdownOpen && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-56 overflow-auto">
                                {options.map((option, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center cursor-pointer py-2 px-3 hover:bg-gray-200"
                                        onClick={() => handleEmployeeSelect(option)}
                                    >
                                        <img
                                            src={option.image}
                                            alt={option.name}
                                            className="w-5 h-5 rounded-full mr-2"
                                        />
                                        {option.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default AddTask;
