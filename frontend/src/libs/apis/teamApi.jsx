import { API_BASE_URL } from "../../config/api";

export const getTeam = async () => {
    const response = await fetch(`${API_BASE_URL}/team`, {
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

export const addToTeam = async (playerId) => {
    const response = await fetch(`${API_BASE_URL}/team`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ playerId }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;    
}