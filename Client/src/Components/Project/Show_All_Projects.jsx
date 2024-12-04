import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AllProjects() {
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Project 1",
            description: "Description of Project 1",
            completionDate: "12-15-2024",
            assignedTo: "Wade Cooper",
            status: "Pending",
        },
        {
            id: 2,
            title: "Project 2",
            description: "Description of Project 2",
            completionDate: "01-10-2025",
            assignedTo: "Tom Cook",
            status: "Complete",
        },
    ]);
    const navigate = useNavigate();

    return (
        <div className="relative isolate p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>
            <h1 className="text-white text-4xl font-bold mb-4 mt-20">All Projects</h1>
            <button
                onClick={() => navigate("/add-work")}
                className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
                Add Project
            </button>
            <div className="space-y-4 mt-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex flex-col">
                            <h4 className="text-2xl font-bold text-gray-800">{project.title}</h4>
                            <p className="text-sm font-medium text-gray-800">{project.description}</p>
                            <p className="text-xs text-gray-500 mt-1">Completion Date: {project.completionDate}</p>
                            <p className="text-xs text-gray-500 mt-1">Assigned to: {project.assignedTo}</p>
                            <p
                                className={`text-sm font-medium mt-1 ${
                                    project.status === "Complete" ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                Status: {project.status}
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/view-project/" + project.id)}
                            className="ml-4 hover:text-white  py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllProjects;
