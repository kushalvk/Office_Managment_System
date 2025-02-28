import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    completeById,
    deleteWorkById,
    fetchallProjects,
    fetchemployeeProjects
} from "../../Services/WorkService.js";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function AllProjects() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [loggedin, setLoggedin] = useState(null);
    const username = localStorage.getItem("username");

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
        if (loggedin?.role === "Manager") {
            const allprojects = async () => {
                try {
                    const response = await fetchallProjects();
                    setProjects(response.projects);
                } catch (e) {
                    console.log(e);
                }
            }
            allprojects();
        } else {
            const empprojects = async () => {
                try {
                    const response = await fetchemployeeProjects(username);
                    setProjects(response.projects);
                } catch (e) {
                    console.log(e);
                }
            }
            empprojects();
        }
    }, [loggedin, username])

    const completeProject = async (id) => {
        try {
            await completeById(id);

            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project._id === id ? {...project, workStatus: "complete"} : project
                )
            );

            toast.success(`Selected Project marked as complete!`);
        } catch (e) {
            console.log(e);
            toast.error(`Fail complete Project!`);
        }
    };

    const viewProjectDetails = (id) => {
        navigate(`/view-details/${id}`);
    };

    const deleteProject = async (id) => {
        if (window.confirm(`Are you sure you want to delete this Project?`)) {
            try {
                await deleteWorkById(id);
                setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
                toast.success("Project Deleted successfully");
            } catch (e) {
                console.log(e);
                toast.error("Fail to Delete Project");
            }
        }
    };

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute sm:top-[7.5vw] top-[80px] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                 aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4 mt-20">All Projects</h1>
            {loggedin?.role === "Manager" && (<>
                <button
                    onClick={() => navigate("/add-work")}
                    className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                    Add Project
                </button>
            </>)}
            <div className="space-y-4 mt-6">
                {projects.map((project, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                    >
                        <div className="flex flex-col mb-2 sm:mb-0">
                            <h4 className="text-xl sm:text-2xl font-bold text-gray-800">{project.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">Completion
                                Date: {new Date(project.completionDate).toLocaleDateString()}</p>
                            <p
                                className={`text-sm font-medium mt-1 ${
                                    project.workStatus === "complete" ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                Status: {project.workStatus}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => viewProjectDetails(project._id)}
                                className="ml-0 sm:ml-4 mb-2 sm:mb-0 hover:text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                            >
                                View
                            </button>
                            {loggedin?.role === "Manager" && (<>
                                {project.workStatus !== "complete" && (
                                    <button
                                        onClick={() => completeProject(project._id)}
                                        className="ml-0 sm:ml-4 mb-2 sm:mb-0 hover:text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-blue-600 text-white font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                                    >
                                        Complete
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteProject(project._id)}
                                    className="ml-0 sm:ml-4 mb-2 sm:mb-0 hover:text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-red-600 text-white font-semibold hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700"
                                >
                                    Delete
                                </button>
                            </>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllProjects;
