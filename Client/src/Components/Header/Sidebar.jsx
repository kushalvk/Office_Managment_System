import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Sidebar() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    const handleProfile = () => {
        if (loggedIn) {
            navigate("/profile");
            setIsSidebarOpen(false);
        } else {
            alert("Your session has expired. Please log in first.");
            navigate("/login");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    };

    useEffect(() => {
        const fetchLoggedUser = async () => {
            try {
                const user = await loggedUser();
                setLoggedIn(user);
                if (!user || !localStorage.getItem("token")) {
                    navigate("/login");
                }
            } catch (e) {
                console.log(e.message);
                navigate("/login");
            }
        };
        fetchLoggedUser();
    }, [navigate]);

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className={`fixed border-2 top-4 z-50 p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 bg-blue-600 text-white ${
                    isSidebarOpen
                        ? "left-[calc(100vw-4rem)] sm:left-56 md:left-64"
                        : "left-2"
                }`}
            >
                {isSidebarOpen ? (
                    <ArrowBackIcon sx={{fontSize: {xs: 16, sm: 20}}}/>
                ) : (
                    <ArrowForwardIcon sx={{fontSize: {xs: 16, sm: 20}}}/>
                )}
            </button>

            <div
                className={`fixed top-0 left-0 h-screen w-full sm:w-56 md:w-64 bg-gradient-to-b from-blue-600 to-indigo-500 text-white p-4 sm:p-6 shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen
                        ? "translate-x-0 border-r-[5px] border-r-white border-y-0 border-l-0"
                        : "-translate-x-full"
                }`}
            >
                <div
                    className="h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">

                    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-shrink-0">
                        <button onClick={handleProfile} className="relative h-10 w-10 sm:h-12 sm:w-12">
                            <img
                                className="h-full w-full rounded-full object-cover border-2 border-white shadow-sm hover:border-blue-300 transition-all"
                                src={
                                    loggedIn?.profilePhoto
                                        ? `${loggedIn.profilePhoto}`
                                        : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                }
                                alt="Profile"
                            />
                        </button>
                        <div>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Manager Dashboard</h2>
                            <p className="text-[10px] sm:text-xs text-gray-200 truncate max-w-[150px] sm:max-w-[180px]">
                                {loggedIn?.fullName || "Guest"}
                            </p>
                        </div>
                    </div>

                    <ul className="space-y-2 sm:space-y-3 text-lg sm:text-sm md:text-base flex-grow">
                        {[
                            {path: "/dashboard", label: "Dashboard"},
                            {path: "/all-staff", label: "My Staff"},
                            {path: "/add-work", label: "Add Work"},
                            {path: "/all-reports", label: "Reports"},
                            {path: "/show-all-tasks", label: "Task"},
                            {path: "/show-all-project", label: "Project"},
                            {path: "/show-group", label: "Group"},
                            {path: "/show-requirement", label: "Requirement"},
                            {path: "/salary", label: "Salary"},
                            {path: "/a-attendance", label: "Emp. Attendance"},
                            {path: "/daily-attendance", label: "Daily Attendance"},
                        ].map(({path, label}) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200 text-ellipsis overflow-hidden whitespace-nowrap"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <span>{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex-grow"/>
                    <div className="mt-4 sm:mt-6 px-2 flex-shrink-0 pb-4">
                        <button
                            onClick={handleLogout}
                            className="group w-full group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-12 sm:h-16 border text-left p-2 sm:p-3 text-gray-50 text-sm sm:text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;