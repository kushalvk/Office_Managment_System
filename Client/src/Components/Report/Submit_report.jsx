import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReport } from "../../Services/ReportService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";

function SubmitReport() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reportDocument, setReportDocument] = useState(null);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (reportDocument?.size > 10 * 1024 * 1024) {
                toast.error("File size too large! Maximum 10MB limit.");
                return;
            }

            const report = new FormData();
            report.append("reportdocument", reportDocument);
            report.append("title", title);
            report.append("description", description);
            report.append("startDate", startDate);
            report.append("endDate", endDate);
            report.append("submitedBy", username);

            await addReport(report);
            toast.success("New report submitted!");
            navigate("/all-reports");
        } catch (e) {
            console.log(e);
            toast.error("Failed to submit report.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Submit Report
                </h1>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1 h-24 resize-y"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Document</label>
                        <input
                            type="file"
                            name="reportdocument"
                            onChange={(e) => setReportDocument(e.target.files[0])}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1 text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            max={new Date().toISOString().split("T")[0]}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 mt-1"
                            min={new Date().toISOString().split("T")[0]}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Submit Report
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/all-reports")}
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SubmitReport;