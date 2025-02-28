import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {UserById} from "../../Services/AuthService.js";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserDetails = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});
    const  navigate = useNavigate();

    useEffect(() => {
        const userDetails = async () => {
            try {
                const response = await UserById(id);
                setUser(response)
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        }
        userDetails();
    }, [id, user]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto space-y-4 mt-10">
            <button
                className="absolute sm:top-[7.5vw] top-[80px] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <div className="flex flex-col items-center">
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

            {Object.keys(user).map((key) =>
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
                                    className="text-blue-600"
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
    );
};

export default UserDetails;
