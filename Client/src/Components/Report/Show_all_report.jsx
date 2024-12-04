import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShowAllReports() {
    const [reports, setReports] = useState([
        {
            id: 1,
            title: "Project Report 1",
            description: "Description of Project Report 1",
            document: "document1.pdf",
            startDate: "2024-01-01",
            endDate: "2024-01-30",
            approved: false,
        },
        {
            id: 2,
            title: "Project Report 2",
            description: "Description of Project Report 2",
            document: "document2.pdf",
            startDate: "2024-02-01",
            endDate: "2024-02-28",
            approved: true,
        },
    ]);

    const navigate = useNavigate();

    const handleDelete = (reportId) => {
        setReports(reports.filter((report) => report.id !== reportId));
        console.log(`Report ${reportId} deleted.`);
    };

    const handleApprove = (reportId) => {
        setReports(reports.map((report) =>
            report.id === reportId ? { ...report, approved: true } : report
        ));
    };

    return (
        <div className="relative isolate p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                ></div>
            </div>

            <button
                onClick={() => navigate("/submit-report")}
                className="mt-20  py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
                Add Report
            </button>

            <h1 className="text-white text-4xl font-bold mb-4 mt-7">All Reports</h1>

            <div className="space-y-4 mt-6">
                {reports.map((report) => (
                    <div
                        key={report.id}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex flex-col">
                            <h4 className="text-2xl font-bold text-gray-800">{report.title}</h4>
                            <p className="text-sm font-medium text-gray-800">{report.description}</p>
                            <p className="text-xs text-gray-500 mt-1">Start Date: {report.startDate} | End Date: {report.endDate}</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => navigate(`/view-report/${report.id}`)}
                                className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                            >
                                View
                            </button>
                            {!report.approved ? (
                                <button
                                    onClick={() => handleApprove(report.id)}
                                    className="ml-4 text-yellow-600 hover:text-yellow-800 focus:outline-none"
                                >
                                    Approve
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleDelete(report.id)}
                                    className="ml-4 text-red-600 hover:text-red-800 focus:outline-none"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowAllReports;
