import { STORAGE_KEYS, URLS } from './constants';
import createPromise from './utils';

class MainApi {
  constructor(
    { baseUrl, headers },
    {
      userUrl, moviesUrl, registerUrl, loginUrl,
    },
  ) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    this._userUrl = userUrl;
    this._moviesUrl = moviesUrl;
    this._registerUrl = registerUrl;
    this._loginUrl = loginUrl;
  }

  getUser(token) {
    return createPromise(`${this._baseUrl}${this._userUrl}`, {
      ...this._headers,
      Authorization: token,
    });
  }

  editUser(name, email) {
    return createPromise(
      `${this._baseUrl}${this._userUrl}`,
      {
        ...this._headers,
        Authorization: localStorage.getItem(STORAGE_KEYS.TOKEN),
      },
      'PATCH',
      {
        name,
        email,
      },
    );
  }

  getSavedMovies() {
    return createPromise(`${this._baseUrl}${this._moviesUrl}`, {
      ...this._headers,
      Authorization: localStorage.getItem(STORAGE_KEYS.TOKEN),
    });
  }

  saveMovie(movie) {
    return createPromise(
      `${this._baseUrl}${this._moviesUrl}`,
      {
        ...this._headers,
        Authorization: localStorage.getItem(STORAGE_KEYS.TOKEN),
      },
      'POST',
      movie,
    );
  }

  deleteMovie(id) {
    return createPromise(
      `${this._baseUrl}${this._moviesUrl}/${id}`,
      {
        ...this._headers,
        Authorization: localStorage.getItem(STORAGE_KEYS.TOKEN),
      },
      'DELETE',
    );
  }

  register(name, email, password) {
    return createPromise(
      `${this._baseUrl}${this._registerUrl}`,
      this._headers,
      'POST',
      {
        name,
        email,
        password,
      },
    );
  }

  login(email, password) {
    return createPromise(
      `${this._baseUrl}${this._loginUrl}`,
      this._headers,
      'POST',
      {
        email,
        password,
      },
    );
  }
}

const mainApi = new MainApi(
  {
    baseUrl: URLS.MAIN.BASE,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  {
    userUrl: URLS.MAIN.USER,
    moviesUrl: URLS.MAIN.MOVIES,
    registerUrl: URLS.MAIN.REGISTER,
    loginUrl: URLS.MAIN.LOGIN,
  },
);

export default mainApi;
