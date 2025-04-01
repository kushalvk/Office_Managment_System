import axios from "axios";
import {error} from "./Error";

export const checkIn = async (username) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/check-in`, username)
        return response.data;
    } catch (err) {
         error(err)
    }
}

export const checkOut = async (username) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/check-out`, username)
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const getAttendanceData = async (username) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/attendance-data`, username)
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const pastAttendanceData = async () => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-past-attendances`)
        return response.data;
    } catch (err) {
        error(err)
    }
}