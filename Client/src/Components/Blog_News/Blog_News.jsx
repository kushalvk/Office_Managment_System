import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { allBlogNews } from "../../Services/BlogNewsService.js";
import { loggedUser } from "../../Services/AuthService.js";
import toast from "react-hot-toast";
import Back_Button from "../BackButton/Back_Button.jsx";
import Loader from "../Loader/Loader.jsx";

function BlogNews() {
    const navigate = useNavigate();
    const [posts, setPost] = useState([]);
    const [loggedin, setLoggedin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const logged = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
                setLoggedin(null);
            } finally {
                setIsLoading(false);
            }
        };
        logged();
    }, []);

    useEffect(() => {
        const blogNews = async () => {
            try {
                const response = await allBlogNews();
                setPost(response);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch blog news");
            }
        };
        blogNews();
    }, []);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">

            <Back_Button />

            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Blog & News
                </h1>
            </div>

            <div className="max-w-6xl mx-auto">
                {posts.length === 0 ? (
                    <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
                        No blog posts found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >

                                <img
                                    src={
                                        post.image
                                            ? `${post.image}`
                                            : "https://dummyimage.com/150x150/cccccc/ffffff&text=No+Image"
                                    }
                                    alt={post.title}
                                    className="rounded-lg object-cover w-full h-48"
                                />


                                <div className="mt-4">
                                    <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                                    <p className="text-sm text-gray-600 mt-2">{post.description}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Published: {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {loggedin?.role === "Manager" && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => navigate("/addblognews")}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                        Add New Blog
                    </button>
                </div>
            )}
        </div>
    );
}

export default BlogNews;