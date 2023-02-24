import { MOVIES_API_URL } from "./consts";

class MoviesApi {

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

    getMovies() {
        return fetch(this._url + '/beatfilm-movies', {
            method: 'GET',
            headers: this._headers,
        })
        .then((res) => this._getResponseData(res))
    };    

};

export default new MoviesApi(MOVIES_API_URL);
