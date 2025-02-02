import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ShowTask() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Task 1",
            description: "Complete the report by EOD.",
            employeeName: "John Doe",
            completionDate: "11-11-2024",
            status: "Pending",
        },
        {
            id: 2,
            title: "Task 2",
            description: "Prepare presentation slides.",
            employeeName: "Jane Smith",
            completionDate: "12-11-2024",
            status: "Complete",
        },
        {
            id: 3,
            title: "Task 3",
            description: "Review project proposal.",
            employeeName: "Emily Johnson",
            completionDate: "13-11-2024",
            status: "Pending",
        },
    ]);

    const navigate = useNavigate();

    // Function to mark a task as complete
    const completeTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: "Complete" } : task
            )
        );
        alert(`Task ${id} marked as complete!`);
    };

    // Function to handle viewing task details
    const viewTaskDetails = (id) => {
        navigate(`/view-details/${id}`);
    };

    // Function to handle deleting a task
    const deleteTask = (id) => {
        if (window.confirm(`Are you sure you want to delete Task ${id}?`)) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        }
    };

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            {/* Background Blur Effect */}
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
            <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4 mt-20 text-center">
                All Tasks
            </h1>

            {/* Add Task Button */}
            <div className="flex justify-center my-6">
                <button
                    onClick={() => navigate("/add-work")}
                    className="py-2 px-4 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                    Add Task
                </button>
            </div>

            {/* Task List */}
            <div className="space-y-4 mt-6 max-w-xl mx-auto">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex flex-col sm:flex-row items-start justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                    >
                        {/* Task Details */}
                        <div className="flex-grow">
                            <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
                                {task.title}
                            </h4>
                            <p className="text-sm sm:text-base font-medium text-gray-800">
                                {task.description}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                                Assigned to: {task.employeeName}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                                Completion Date: {task.completionDate}
                            </p>
                            <p
                                className={`text-sm font-medium mt-1 ${
                                    task.status === "Complete"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                Status: {task.status}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex sm:flex-row gap-2 mt-4 sm:mt-0 sm:ml-4">
                            {/* Complete Button */}
                            {task.status !== "Complete" && (
                                <button
                                    onClick={() => completeTask(task.id)}
                                    className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-blue-600 text-white font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                >
                                    Complete
                                </button>
                            )}

                            {/* View Button */}
                            <button
                                onClick={() => viewTaskDetails(task.id)}
                                className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                            >
                                View
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale105 bg-red-600 text-white font-semibold hover:bg-red-500 focus:outline-none focus:ring2 focus:ring-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowTask;
