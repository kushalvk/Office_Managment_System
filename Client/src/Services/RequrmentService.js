import axios from "axios";
import { error } from "./Error";

export const addRequrment = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-requrment`, form);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const allRequrments = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-requrments`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const allRequrmentsByUsername = async (username) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-requrments-by-username/${username}`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const updteRequrments = async (id, status) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/update-requrment/${id}`, {requrmentstatus: status});
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const updteRequrmentsEmp = async (id, form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/update-requrment-employee/${id}`, form);
        return response.data;
    } catch (err) {
        error(err)
    }
}