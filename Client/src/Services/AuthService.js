import axios from "axios";
import { error } from "./Error";

export const addUser = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-user`, form)
        return console.log(response.data);
    } catch (err) {
        error(err)
    }
}