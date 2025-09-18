import { API_BASE_URL } from '../../config/api';

// get legend data
export const getPlayers = async () => {
    const response = await fetch(`${API_BASE_URL}/players/get_players`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

// Create legend
export const createPlayer = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/players/create_player`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

// delete legend
export const deletePlayer = async (playerId) => {
    const response = await fetch(`${API_BASE_URL}/players/delete_player/${playerId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}