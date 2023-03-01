import { MAIN_API_URL } from "./consts";

class MainApi {

    constructor(url) {
        this._url = url;
        this._headers = {
            'Content-Type': 'application/json',
        };
    };

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}:${res.statusText}`); 
        }
        return res.json();
    };

    getUserInfo() {
        return fetch(this._url + '/users/me', {
            method: 'GET',
            headers: this._headers,
            credentials: "include",
        })
        .then((res) => this._getResponseData(res))
    };

    setUserInfo(data) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify(data),
        })
        .then((res) => this._getResponseData(res))
    };

    register(data) {
        return fetch(this._url + '/signup', {
            method: 'POST',
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify(data),
        })
        .then((res) => this._getResponseData(res))
    };

    auth(data) {
        return fetch(this._url + '/signin', {
            method: 'POST',
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify(data),
        })
        .then((res) => this._getResponseData(res))
    };

    signOut() {
        return fetch(this._url + '/signout', {
            method: 'POST',
            headers: this._headers,
            credentials: "include",
        })
        .then((res) => this._getResponseData(res))
    };

};

export default new MainApi(MAIN_API_URL);
