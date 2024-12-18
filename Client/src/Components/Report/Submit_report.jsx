import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SubmitReport() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [document, setDocument] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReport = {
            title,
            description,
            document: document.name,
            startDate,
            endDate,
            approved: false,
        };

        // Normally, you would save the new report to the backend or state here
        console.log("New report submitted:", newReport);
        navigate("/show-all-reports");
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

            <h1 className="text-white text-4xl font-bold mb-4 mt-20">Submit Report</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label className="text-white font-medium text-lg">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-3 rounded-lg bg-white text-gray-800"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-medium text-lg">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-3 rounded-lg bg-white text-gray-800"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-medium text-lg">Document</label>
                    <input
                        type="file"
                        onChange={(e) => setDocument(e.target.files[0])}
                        className="p-3 rounded-lg bg-white text-gray-800"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-medium text-lg">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="p-3 rounded-lg bg-white text-gray-800"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-medium text-lg">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="p-3 rounded-lg bg-white text-gray-800"
                        required
                    />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="submit"
                        className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                        Submit Report
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/all-reports")}
                        className="py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-gray-600 text-white font-semibold hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SubmitReport;
