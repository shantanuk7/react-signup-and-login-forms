import axios from "axios";
import { getAuthToken } from "../utils/authToken";

const baseURI: string = import.meta.env.VITE_USER_URI;

export const getCurrentUser = async () => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }

    const resposne = await axios.get(`${baseURI}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return resposne.data;
}

export const getAllSupportAgents = async () => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }

    const resposne = await axios.get(`${baseURI}?role=SUPPORT_AGENT`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return resposne.data;
}