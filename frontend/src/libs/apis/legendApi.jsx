import { API_BASE_URL } from '../../config/api';
import axios from 'axios';

// get legend data
export const getPlayers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/players/get_players`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Create legend
export const createPlayer = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/players/create_player`, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// delete legend
export const deletePlayer = async (playerId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/players/delete_player/${playerId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}