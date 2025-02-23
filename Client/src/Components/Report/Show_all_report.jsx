import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {allReports, approveReports, deleteReports} from "../../Services/ReportService.js";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ShowAllReports() {
    const [reports, setReports] = useState([]);
    const [loggedin, setLoggedin] = useState(null);

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
        const reports = async () => {
            try {
                const reports = await allReports();
                setReports(reports.reports);
            } catch (e) {
                console.log(e);
                alert("Fail to load Reports");
            }
        }
        reports();
    }, []);

    const navigate = useNavigate();

    const handleDelete = async (reportId) => {
        try {
            await deleteReports(reportId);
            setReports(reports.filter((report) => report._id !== reportId));
            alert(`Report Deleted successfully.`);
        } catch (e) {
            console.log(e);
            alert(`Fail to delete Report.`);
        }
    };

    const handleApprove = async (reportId) => {
        try {
            await approveReports(reportId);

            setReports(reports.map((report) =>
                report._id === reportId ? {...report, approve: true} : report
            ));

            alert("Report Approve successfully.");
        } catch (e) {
            console.log(e);
            alert("Fail to approve report");
        }
    };

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute sm:top-[7.5vw] top-[30vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                 aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                ></div>
            </div>

            <h1 className="text-white text-4xl font-bold mt-20 mb-4">All Reports</h1>

            {loggedin?.role === "Employee" && (
                <button
                    onClick={() => navigate("/submit-report")}
                    className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                    Add Report
                </button>
            )}

            <div className="space-y-4 mt-6">
                {reports.map((report, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex flex-col">
                            <h4 className="text-2xl font-bold text-gray-800">{report.title}</h4>
                            <p className="text-sm font-medium text-gray-800">{report.description}</p>
                            <p className="text-xs text-gray-500 mt-1">Start
                                Date: {new Date(report.startDate).toLocaleDateString()} | End
                                Date: {new Date(report.endDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center">
                            <a
                                href={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/uplodes/${report.reportDocument}`}
                                target={"_blank"}
                                className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                            >
                                View
                            </a>

                            {loggedin?.role === "Manager" && (<>
                                {!report.approve ? (
                                    <button
                                        onClick={() => handleApprove(report._id)}
                                        className="ml-4 text-yellow-600 hover:text-yellow-800 focus:outline-none"
                                    >
                                        Approve
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDelete(report._id)}
                                        className="ml-4 text-red-600 hover:text-red-800 focus:outline-none"
                                    >
                                        Delete
                                    </button>
                                )}
                            </>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowAllReports;
