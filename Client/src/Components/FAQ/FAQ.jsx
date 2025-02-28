import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchFaq} from "../../Services/FaqService.js";
import {loggedUser} from "../../Services/AuthService.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

function FAQ() {

    const navigate = useNavigate();
    const [faqs, setFaqs] = useState([]);
    const [loggedin, setLoggedin] = useState(null);

    useEffect(() => {
        const logged = async () => {
            try {
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
                setLoggedin(null);
            }
        }
        logged();
    }, [])

    useEffect(() => {
        const faq = async () => {
            try {
                setFaqs(await fetchFaq());
            } catch (e) {
                console.log(e);
                toast.error("fail to load FAQ's")
            }
        }
        faq();
    }, []);

    return (
        <div
            className="relative isolate h-full pt-12 p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            <button
                className="absolute sm:top-[7.5vw] top-[30vw] right-[2.5vw] flex items-center text-white bg-green-600 p-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon/> <p> Back </p>
            </button>
            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-10">Frequently Asked Questions</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                {faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-gray-800">{faq.question}</h2>
                        <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                    </div>
                ))}
            </div>

            {loggedin?.role === "Manager" && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => navigate("/add-faq")}
                        className="py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                        Add New FAQ
                    </button>
                </div>
            )}
        </div>
    );
}

export default FAQ;
