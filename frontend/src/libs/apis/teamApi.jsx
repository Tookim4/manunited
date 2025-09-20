import { API_BASE_URL } from "../../config/api";
import axios from 'axios';

export const getTeam = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/team`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const addToTeam = async (playerId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/team`, { playerId }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const removeFromTeam = async (playerId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/team/${playerId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}