import {useParams, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {fetchTaskById, updateWorkById} from "../../Services/WorkService.js";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ViewTask() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        title: "",
        description: "",
        completionDate: "",
    });
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
        const getTask = async () => {
            try {
                const response = await fetchTaskById(id);
                setTask(response.tasks);
                setUpdatedTask({
                    title: response.tasks.title,
                    description: response.tasks.description,
                    completionDate: new Date(response.tasks.completionDate).toISOString().split("T")[0],
                });
            } catch (e) {
                console.log(e);
            }
        };
        getTask();
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdatedTask({...updatedTask, [name]: value});
    };

    const handleSave = async () => {
        try {
            await updateWorkById(id, updatedTask);
            setTask({...task, ...updatedTask});
            setEditMode(false);
            alert("Work updated successfully!");
        } catch (e) {
            console.log("Update failed:", e);
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute gap-2 sm:top-[7.5vw] top-[32vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <h1 className="flex justify-center text-white text-4xl font-bold mb-4 mt-20">Work Details</h1>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-4">
                <div>
                    <label className="text-gray-700 font-bold">Title:</label>
                    {editMode ? (
                        <input
                            type="text"
                            name="title"
                            value={updatedTask.title}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1 mt-1"
                        />
                    ) : (
                        <h2 className="text-2xl text-gray-800">{task.title}</h2>
                    )}
                </div>

                <div>
                    <label className="text-gray-700 font-bold">Description:</label>
                    {editMode ? (
                        <textarea
                            name="description"
                            value={updatedTask.description}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1 mt-1"
                        />
                    ) : (
                        <p className="text-sm text-gray-800">{task.description}</p>
                    )}
                </div>

                <div>
                    <label className="text-gray-700 font-bold">Completion Date:</label>
                    {editMode ? (
                        <input
                            type="date"
                            name="completionDate"
                            value={updatedTask.completionDate}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1 mt-1"
                        />
                    ) : (
                        <p className="text-sm text-gray-700">
                            {new Date(task.completionDate).toLocaleDateString()}
                        </p>
                    )}
                </div>

                <p className="text-sm text-gray-700">
                    <b>Assigned to:</b>
                    <div className={"flex gap-4 mt-3"}>
                        {task.groupName.length > 0 && (
                            <div>
                                <p className={"text-blue-700 font-bold"}>Group Name:</p>
                                <ul className="list-disc list-inside text-gray-600 mt-3">
                                    {task.groupName.map((group, index) => (<li key={index}>{group}</li>))}
                                </ul>
                            </div>
                        )}
                        {task.empoyeeName.length > 0 && (
                            <div>
                                <p className={"text-blue-700 font-bold"}>Employee:</p>
                                <ul className="list-disc list-inside text-gray-600 mt-3">
                                    {task.empoyeeName.map((employee, index) => (<li key={index}>{employee}</li>))}
                                </ul>
                            </div>
                        )}
                    </div>
                </p>

                <p className="text-sm text-gray-700">
                    <b>Creation Date:</b> {new Date(task.createdAt).toLocaleDateString()}
                </p>

                {task.createdAt !== task.updatedAt && (
                    <p className="text-sm text-gray-700">
                        <b>Updation Date:</b> {new Date(task.updatedAt).toLocaleDateString()}
                    </p>
                )}

                <p
                    className={`text-sm font-medium ${
                        task.workStatus === "complete" ? "text-green-600" : "text-red-600"
                    }`}
                >
                    <b>Status:</b> {task.workStatus}
                </p>
            </div>

            <div className="flex justify-center mt-8 gap-2">
                {loggedin?.role === "Manager" && (<>
                    {editMode ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="py-2 px-6 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 transition-transform duration-300 hover:scale-105"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="py-2 px-6 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-500 transition-transform duration-300 hover:scale-105"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="py-2 px-6 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 transition-transform duration-300 hover:scale-105"
                        >
                            Edit
                        </button>
                    )}
                </>)}

                <button
                    onClick={() => navigate(-1)}
                    className="py-2 px-6 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 transition-transform duration-300 hover:scale-105"
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default ViewTask;
