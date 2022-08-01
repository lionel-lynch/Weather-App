export default class TokenStorage { // через данный класс ведём работу с данными о токенах в local storage
    static setAccessToken(access) {
        localStorage.setItem('accessToken', access);
    }

    static setRefreshToken(refresh) {
        localStorage.setItem('refreshToken', refresh);
    }

    static getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    static getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    static removeAccessToken() {
        localStorage.removeItem('accessToken');
    }

    static removeRefreshToken() {
        localStorage.removeItem('refreshToken');
    }
}