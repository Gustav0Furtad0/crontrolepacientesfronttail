import CookieManager from './cookies.js';

export default class User {
    static async login(username, password) {
        try {
            const response = await fetch('http://localhost:5000/usuario/login', {
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
            //sessionStorage.setItem('token', data.token);
            CookieManager.setCookie('token', data.token, 15);
            console.log(data, 'CookieManager - login: ', CookieManager.getCookie('token'));
        } catch (error) {
            console.log(error);
        }
    }

    static logout() {
        //sessionStorage.removeItem('token');
        console.log('CookieManager - Logout:', CookieManager.getCookie('token'));
        CookieManager.removeCookie('token');
    }

    static isLoggedIn() {
        console.log('CookieManager - isLoggedIn:', CookieManager.getCookie('token'));
        //return !!sessionStorage.getItem('token');
        return !!CookieManager.getCookie('token');
    }

    static getUser() {
        console.log('CookieManager - getUser:', CookieManager.getCookie('token'));
        //const token = sessionStorage.getItem('token');
        const token = CookieManager.getCookie('token');
        if (!token) return null;

        const payload = token.split('.')[1];
        const data = JSON.parse(atob(payload));
        return data;
    }

    static getToken() {
        console.log('CookieManager - getToken:', CookieManager.getCookie('token'));
        //return sessionStorage.getItem('token');
        return CookieManager.getCookie('token');
    }

    static setToken(token) {
        console.log('CookieManager - setToken:', CookieManager.getCookie('token'));
        //sessionStorage.setItem('token', token);
        CookieManager.setCookie('token', token, 15);
    }
}