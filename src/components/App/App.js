import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MESSAGES, SHORT_MOVIE_MAX_DURATION, STORAGE_KEYS } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { searchMovie } from '../../utils/utils';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem(STORAGE_KEYS.TOKEN),
  );
  const [currentUser, setCurrentUser] = useState(undefined);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_MOVIES)) ?? [],
  );
  const [search, setSearch] = useState(
    localStorage.getItem(STORAGE_KEYS.SEARCH) ?? '',
  );
  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.IS_SHORT)) ?? false,
  );
  const [searchResult, setSearchResult] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.SEARCH_RESULT)) ?? [],
  );
  const [formMessage, setFormMessage] = useState('');
  const [isMovieLoading, setIsMovieLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      mainApi
        .getUser(token)
        .then((authUser) => {
          if (authUser) {
            setCurrentUser(authUser);
            setIsLoggedIn(true);
          }
        })
        .catch((reason) => {
          window.console.log(reason);
          setCurrentUser(undefined);
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && savedMovies.length === 0) {
      mainApi
        .getSavedMovies()
        .then((savedMovieCollection) => {
          localStorage.setItem(
            STORAGE_KEYS.SAVED_MOVIES,
            JSON.stringify(savedMovieCollection),
          );
          setSavedMovies(savedMovieCollection);
        })
        .catch((reason) => window.console.log(reason));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const result = searchMovie(movies, search, isShort);
      setSearchResult(result);
      localStorage.setItem(STORAGE_KEYS.SEARCH_RESULT, JSON.stringify(result));
    }
  }, [movies, search, isShort]);

  useEffect(() => {
    if (search && movies.length === 0) {
      if (isLoggedIn) {
        setIsMovieLoading(true);
        const moviesFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEYS.MOVIES)) ?? [];
        if (moviesFromStorage.length !== 0) {
          setMovies(moviesFromStorage);
          const result = moviesFromStorage.filter(
            (movie) => (movie.nameRU.includes(search) || movie.nameEN.includes(search))
                && (isShort ? movie.duration <= SHORT_MOVIE_MAX_DURATION : true),
          );
          setSearchResult(result);
          localStorage.setItem(STORAGE_KEYS.SEARCH_RESULT, JSON.stringify(result));
          setIsMovieLoading(false);
          return;
        }
        moviesApi
          .getMovies()
          .then((movieCollection) => {
            localStorage.setItem(
              STORAGE_KEYS.MOVIES,
              JSON.stringify(movieCollection),
            );
            setMovies(movieCollection);
            const result = movieCollection.filter(
              (movie) => (movie.nameRU.includes(search) || movie.nameEN.includes(search))
                  && (isShort ? movie.duration <= SHORT_MOVIE_MAX_DURATION : true),
            );
            setSearchResult(result);
            localStorage.setItem(STORAGE_KEYS.SEARCH_RESULT, JSON.stringify(result));
          })
          .catch((reason) => window.console.log(reason))
          .finally(() => setIsMovieLoading(false));
      }
    }
  }, [search, isShort]);

  useEffect(() => {
    if (search) {
      localStorage.setItem(STORAGE_KEYS.SEARCH, search);
    }
  }, [search]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_SHORT, JSON.stringify(isShort));
  }, [isShort]);

  const login = ({ email, password }) => {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((response) => {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
        return response.token;
      })
      .then((token) => mainApi.getUser(token))
      .then((authUser) => {
        if (authUser) {
          setCurrentUser(authUser);
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((reason) => window.console.log(reason))
      .finally(() => setIsLoading(false));
  };

  const register = ({ name, email, password }) => {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((authUser) => Promise.all([mainApi.login(email, password), Promise.resolve(authUser)]))
      .then(([loginResponse, authUser]) => {
        if (loginResponse.token) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, loginResponse.token);
          setCurrentUser(authUser);
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((reason) => window.console.log(reason))
      .finally(() => setIsLoading(false));
  };

  const changeProfileInfo = ({ name, email }) => {
    setIsLoading(true);
    mainApi
      .editUser(name, email)
      .then(() => setCurrentUser((prev) => ({ ...prev, name, email })))
      .catch((reason) => window.console.log(reason))
      .finally(() => {
        setIsLoading(false);
        setFormMessage(MESSAGES.PROFILE_UPDATED);
      });
  };

  const logout = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    setCurrentUser(undefined);
    setIsLoggedIn(false);
    navigate('/');
  };

  const likeMovie = (movie) => {
    setIsLoading(true);
    mainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies((prev) => [...prev, savedMovie]);
        localStorage.setItem(
          STORAGE_KEYS.SAVED_MOVIES,
          JSON.stringify(savedMovies),
        );
      })
      .catch((reason) => window.console.log(reason))
      .finally(() => setIsLoading(false));
  };

  const deleteMovie = (id) => {
    const movieId = savedMovies.find((movie) => movie.movieId === id)?._id;
    if (movieId) {
      setIsLoading(true);
      mainApi
        .deleteMovie(movieId)
        .then(() => {
          setSavedMovies((prev) => prev.filter((movie) => movie.movieId !== id));
          localStorage.setItem(
            STORAGE_KEYS.SAVED_MOVIES,
            JSON.stringify(savedMovies),
          );
        })
        .catch((reason) => window.console.log(reason))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="signin"
          element={(
            <main>
              <Login isLoggedIn={isLoggedIn} onSubmit={login} isLoading={isLoading} />
            </main>
          )}
        />
        <Route
          path="signup"
          element={(
            <main>
              <Register isLoggedIn={isLoggedIn} onSubmit={register} isLoading={isLoading} />
            </main>
          )}
        />
        <Route
          path="movies"
          element={(
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isLoading={isMovieLoading}
              element={Movies}
              movies={searchResult}
              savedMovies={savedMovies}
              isOnSavedPage={false}
              onLike={likeMovie}
              onDelete={deleteMovie}
              search={search}
              onSearchChange={(value) => setSearch(value)}
              isShort={isShort}
              onIsShortChange={() => setIsShort((prevState) => !prevState)}
            />
          )}
        />
        <Route
          path="saved-movies"
          element={(
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={SavedMovies}
              savedMovies={savedMovies}
              onLike={likeMovie}
              onDelete={deleteMovie}
            />
          )}
        />
        <Route
          path="profile"
          element={(
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={Profile}
              onSubmit={changeProfileInfo}
              onLogout={logout}
              isLoading={isLoading}
              message={formMessage}
              setMessage={setFormMessage}
            />
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
