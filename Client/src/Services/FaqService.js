import axios from "axios";
import { error } from "./Error";

export const addFaq = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-faq`, form);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchFaq = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-faq`);
        return response.data;
    } catch (err) {
        error(err)
    }
}