import React, { useState } from 'react';
import UserIcon from '../../../../Storage/Add_User.jpg';
import { addUser } from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Add_User() {

    const qualificationOptions = [
        { value: "", label: "Select Qualification" },
        { value: "High School", label: "High School" },
        { value: "Diploma", label: "Diploma" },
        { value: "Bachelor's Degree", label: "Bachelor's Degree" },
        { value: "Master's Degree", label: "Master's Degree" },
        { value: "PhD", label: "PhD" },
        { value: "Other", label: "Other" },
    ];

    const departmentOptions = [
        { value: "", label: "Select Department" },
        { value: "Human Resources", label: "Human Resources" },
        { value: "Finance", label: "Finance" },
        { value: "Information Technology", label: "Information Technology" },
        { value: "Marketing", label: "Marketing" },
        { value: "Sales", label: "Sales" },
        { value: "Operations", label: "Operations" },
        { value: "Customer Support", label: "Customer Support" },
        { value: "Research and Development", label: "Research and Development" },
        { value: "Legal", label: "Legal" },
        { value: "Administration", label: "Administration" },
    ];

    const workLocationOptions = [
        { value: "", label: "Select Work Location" },
        { value: "Office", label: "Office" },
        { value: "Remote", label: "Remote" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "On-Site", label: "On-Site" },
        { value: "Client Location", label: "Client Location" },
    ];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        dob: '',
        gender: '',
        mobNo: '',
        qualification: '',
        username: '',
        password: '',
        confirmPassword: '',
        workLocation: '',
        department: '',
        role: '',
        profilePhoto: null,
        resume: null,
    });
    const [Error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password === formData.confirmPassword) {
            const form = new FormData();
            form.append("fullName", formData.fullName)
            form.append("email", formData.email)
            form.append("address", formData.address)
            form.append("dob", formData.dob)
            form.append("gender", formData.gender)
            form.append("mobNo", formData.mobNo)
            form.append("qualification", formData.qualification)
            form.append("username", formData.username)
            form.append("password", formData.password)
            form.append("workLocation", formData.workLocation)
            form.append("department", formData.department)
            form.append("role", formData.role)
            form.append("profilePhoto", formData.profilePhoto)
            form.append("resume", formData.resume)

            try {
                await addUser(form);
                alert("User Added Sucessfully")
                navigate("/all-staff");
            } catch (e) {
                setError(e.message);
            }
        } else {
            setError("Password dose't match")
        }
    };

    return (
        <div className="relative isolate h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400">
            <button
                className="absolute sm:top-[7.5vw] top-[30vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon /> <p> Back </p>
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

            <div className="mx-auto max-w-2xl p-5 text-center">
                <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4">Add New User</h1>
                <p className="text-gray-300 text-lg">Please fill out the form below to add a new user.</p>
            </div>

            <div className="flex justify-center mb-6">
                <img
                    className="object-cover object-center rounded-full h-32 w-32 md:h-48 md:w-48 border-4 border-white shadow-lg"
                    alt="User Icon"
                    src={UserIcon}
                />
            </div>

            <section className="bg-gray-100 shadow-lg rounded-lg p-8 mx-4 md:mx-8 mb-8">
                {Error ? <p className='text-red-600 font-bold flex justify-center'>{Error}</p> : null}
                <form className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8" onSubmit={handleSubmit} method="POST">
                    {/* Form Fields */}
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="mobNo">Mobile Number</label>
                        <input
                            type="text"
                            id="mobNo"
                            name="mobNo"
                            value={formData.mobNo}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2"
                            htmlFor="qualification">Qualification</label>
                        <select
                            id="qualification"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            {qualificationOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="confirmPassword">Confirm
                            Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="workLocation">Work Location</label>
                        <select
                            id="workLocation"
                            name="workLocation"
                            value={formData.workLocation}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            {workLocationOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="department">Department</label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            {departmentOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            {/* Placeholder option */}
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="profilePhoto">Profile Photo</label>
                        <input
                            type="file"
                            id="profilePhoto"
                            name="profilePhoto"
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            accept="image/*"
                            required
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-gray-800 font-semibold mb-2" htmlFor="resume">Resume</label>
                        <input
                            type="file"
                            id="resume"
                            name="resume"
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            accept=".pdf,.doc,.docx"
                            required
                        />
                    </div>
                    {Error ? <p className='text-red-600 font-bold flex justify-center'>{Error}</p> : null}
                    <div className="flex justify-center mb-4 md:col-span-2">
                        <button type="submit"
                            className="bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Add_User;
