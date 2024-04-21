import Cookies from "js-cookie";

// export default class CookieManager {
//     static setCookie(name, value, minutes, options = {}) {
//         const expires = new Date(new Date().getTime() + minutes * 60000);
//         Cookies.set(name, value, { expires: expires, secure: true, sameSite: 'none', ...options });
//     }

//     static getCookie(name) {
//         return Cookies.get(name);
//     }

//     static removeCookie(name) {
//         Cookies.remove(name);
//     }

//     static getTimeToExpire(name) {
//         const cookie = Cookies.get(name);
//         if (!cookie) return 0;

//         const expires = Cookies.get(name + '.expires');
//         const expiresDate = new Date(expires);
//         return (expiresDate.getTime() - new Date().getTime()) / 60000;
//     }
// }

export default class CookieManager {
    static setCookie(name, value, minutes) {
        const expirationTime = new Date(new Date().getTime() + minutes * 60000).getTime();
        const cookieObject = { value, expires: expirationTime };
        localStorage.setItem(name, JSON.stringify(cookieObject));
    }

    static getCookie(name) {
        const cookieObject = JSON.parse(localStorage.getItem(name));
        if (!cookieObject) return null;

        const currentTime = new Date().getTime();
        if (currentTime > cookieObject.expires) {
            CookieManager.removeCookie(name);
            return null;
        }
        return cookieObject.value;
    }

    static removeCookie(name) {
        localStorage.removeItem(name);
    }

    static getTimeToExpire(name) {
        const cookieObject = JSON.parse(localStorage.getItem(name));
        if (!cookieObject) return 0;

        const expiresDate = cookieObject.expires;
        const currentTime = new Date().getTime();
        return (expiresDate - currentTime) / 60000; // retorna o tempo em minutos
    }
}
