import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LOGO from "../../../../Storage/LOGO1.svg";
import {loggedUser} from "../../Services/AuthService.js";

function Header() {
    const navigate = useNavigate();
    const isLoggedin = localStorage.getItem("token");
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedin, setLoggedin] = useState({});

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const HandleLogin = () => {
        navigate('/login');
        setMenuOpen(false)
    }

    const handleProfile = () => {
        if (loggedin) {
            navigate('/profile')
            setMenuOpen(false)
        } else {
            alert("Your session is Expired Logged in First");
            navigate('/login')
        }
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
    }, [])

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-12 w-auto rounded-full"
                                src={LOGO}
                                alt="logo"
                            />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex lg:gap-x-12">
                        <a href="/" className="text-sm font-semibold text-gray-900">Home</a>
                        <a href="/show-all-tasks" className="text-sm font-semibold text-gray-900">Tasks</a>
                        <a href="/all-reports" className="text-sm font-semibold text-gray-900">Reports</a>
                        <a href="/Show-all-project" className="text-sm font-semibold text-gray-900">Projects</a>
                    </div>

                    {/* Profile Icon and Bell Section */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">

                        {!isLoggedin ?
                            <button
                                className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-60 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                                onClick={HandleLogin}
                            >
                                Login
                            </button>
                            :
                            <>
                                {/* Bell Button */}
                                <button
                                    type="button"
                                    className="relative text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <a href="/notification">
                                        <span className="sr-only">View notifications</span>
                                        <span className="relative flex h-3 w-3 ml-3 pt-2">
                                    <span
                                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500  "></span>
                                </span>

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
                                    </a>
                                </button>
                                <button className="relative h-16 w-16">
                                    <img
                                        className="h-full w-full rounded-full object-cover border-2 border-gray-200"
                                        src={
                                            loggedin?.profilePhoto
                                                ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${loggedin.profilePhoto}`
                                                : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                        }
                                        alt="Profile"
                                        onClick={handleProfile}
                                    />
                                </button>
                                <button
                                    className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-60 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                                    onClick={HandleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        }
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10 transform ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                    } transition-all duration-500 ease-in-out`}
                >
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src={LOGO}
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6">
                        <a href="/" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">
                            Home
                        </a>
                        <a href="/show-all-tasks"
                           className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">
                            Tasks
                        </a>
                        <a href="/all-reports"
                           className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">
                            Reports
                        </a>
                        <a href="/Show-all-project"
                           className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">
                            Projects
                        </a>
                        <div className="flex flex-col gap-7">
                            {loggedin && <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <button className="mt-5 ml-3 relative h-16 w-16">
                                        <img
                                            className="h-full w-full rounded-full object-cover border-2 border-gray-200"
                                            src={
                                                loggedin?.profilePhoto
                                                    ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${loggedin.profilePhoto}`
                                                    : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                            }
                                            alt="Profile"
                                            onClick={handleProfile}
                                        />
                                    </button>
                                    <div className="flex flex-col ml-3">
                                        <h4>{loggedin.fullName}</h4>
                                        <p>{loggedin.email}</p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="relative text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <a href="/notification">
                                        <span className="sr-only">View notifications</span>
                                        <span className="relative flex h-3 w-3 ml-3 pt-2">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500  "></span>
                                        </span>
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
                                    </a>
                                </button>
                            </div>}

                            {!isLoggedin ?
                                <button
                                    className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-60 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                                    onClick={HandleLogin}
                                >
                                    Login
                                </button>
                                :
                                <button
                                    className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-60 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                                    onClick={HandleLogout}
                                >
                                    Logout
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
