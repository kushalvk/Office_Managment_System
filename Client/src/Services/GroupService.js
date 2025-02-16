import axios from "axios";
import { error } from "./Error";

export const addGroup = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-group`, form);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const allGroups = async () => {
    try {
        const response =  await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-group`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchGroupById = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/fetch-group-by-id/${id}`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const deleteGroup = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-groups-by-id/${id}`);
        return response.data;
    } catch (err) {
        error(err)
    }
};