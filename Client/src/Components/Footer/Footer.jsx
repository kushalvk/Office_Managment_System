import LOGO from "../../../../Storage/LOGO1.svg";
import { useEffect, useState } from "react";
import { loggedUser } from "../../Services/AuthService.js";

function Footer() {
    const [loggedIn, setLoggedIn] = useState(null);

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
        <footer className="bg-gray-50 text-gray-600 py-12 shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

                    <div className="col-span-1 md:col-span-2">
                        <a href="/" className="flex items-center space-x-3">
                            <img
                                className="h-10 w-auto rounded-full transition-transform hover:scale-105"
                                src={LOGO}
                                alt="Prime Hub Logo"
                            />
                            <span className="text-xl font-bold text-gray-900">Prime Hub</span>
                        </a>
                        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                            Discover how we&#39;re transforming workplaces globally.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Authentication</h2>
                        <ul className="space-y-2">
                            {loggedIn?.role === "Manager" ? (
                                <li><a href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</a></li>
                            ) : (
                                <li><a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
                            )}
                            {!loggedIn ? (
                                <li><a href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</a></li>
                            ) : (
                                <>
                                    <li><a href="/profile" className="text-gray-600 hover:text-blue-600 transition-colors">Profile</a></li>
                                    <li><a href="/show-requirement" className="text-gray-600 hover:text-blue-600 transition-colors">Requirements</a></li>
                                    {loggedIn?.role === 'Manager' && (
                                        <li><a href="/notification" className="text-gray-600 hover:text-blue-600 transition-colors">Notification</a></li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Office</h2>
                        <ul className="space-y-2">
                            <li><a href="/show-group" className="text-gray-600 hover:text-blue-600 transition-colors">Group</a></li>
                            {loggedIn && (
                                <>
                                    <li><a href="/show-all-tasks" className="text-gray-600 hover:text-blue-600 transition-colors">Task</a></li>
                                    <li><a href="/Show-all-project" className="text-gray-600 hover:text-blue-600 transition-colors">Projects</a></li>
                                    <li><a href="/all-reports" className="text-gray-600 hover:text-blue-600 transition-colors">Report</a></li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Your Satisfaction</h2>
                        <ul className="space-y-2">
                            <li><a href="/facilities" className="text-gray-600 hover:text-blue-600 transition-colors">Facilities</a></li>
                            <li><a href="/blognews" className="text-gray-600 hover:text-blue-600 transition-colors">Blog / News</a></li>
                            <li><a href="/contactus" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
                            {loggedIn && (
                                <>
                                    <li><a href="/aboutus" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
                                    <li><a href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQs</a></li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Beauty</h2>
                        <ul className="space-y-2">
                            <li><a href="/photos" className="text-gray-600 hover:text-blue-600 transition-colors">Photos</a></li>
                            {loggedIn && (
                                <>
                                    <li><a href="/polices" className="text-gray-600 hover:text-blue-600 transition-colors">Policies</a></li>
                                    <li><a href="/privacy-polices" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policies</a></li>
                                </>
                            )}
                            <li><a href="/terms-condition" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500 text-center sm:text-left">
                            © 2025 By Kushal & Harshad —
                            <a href="#" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 ml-1" target="_blank">
                                @PrimeHub
                            </a>
                        </p>
                        <div className="flex space-x-4 mt-4 sm:mt-0">
                            <a href="#" className="text-gray-500 hover:text-blue-600 transition-all duration-300">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 transition-all duration-300">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 transition-all duration-300">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 transition-all duration-300">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;