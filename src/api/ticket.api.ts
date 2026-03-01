import axios from "axios";
import type { TicketType, UpdateTicketType } from "../types/ticket";
import { getAuthToken } from "../utils/authToken";

const baseURI: string = import.meta.env.VITE_TICKET_URI;

export const createTicket = async (values: TicketType) => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }
    const response = await axios.post(`${baseURI}`, values, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const getAllTickets = async () => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }

    const response = await axios.get(`${baseURI}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const getTicketById = async (id: string | undefined) => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }

    const response = await axios.get(`${baseURI}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const getCommentsByTicketId = async (id: string | undefined) => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }

    const response = await axios.get(`${baseURI}/${id}/comments`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const updateTicket = async (id: string | undefined, values: UpdateTicketType) => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }
    const { description, status, priority } = values
    const payload: UpdateTicketType = {};

    if (values.description?.trim() !== "") {
        payload.description = description;
    }

    if (Array.isArray(status) && status?.includes("CLOSED")) {
        payload.status = status[0];
    } else if (typeof status === "string" && status.trim() !== "") {
        payload.status = status;
    }

    if (priority?.trim() !== "") {
        payload.priority = priority;
    }

    if (Object.keys(payload).length === 0) return;

    const response = await axios.patch(`${baseURI}/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const addComment = async (id: string | undefined, body: string) => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }

    const response = await axios.post(`${baseURI}/${id}/comments`, { body }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}