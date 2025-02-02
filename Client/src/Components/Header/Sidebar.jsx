import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {loggedUser} from "../../Services/AuthService.js";

function Sidebar() {
    const navigate = useNavigate();
    const [loggedin, setLoggedin] = useState({});

    const handleProfile = () => {
        navigate('/profile')
    }

    const HandleLogout = () => {
        localStorage.clear();
        navigate('/login');
        location.reload();
    }

    useEffect(() => {
        const logged = async () => {
            try {
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
            }
        }
        logged();

        if (loggedin.profilePhoto === "undefined") {
            localStorage.clear();
            navigate('/login');
        } else if (!localStorage.getItem("token")) {
            navigate('/login');
        }
    }, [])

    return (
        <>
            <div className="w-64 bg-blue-800 text-white p-6 mr-1">
                <div className={"flex"}>
                    <button className="relative h-13 w-16 mt-3">
                        <img
                            className="h-full w-full rounded-full object-cover border-2 border-gray-200"
                            src={
                                loggedin.profilePhoto
                                    ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${loggedin.profilePhoto}`
                                    : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                            }
                            alt="Profile"
                            onClick={handleProfile}
                        />
                    </button>
                    <h2 className="text-2xl font-bold text-center mb-10">Manager Dashboard</h2>
                </div>
                <ul className="space-y-6">
                    <li>
                        <Link to="/dashbored" className="hover:bg-blue-700 p-2 rounded-md block">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/all-staff" className="hover:bg-blue-700 p-2 rounded-md block">My Staff</Link>
                    </li>
                    <li>
                        <Link to="/add-work" className="hover:bg-blue-700 p-2 rounded-md block">Add Work</Link>
                    </li>
                    <li>
                        <Link to="/all-reports" className="hover:bg-blue-700 p-2 rounded-md block">Reports</Link>
                    </li>
                    <li>
                        <Link to="/show-all-tasks" className="hover:bg-blue-700 p-2 rounded-md block">Task</Link>
                    </li>
                    <li>
                        <Link to="/Show-all-project" className="hover:bg-blue-700 p-2 rounded-md block">Project</Link>
                    </li>
                    <li>
                        <Link to="/show-group" className="hover:bg-blue-700 p-2 rounded-md block">Group</Link>
                    </li>
                    <li>
                        <Link to="/all-reports" className="hover:bg-blue-700 p-2 rounded-md block">Report</Link>
                    </li>
                    <li>
                        <Link to="/Show-requirment" className="hover:bg-blue-700 p-2 rounded-md block">Requerment</Link>
                    </li>
                    <li>
                        <Link to="/sallary" className="hover:bg-blue-700 p-2 rounded-md block">Sallary</Link>
                    </li>
                </ul>
                <div className={"relative flex items-center justify-center mt-3"}>
                    <button
                        className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-60 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                        onClick={HandleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar;