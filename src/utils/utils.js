import { SHORT_MOVIE_MAX_DURATION } from './constants';

export const createPromise = (url, headers, method = 'GET', body = null) => fetch(url, {
  method,
  headers,
  body: body && JSON.stringify(body),
}).then((response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(
    new Error(
      `Ошибка при ${method}-запросе ${url}: ${response.status}.${
        (body && ` Тело запроса: ${JSON.stringify(body)}`) ?? ''
      }`,
    ),
  );
});

export const searchMovie = (movies, search, isShort) => movies.filter(
  (movie) => (movie.nameRU.toLowerCase().includes(search.toLowerCase())
      || movie.nameEN.toLowerCase().includes(search.toLowerCase()))
    && (isShort ? movie.duration <= SHORT_MOVIE_MAX_DURATION : true),
);
