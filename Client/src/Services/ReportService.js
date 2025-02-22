import axios from "axios";
import { error } from "./Error";

export const addReport = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-report`, form);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const allReports = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-reports`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const approveReports = async (id) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/approve-reports/${id}`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const deleteReports = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-reports/${id}`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const newlyReports = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/newly-reports`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const pendingApprovalReports = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/pending-approval-reports`);
        return response.data;
    } catch (err) {
        error(err)
    }
}