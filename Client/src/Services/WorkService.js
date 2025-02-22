import axios from "axios";
import { error } from "./Error";

export const addWork = async (form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-work`, form);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchallTasks = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-tasks`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchTaskById = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/taskId/${id}`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const completeById = async (id) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/complete-ById/${id}`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const deleteWorkById = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-work-ById/${id}`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchallProjects = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-projects`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchemployeeTasks = async (username) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/employee-tasks`, { params: { username } });
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchemployeeProjects = async (username) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/employee-projects`, { params: { username } });
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const fetchComplatedProject = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/complate-projects`);
        return response.data;
    } catch (err) {
        error(err)
    }
}

export const generateWorkDescription = async (title) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/generate-description`,
            { title }
        );

        if (response.data.description) {
            let cleanedDescription = response.data.description;

            // Remove bold markdown formatting (**text**)
            cleanedDescription = cleanedDescription.replace(/\*\*(.*?)\*\*/g, "$1");

            // Remove blockquote formatting ("> text")
            cleanedDescription = cleanedDescription.replace(/^>\s?/gm, "");

            // Remove labels like "Concise:", "Slightly more detailed:"
            cleanedDescription = cleanedDescription.replace(/^\s*[^:]+:\s*/g, "");

            // Remove bullet points ("* " or "- ")
            cleanedDescription = cleanedDescription.replace(/^\s*[-*]\s+/gm, "");

            return cleanedDescription.trim();
        } else {
            alert("No description generated. Try again.");
        }
    } catch (err) {
        error(err)
    }
}