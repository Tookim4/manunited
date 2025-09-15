import { API_BASE_URL } from '../../config/api';

// get legend data
export const getPlayers = async () => {
    const response = await fetch(`${API_BASE_URL}/players`, {
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