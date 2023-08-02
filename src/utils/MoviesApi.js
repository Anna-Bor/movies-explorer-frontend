import { URLS } from './constants';

class MoviesApi {
  constructor({ baseUrl, headers }, { moviesUrl }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._moviesUrl = moviesUrl;
  }

  getMovies() {
    return fetch(this._baseUrl + this._moviesUrl, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }
}

const moviesApi = new MoviesApi(
  {
    baseUrl: URLS.BEATFILM.BASE,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  { moviesUrl: URLS.BEATFILM.MOVIES },
);

export default moviesApi;
