import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBlogNews } from "../../Services/BlogNewsService.js";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddBlogNews() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.image && formData.image.size > 10 * 1024 * 1024) {
                toast.error("File size is too large! Maximum 10MB limit for file size.");
                return;
            }

            const form = new FormData();
            form.append("title", formData.title);
            form.append("description", formData.description);
            form.append("image", formData.image);
            await addBlogNews(form);
            toast.success("Blog/News successfully added!");
            navigate("/blognews");
        } catch (e) {
            console.log(e);
            toast.error("Failed to add blog & news");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-5 pt-15">
            {/* Back Button */}
            <button
                className="fixed top-27 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                <span className="text-sm font-medium">Back</span>
            </button>

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center pt-16 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                    Add Blog & News
                </h1>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                    {/* Title Field */}
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the title"
                            required
                        />
                    </div>

                    {/* Description Field */}
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the description"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Image Upload Field */}
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300"
                        >
                            Submit Blog/News
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddBlogNews;