import {useParams, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {fetchTaskById} from "../../Services/WorkService.js";

function ViewTask() {
    const {id} = useParams(); // Get the task ID from the URL
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const task = async () => {
            try {
                const response = await fetchTaskById(id);
                setTask(response.tasks);
            } catch (e) {
                console.log(e)
            }
        }
        task();
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
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
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>

            <h1 className="text-white text-4xl font-bold mb-4 mt-20">Details</h1>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-4">
                <h2 className="text-2xl text-gray-800"><b>Title:</b> {task.title}</h2>
                <p className="text-sm text-gray-800"><b>Description:</b> {task.description}</p>
                <p className="text-sm text-gray-700">
                    <b>Assigned to:</b>
                    <ul className="list-disc list-inside text-gray-600 mt-3">
                        {task.empoyeeName.map((employee, index) => (<li key={index}>{employee}</li>))}
                    </ul>
                </p>
                <p className="text-sm text-gray-700"><b>Completion
                    Date:</b> {new Date(task.completionDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-700"><b>Creation
                    Date:</b> {new Date(task.createdAt).toLocaleDateString()}</p>
                {task.createdAt !== task.updatedAt && <p className="text-sm text-gray-700"><b>Updation
                    Date:</b> {new Date(task.updatedAt).toLocaleDateString()}</p>}
                <p
                    className={`text-sm font-medium ${
                        task.workStatus === "complete" ? "text-green-600" : "text-red-600"
                    }`}
                >
                    <b>Status:</b> {task.workStatus}
                </p>
            </div>

            <div className="flex justify-center mt-8 gap-2">
                <button
                    onClick={() => navigate("/show-all-tasks")}
                    className="py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                    Back to Tasks
                </button>
                <button
                    onClick={() => navigate("/Show-all-project")}
                    className="py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                    Back to Projects
                </button>
            </div>
        </div>
    );
}

export default ViewTask;