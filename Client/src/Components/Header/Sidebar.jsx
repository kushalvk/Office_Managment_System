import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Sidebar() {
    const navigate = useNavigate();
    const [loggedin, setLoggedin] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleProfile = () => {
        if (loggedin) {
            navigate("/profile");
        } else {
            alert("Your session is Expired. Log in First");
            navigate("/login");
        }
    };

    const HandleLogout = () => {
        localStorage.clear();
        navigate("/login");
        location.reload();
    };

    useEffect(() => {
        const logged = async () => {
            try {
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
            }
        };
        logged();

        if (loggedin.profilePhoto === "undefined") {
            localStorage.clear();
            navigate("/login");
        } else if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [loggedin.profilePhoto, navigate]);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className={`fixed top-3 z-50 p-3 rounded-r-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 ${
                    isSidebarOpen ? "left-56 md:left-64" : "left-0"
                } bg-blue-800 text-white hover:from-blue-500 hover:bg-blue-700 hover:shadow-lg`}
            >
                {isSidebarOpen ? <ArrowBackIcon className="w-6 h-6"/> : <ArrowForwardIcon className="w-6 h-6"/>}
            </button>

            <div
                className={`absolute md:fixed top-0 left-0 h-screen bg-blue-800 text-white p-6 shadow-lg z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
                    isSidebarOpen ? "translate-x-0 md:w-64 w-56" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center gap-3">
                    <button className="relative h-13 w-16 mt-3">
                        <img
                            className="h-full w-full rounded-full object-cover border-2 border-gray-200"
                            src={
                                loggedin.profilePhoto
                                    ? `${loggedin.profilePhoto}`
                                    : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                            }
                            alt="Profile"
                            onClick={handleProfile}
                        />
                    </button>
                    <h2 className="text-lg md:text-2xl font-bold">Manager Dashboard</h2>
                </div>
                <ul className="space-y-4 mt-6 text-sm md:text-base">
                    {[
                        {path: "/dashboard", label: "Dashboard"},
                        {path: "/all-staff", label: "My Staff"},
                        {path: "/add-work", label: "Add Work"},
                        {path: "/all-reports", label: "Reports"},
                        {path: "/show-all-tasks", label: "Task"},
                        {path: "/show-all-project", label: "Project"},
                        {path: "/show-group", label: "Group"},
                        {path: "/show-requirement", label: "Requirement"},
                        {path: "/salary", label: "Salary"}
                    ].map(({path, label}) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className="hover:bg-blue-700 p-2 rounded-md block"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-center mt-6">
                    <button
                        className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-60 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                        onClick={HandleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
