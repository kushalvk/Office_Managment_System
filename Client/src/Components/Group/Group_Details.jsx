import React from 'react';
import {useParams, useNavigate} from 'react-router-dom'; // Import useParams and useNavigate

function GroupDetails() {
    const {id} = useParams(); // Get the group ID from the URL
    const navigate = useNavigate();

    // Mock data for groups (replace with API call in real app)
    const groups = [
        {
            id: 1,
            name: 'Group 1',
            description: 'Description of Group 1',
            members: ['John Doe', 'Jane Smith', 'Emily Johnson'],
        },
        {
            id: 2,
            name: 'Group 2',
            description: 'Description of Group 2',
            members: ['Michael Brown', 'Sarah Davis'],
        },
        {
            id: 3,
            name: 'Group 3',
            description: 'Description of Group 3',
            members: ['David Wilson', 'Laura Martinez', 'James Anderson'],
        },
    ];

    // Find the group by ID
    const group = groups.find((group) => group.id === parseInt(id));

    if (!group) {
        return <div>Group not found!</div>;
    }

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                ></div>
            </div>

            {/* Header */}
            <div className="mx-auto max-w-2xl pt-48 text-center">
                <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4">Group Details</h1>
            </div>

            {/* Group Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl text-gray-800"><b>Group Name: </b>{group.name}</h2>
                <p className="text-gray-600 mt-2"><b>Description: </b>{group.description}</p>

                {/* Members List */}
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-800">Members:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {group.members.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => navigate('/show-group')} // Navigate back to the groups list
                    className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg"
                >
                    Back to Groups
                </button>
            </div>
        </div>
    );
}

export default GroupDetails;