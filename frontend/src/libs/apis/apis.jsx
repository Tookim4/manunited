import { API_BASE_URL } from '../../config/api';

// login logic
export const login = async (loginData) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

//signup logic
export const signup = async (signupData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
        credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

//user profile logic
export const getCurrentUser = async () => {
    const res = await fetch(`${API_BASE_URL}/current-user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) {
        return null;
    }
    return res.json;
}