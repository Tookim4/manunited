import { API_BASE_URL } from '../../config/api';
import axios from 'axios';

// login logic
export const login = async (loginData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, loginData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

//signup logic
export const signup = async (signupData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, signupData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

//user profile logic
export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/current-user`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            return null;
        }
        throw error.response?.data || error.message;
    }
}

// logout logic
export const logout = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/logout`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}