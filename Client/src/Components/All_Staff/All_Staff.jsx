import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {allStaff} from "../../Services/AuthService.js";

function All_Staff() {
    const [staff, setStaff] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const Staff = async () => {
            try {
                const staff = await allStaff()
                setStaff(staff.employees)
                // console.log(staff)
            } catch (e) {
                console.log(e)
            }
        }
        Staff()
    }, [])

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                 aria-hidden="true">
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
                {staff.map((employee, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${employee.profilePhoto}
                            `}
                            alt={employee.fullName
                            }
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="text-xl font-bold text-gray-800 text-center">{employee.fullName
                        }</h4>
                        <p className="text-sm text-gray-700 text-center">{employee.role
                        }</p>
                        <p className="text-sm text-gray-700 mt-2"><strong>Department:</strong> {employee.department}</p>
                        <p className="text-sm text-gray-700 mt-2"><strong>Email:</strong> {employee.email}</p>
                        <p className="text-sm text-gray-700 mt-2"><strong>Phone:</strong> {employee.mobNo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default All_Staff;
