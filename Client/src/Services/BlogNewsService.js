import axios from "axios";
import { error } from "./Error";

export const addBlogNews = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-blognews`, form);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const allBlogNews = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-blognews`);
        return response.data;
    } catch (err) {
        error(err)
    }
}