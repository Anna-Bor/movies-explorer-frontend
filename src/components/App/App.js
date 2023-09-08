import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../../utils/constants';
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

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem(STORAGE_KEYS.TOKEN),
  );
  const [currentUser, setCurrentUser] = useState(undefined);
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.MOVIES)) ?? [],
  );
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
  const [savedSearch, setSavedSearch] = useState(
    localStorage.getItem(STORAGE_KEYS.SAVED_SEARCH) ?? '',
  );
  const [isSavedShort, setIsSavedShort] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_IS_SHORT)) ?? false,
  );
  const [savedSearchResult, setSavedSearchResult] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_SEARCH_RESULT)) ?? [],
  );

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
    if (isLoggedIn) {
      if (movies.length === 0) {
        moviesApi
          .getMovies()
          .then((movieCollection) => {
            localStorage.setItem(
              STORAGE_KEYS.MOVIES,
              JSON.stringify(movieCollection),
            );
            setMovies(movieCollection);
          })
          .catch((reason) => window.console.log(reason));
      }

      if (savedMovies.length === 0) {
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
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const result = movies.filter(
      (movie) => (movie.nameRU.includes(search) || movie.nameEN.includes(search))
        && (isShort ? movie.duration <= 40 : true),
    );
    setSearchResult(result);
    localStorage.setItem(STORAGE_KEYS.SEARCH_RESULT, JSON.stringify(result));
  }, [movies, search, isShort]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEARCH, search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_SHORT, JSON.stringify(isShort));
  }, [isShort]);

  useEffect(() => {
    const result = savedMovies.filter(
      (movie) => (movie.nameRU.includes(savedSearch)
          || movie.nameEN.includes(savedSearch))
        && (isSavedShort ? movie.duration <= 40 : true),
    );
    setSavedSearchResult(result);
    localStorage.setItem(
      STORAGE_KEYS.SAVED_SEARCH_RESULT,
      JSON.stringify(result),
    );
  }, [savedMovies, savedSearch, isSavedShort]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_SEARCH, savedSearch);
  }, [savedSearch]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SAVED_IS_SHORT,
      JSON.stringify(isSavedShort),
    );
  }, [isSavedShort]);

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
      .finally(() => setIsLoading(false));
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
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
              <Login onSubmit={login} isLoading={isLoading} />
            </main>
          )}
        />
        <Route
          path="signup"
          element={(
            <main>
              <Register onSubmit={register} isLoading={isLoading} />
            </main>
          )}
        />
        <Route
          path="movies"
          element={(
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
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
              savedMovies={savedSearchResult}
              onLike={likeMovie}
              onDelete={deleteMovie}
              search={savedSearch}
              onSearchChange={(value) => setSavedSearch(value)}
              isShort={isSavedShort}
              onIsShortChange={() => setIsSavedShort((prevState) => !prevState)}
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
            />
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
