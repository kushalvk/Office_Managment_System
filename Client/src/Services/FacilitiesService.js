import axios from "axios";
import { error } from "./Error";

export const addFacilities = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-facilities`, form);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchFacilities = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/fetch-all-facilities`);
        return response.data;
    } catch (err) {
        error(err)
    }
}