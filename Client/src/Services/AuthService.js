import axios from "axios";
import { error } from "./Error";

export const addUser = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-user`, form)
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const login = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`, form)
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const forgotPassword = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/forgot-password`, form)
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const loggedUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/loggeduser`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return response.data.user;
    } catch (err) {
        error(err)
    }
};

export const updateUserProfile = async (id, form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/update-profile/${id}`, form)
        return response.data;
    } catch (e) {
        error(e)
    }
}

export const allStaff = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-staff`)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}