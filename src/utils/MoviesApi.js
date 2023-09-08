import { URLS } from './constants';
import createPromise from './utils';

class MoviesApi {
  constructor({ baseUrl, headers }, { moviesUrl }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._moviesUrl = moviesUrl;
  }

  getMovies() {
    return createPromise(this._baseUrl + this._moviesUrl, this._headers);
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
