import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {allReports, allReportsByUsername, approveReports, deleteReports} from "../../Services/ReportService.js";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function ShowAllReports() {
    const [reports, setReports] = useState([]);
    const [loggedIn, setLoggedIn] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const user = await loggedUser();
                setLoggedIn(user);
            } catch (e) {
                console.log(e.message);
                setLoggedIn(null);
            }
        };
        fetchLoggedInUser();
    }, []);

    useEffect(() => {
        if (loggedIn?.role === "Manager") {
            const fetchReports = async () => {
                try {
                    if (loggedIn) {
                        const response = await allReports();
                        setReports(response.reports || []);
                    }
                } catch (e) {
                    console.log(e);
                    toast.error("Failed to load reports.");
                }
            };
            fetchReports();
        } else {
            const fetchReports = async () => {
                try {
                    if (loggedIn) {
                        const response = await allReportsByUsername(loggedIn.username);
                        setReports(response.reports || []);
                    }
                } catch (e) {
                    console.log(e);
                    toast.error("Failed to load reports.");
                }
            };
            fetchReports();
        }
    }, [loggedIn]);

    const handleDelete = async (reportId) => {
        try {
            await deleteReports(reportId);
            setReports(prev => prev.filter(report => report._id !== reportId));
            toast.success("Report deleted successfully!");
        } catch (e) {
            console.log(e);
            toast.error("Failed to delete report.");
        }
    };

    const handleApprove = async (reportId) => {
        try {
            await approveReports(reportId);
            setReports(prev =>
                prev.map(report =>
                    report._id === reportId ? {...report, approve: true} : report
                )
            );
            toast.success("Report approved successfully!");
        } catch (e) {
            console.log(e);
            toast.error("Failed to approve report.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">
            {/* Back Button */}
            <button
                className="fixed top-27 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{fontSize: 20}}/>
                <span className="text-sm font-medium">Back</span>
            </button>

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    All Reports
                </h1>
            </div>

            {/* Add Report Button (Employee Only) */}
            {loggedIn?.role === "Employee" && (
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => navigate("/submit-report")}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add Report
                    </button>
                </div>
            )}

            {/* Report List */}
            <div className="max-w-4xl mx-auto">
                {reports.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No reports submitted yet.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {reports.map((report, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                            >
                                {/* Report Details */}
                                <div className="flex-grow">
                                    <h4 className="text-xl font-semibold text-gray-800">{report.title}</h4>
                                    <p className="text-gray-600 mt-1">{report.description}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <span
                                            className="font-medium">Start Date:</span> {new Date(report.startDate).toLocaleDateString()} |{' '}
                                        <span
                                            className="font-medium">End Date:</span> {new Date(report.endDate).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 mt-4 sm:mt-0">
                                    <a
                                        href={report.reportDocument}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                                    >
                                        View
                                    </a>
                                    {loggedIn?.role === "Manager" && (
                                        <>
                                            {!report.approve ? (
                                                <button
                                                    onClick={() => handleApprove(report._id)}
                                                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-all duration-300"
                                                >
                                                    Approve
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleDelete(report._id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowAllReports;