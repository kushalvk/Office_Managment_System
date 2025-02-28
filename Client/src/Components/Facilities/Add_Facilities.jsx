import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addFacilities} from "../../Services/FacilitiesService.js";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddFacility() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = new FormData();
            form.append("title", title);
            form.append("description", description);
            form.append("image", image);

            await addFacilities(form);
            toast.success("Facility Added Successfully!");
            navigate("/facilities");
        } catch (e) {
            console.log(e);
            toast.error("Failed to add facility");
        }
    };

    return (
        <div
            className="h-full p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen flex items-center justify-center">
            <button
                className="absolute sm:top-[7.5vw] top-[80px] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Facility</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Facility title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    ></textarea>

                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-2 border rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
                    >
                        Add Facility
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddFacility;
