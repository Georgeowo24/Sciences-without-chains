import axios from 'axios';

const API_URL = "http://localhost:3000/";

// Configura axios para enviar cookies automáticamente
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const login = (email: string, password: string) => {
    console.log(email)
    return api.post('/auth/login', { email, password })
        .then(response => ({
        token: response.data.token,
        user: response.data.user
        }));
};

export const verifySession = () => {
    return api.get('/auth/verify')
        .then(response => response.data)
        .catch(() => null);
};

export const logout = () => {
    return api.post('/auth/logout');
};

export const register = async (email: string, password: string) => {
    await axios.post('/auth/logout', { email, password });
};