import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function ShowAllGroups() {
    const navigate = useNavigate(); // Initialize useNavigate

    const groups = [
        { id: 1, name: 'Group 1', description: 'Description of Group 1' },
        { id: 2, name: 'Group 2', description: 'Description of Group 2' },
        { id: 3, name: 'Group 3', description: 'Description of Group 3' },
    ];

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                ></div>
            </div>
            {/* Header */}
            <div className="mx-auto max-w-2xl pt-48 text-center">
                <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4">Show All Groups</h1>
                <p className="text-gray-300 text-lg">Here is the list of all groups.</p>
            </div>

            {/* Button to navigate to Add_Group */}
            <div className="flex justify-center my-6">
                <button
                    onClick={() => navigate('/add-group')} // Navigate to Add_Group
                    className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md text-lg"
                >
                    Add New Group
                </button>
            </div>

            {/* Group List */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                {groups.map((group) => (
                    <div key={group.id} className="p-4 mb-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-700">{group.name}</h2>
                        <p className="text-gray-600">{group.description}</p>
                        <button
                            onClick={() => navigate(`/group-details/${group.id}`)} // Navigate to Group Details
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowAllGroups;