import CookieManager from './cookies.js';
import env from "react-dotenv";

export default class User {
    static async login(username, password) {
        try {
            const response = await fetch(env.API_URL + '/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha no login');
            }

            const data = await response.json();
            CookieManager.setCookie('token', data.token, 15);
        } catch (error) {
            return error;
        }
    }   

    static logout() {
        CookieManager.removeCookie('token');
    }

    static isLoggedIn() {
        return !!CookieManager.getCookie('token');
    }

    static getUser() {
        const token = CookieManager.getCookie('token');
        if (!token) return null;

        const payload = token.split('.')[1];
        const data = JSON.parse(atob(payload));
        return data;
    }

    static getToken() {
        return CookieManager.getCookie('token');
    }

    static setToken(token) {
        CookieManager.setCookie('token', token, 15);
    }
}