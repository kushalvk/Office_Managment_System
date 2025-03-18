import axios from "axios";
import {error} from "./Error";

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
    } catch (err) {
        error(err)
    }
}

export const deleteStaff = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-staff-by-id/${id}`)
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const UserById = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/get-user-by-id/${id}`)
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const newAddedUsers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/newly-added-users`)
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const verifyEmail = async (email) => {
    const apiKey = import.meta.env.VITE_REACT_APP_MAILBOXLAYER_API_KEY;
    const url = `https://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // smtp_check
        if (data.format_valid && data.mx_found) {
            return "Email exists!";
        }

        throw new Error("Email address does not exist.");
    } catch (error) {
        throw new Error(error.message || "Email verification failed.");
    }
};
