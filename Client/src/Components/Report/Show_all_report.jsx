import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { allReports, allReportsByUsername, approveReports, deleteReports } from "../../Services/ReportService.js";
import { loggedUser } from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert.jsx";
import ApproveConfirmationAlert from "../ConfirmetionAlerts/ApproveConfermetionAlert.jsx";

function ShowAllReports() {
    const [reports, setReports] = useState([]);
    const [loggedIn, setLoggedIn] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [approveId, setApproveId] = useState(null);
    const [closingDelete, setClosingDelete] = useState(false);
    const [closingApprove, setClosingApprove] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
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
        const fetchReports = async () => {
            try {
                if (!loggedIn) return;

                let response;
                if (loggedIn.role === "Manager") {
                    response = await allReports();
                } else {
                    response = await allReportsByUsername(loggedIn.username);
                }

                let filteredReports = response.reports || [];

                if (searchTerm) {
                    filteredReports = filteredReports.filter(report =>
                        report.title.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                if (filterStatus !== "all") {
                    filteredReports = filteredReports.filter(report =>
                        (filterStatus === "approved" ? report.approve : !report.approve)
                    );
                }

                setReports(filteredReports);
            } catch (e) {
                console.log(e);
                toast.error("Failed to load reports.");
            }
        };

        fetchReports();
    }, [loggedIn, searchTerm, filterStatus]);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
        setClosingDelete(false);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteReports(deleteId);
            setReports(prev => prev.filter(report => report._id !== deleteId));
            toast.success("Report deleted successfully!");
        } catch (e) {
            console.log(e);
            toast.error("Failed to delete report.");
        }
    };

    const handleApproveClick = (id) => {
        setApproveId(id);
        setShowApproveConfirm(true);
        setClosingApprove(false);
    };

    const handleApproveConfirm = async () => {
        try {
            await approveReports(approveId);
            setReports(prev =>
                prev.map(report =>
                    report._id === approveId ? { ...report, approve: true } : report
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

            <button
                className="fixed top-27 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                <span className="text-sm font-medium">Back</span>
            </button>

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    All Reports
                </h1>
            </div>

            <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 bg-white/90 backdrop-blur-sm"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full sm:w-1/4 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 bg-white/90 backdrop-blur-sm"
                >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="not-approved">Not Approved</option>
                </select>

                {loggedIn?.role === "Employee" && (
                    <button
                        onClick={() => navigate("/submit-report")}
                        className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add Report
                    </button>
                )}
            </div>

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
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center transform hover:scale-105"
                            >
                                <div className="flex-grow">
                                    <h4 className="text-xl font-semibold text-gray-800">{report.title}</h4>
                                    <p className="text-gray-600 mt-1">{report.description}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <span className="font-medium">Start Date:</span> {new Date(report.startDate).toLocaleDateString()} |{' '}
                                        <span className="font-medium">End Date:</span> {new Date(report.endDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <span className="font-medium">Status:</span> {report.approve ? "Approved" : "Not Approved"}
                                    </p>
                                </div>

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
                                                    onClick={() => handleApproveClick(report._id)}
                                                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-all duration-300"
                                                >
                                                    Approve
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleDeleteClick(report._id)}
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

            <DeleteConfirmationAlert
                showConfirm={showDeleteConfirm}
                setShowConfirm={setShowDeleteConfirm}
                deleteId={deleteId}
                setDeleteId={setDeleteId}
                closing={closingDelete}
                setClosing={setClosingDelete}
                onConfirm={handleDeleteConfirm}
            />

            <ApproveConfirmationAlert
                showConfirm={showApproveConfirm}
                setShowConfirm={setShowApproveConfirm}
                approveId={approveId}
                setApproveId={setApproveId}
                closing={closingApprove}
                setClosing={setClosingApprove}
                onConfirm={handleApproveConfirm}
            />
        </div>
    );
}

export default ShowAllReports;