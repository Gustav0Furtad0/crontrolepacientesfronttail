import Cookies from "js-cookie";

export default class CookieManager {
    static setCookie(name, value, minutes, options = {}) {
        const expires = new Date(new Date().getTime() + minutes * 60000);
        Cookies.set(name, value, { expires: expires, secure: true, sameSite: 'strict', ...options });
    }

    static getCookie(name) {
        return Cookies.get(name);
    }

    static removeCookie(name) {
        Cookies.remove(name);
    }

    static getTimeToExpire(name) {
        const cookie = Cookies.get(name);
        if (!cookie) return 0;

        const expires = Cookies.get(name + '.expires');
        const expiresDate = new Date(expires);
        return (expiresDate.getTime() - new Date().getTime()) / 60000;
    }
}
