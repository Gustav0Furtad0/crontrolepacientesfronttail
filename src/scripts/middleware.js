import axios from 'axios';
import env from 'react-dotenv';
import User from './auth/user';

const axiosInstance = axios.create({
    baseURL: env.API_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = User.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response, test) => {
        const authorization = response.headers['authorization'];
        if (authorization) {
            const token = authorization.split(' ')[1];
            User.setToken(token);
        }
        return response;
    },
    (error) => {
        const response = error.response;
        if (response && response.data && response.data.type === 'token_erro') {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
