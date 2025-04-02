import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserById } from "../../Services/AuthService.js";
import toast from "react-hot-toast";
import Back_Button from "../BackButton/Back_Button.jsx";

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const userDetails = async () => {
            try {
                const response = await UserById(id);
                setUser(response);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        };
        userDetails();
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    User Details
                </h1>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">

                <div className="flex flex-col items-center mb-6">
                    <img
                        src={
                            user.profilePhoto
                                ? `${user.profilePhoto}`
                                : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                        }
                        alt="Profile Photo"
                        className="w-24 h-24 rounded-full"
                    />
                </div>

                <div className="space-y-4">
                    {Object.keys(user).map(
                        (key) =>
                            key !== "_id" &&
                            key !== "password" &&
                            key !== "profilePhoto" &&
                            key !== "__v" &&
                            key !== "updatedAt" &&
                            key !== "createdAt" && (
                                <div key={key} className="flex justify-between">
                                    <span className="font-semibold text-gray-700 capitalize">
                                        {key.replace(/([A-Z])/g, " $1").trim()}:
                                    </span>
                                    {key === "resume" && user[key] ? (
                                        <a
                                            href={`${user[key]}`}
                                            className="text-blue-600 hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Click to show resume
                                        </a>
                                    ) : (
                                        <span className="text-gray-600">{user[key]}</span>
                                    )}
                                </div>
                            )
                    )}

                    {user.createdAt && (
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Account Created:</span>
                            <span className="text-gray-600">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    )}

                    {user.updatedAt !== user.createdAt && (
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Last Updated:</span>
                            <span className="text-gray-600">
                                {new Date(user.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;