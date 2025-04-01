import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../../../../Storage/LOGO1.svg";
import { loggedUser } from "../../Services/AuthService.js";
import Attendance from "../Attendance/Attendance.jsx";

function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(null); // Changed to null for clearer state

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleLogin = () => {
        navigate('/login');
        setMenuOpen(false);
    };

    const handleProfile = () => {
        if (loggedIn) {
            navigate('/profile');
            setMenuOpen(false);
        } else {
            alert("Your session has expired. Please log in first.");
            navigate('/login');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        window.location.reload(); // Use window.location.reload for clarity
    };

    useEffect(() => {
        const fetchLoggedUser = async () => {
            try {
                const user = await loggedUser();
                setLoggedIn(user);
            } catch (e) {
                console.log(e.message);
                setLoggedIn(null);
            }
        };
        fetchLoggedUser();
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
            <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">

                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-15 w-auto rounded-full transition-transform hover:scale-105"
                            src={LOGO}
                            alt="Logo"
                        />
                    </a>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>

                <div className="hidden lg:flex lg:gap-x-7">
                    <a href="/" className="text-md font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        Home
                    </a>
                    <a href="/show-group" className="text-md font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        Group
                    </a>
                    {loggedIn && (
                        <>
                            <a href="/show-all-tasks" className="text-md font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                Tasks
                            </a>
                            <a href="/all-reports" className="text-md font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                Reports
                            </a>
                            <a href="/Show-all-project" className="text-md font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                Projects
                            </a>
                            <a href="/attendance" className="text-md font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                Attendance
                            </a>
                            <a href="/e-salary" className="text-md font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                Salary
                            </a>
                        </>
                    )}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                    {!loggedIn ? (
                        <button
                            onClick={handleLogin}
                            className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-60 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                        >
                            Login
                        </button>
                    ) : (
                        <>
                            <a href="/notification" className="relative text-gray-600 hover:text-blue-600">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                    />
                                </svg>
                                <span className="absolute top-0 right-0 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            </a>

                            <button onClick={handleProfile} className="relative h-15 w-15">
                                <img
                                    className="h-full w-full rounded-full object-cover border-2 border-blue-200 hover:border-blue-400 transition-all"
                                    src={
                                        loggedIn?.profilePhoto
                                            ? `${loggedIn.profilePhoto}`
                                            : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                    }
                                    alt="Profile"
                                />
                            </button>

                            <button
                                onClick={handleLogout}
                                className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-60 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>

            <div
                className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <a href="/" className="-m-1.5 p-1.5">
                        <img className="h-8 w-auto" src={LOGO} alt="Logo" />
                    </a>
                    <button onClick={toggleMenu} className="p-2 text-gray-700 hover:text-blue-600">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <a href="/" className="block text-base font-semibold text-gray-900 hover:text-blue-600">
                        Home
                    </a>
                    <a href="/show-group" className="block text-base font-semibold text-gray-900 hover:text-blue-600">
                        Group
                    </a>
                    {loggedIn && (
                        <>
                            <a href="/show-all-tasks" className="block text-base font-semibold text-gray-900 hover:text-blue-600">
                                Tasks
                            </a>
                            <a href="/all-reports" className="block text-base font-semibold text-gray-900 hover:text-blue-600">
                                Reports
                            </a>
                            <a href="/Show-all-project" className="block text-base font-semibold text-gray-900 hover:text-blue-600">
                                Projects
                            </a>
                            <a href="/attendance" className="block text-base font-semibold text-gray-900 hover:text-blue-600">
                                Attendance
                            </a>
                            <a href="/e-salary" className="block text-base font-semibold text-gray-900 hover:text-blue-600">
                                Salary
                            </a>
                        </>
                    )}
                    {loggedIn && (
                        <div className="flex items-center gap-3 border-t pt-4">
                            <img
                                className="h-10 w-10 rounded-full object-cover border-2 border-blue-200"
                                src={
                                    loggedIn?.profilePhoto
                                        ? `${loggedIn.profilePhoto}`
                                        : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                }
                                alt="Profile"
                                onClick={handleProfile}
                            />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{loggedIn.fullName}</p>
                                <p className="text-xs text-gray-600">{loggedIn.email}</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={loggedIn ? handleLogout : handleLogin}
                        className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-60 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                    >
                        {loggedIn ? "Logout" : "Login"}
                    </button>
                    {loggedIn && (
                        <a href="/notification" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                />
                            </svg>
                            Notifications
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;