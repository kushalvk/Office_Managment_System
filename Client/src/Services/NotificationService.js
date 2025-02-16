import axios from "axios";
import { error } from "./Error";

export const addNotification = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-notification`, form);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchNotifications = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/fetch-all-notification`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const deleteNotification = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-notification-by-id/${id}`);
        return response.data;
    } catch (err) {
        error(err)
    }
}