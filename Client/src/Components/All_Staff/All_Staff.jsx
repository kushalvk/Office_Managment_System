import { useNavigate } from "react-router-dom";
import { useState } from "react";

function All_Staff() {
    const [staff, setStaff] = useState([
        {
            id: 1,
            name: "John Doe",
            position: "Manager",
            email: "john.doe@example.com",
            phone: "+1-234-567-890",
            image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 2,
            name: "Jane Smith",
            position: "Receptionist",
            email: "jane.smith@example.com",
            phone: "+1-987-654-321",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 3,
            name: "Emily Johnson",
            position: "Housekeeper",
            email: "emily.johnson@example.com",
            phone: "+1-345-678-901",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 1,
            name: "John Doe",
            position: "Manager",
            email: "john.doe@example.com",
            phone: "+1-234-567-890",
            image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 2,
            name: "Jane Smith",
            position: "Receptionist",
            email: "jane.smith@example.com",
            phone: "+1-987-654-321",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 3,
            name: "Emily Johnson",
            position: "Housekeeper",
            email: "emily.johnson@example.com",
            phone: "+1-345-678-901",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ]);

    const navigate = useNavigate();

    return (
        <div className="relative isolate p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-600 min-h-screen">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>
            <h1 className="text-white text-4xl font-bold mb-4 mt-20">All Staff</h1>
            <button
                onClick={() => navigate("/adduser")}
                className=" py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
                Add Staff
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {staff.map((employee) => (
                    <div
                        key={employee.id}
                        className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={employee.image}
                            alt={employee.name}
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="text-xl font-bold text-gray-800 text-center">{employee.name}</h4>
                        <p className="text-sm text-gray-700 text-center">{employee.position}</p>
                        <p className="text-sm text-gray-700 mt-2"><strong>Email:</strong> {employee.email}</p>
                        <p className="text-sm text-gray-700 mt-2"><strong>Phone:</strong> {employee.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default All_Staff;
