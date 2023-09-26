import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  DEFAULT_GRID_ELEMENTS_AMOUNT,
  DEFAULT_GRID_ELEMENTS_STEP,
  DEVICES,
  MESSAGES,
  WINDOW_MIN_WIDTH,
} from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  movies,
  savedMovies,
  isOnSavedPage,
  onLike,
  onDelete,
  isLoading,
  search,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesAmount, setMoviesAmount] = useState(0);
  const [showedMoviesAmount, setShowedMoviesAmount] = useState(isOnSavedPage ? movies.length : 0);
  const [showStep, setShowStep] = useState(0);

  const handleWindowWidthChange = (size) => {
    if (
      DEFAULT_GRID_ELEMENTS_AMOUNT[size]
      && DEFAULT_GRID_ELEMENTS_STEP[size]
    ) {
      setShowedMoviesAmount(
        (prevState) => Math.max(DEFAULT_GRID_ELEMENTS_AMOUNT[size], isOnSavedPage ? prevState : 0),
      );

      setShowStep(DEFAULT_GRID_ELEMENTS_STEP[size]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMoviesAmount(movies.length);
  }, [movies]);

  useEffect(() => {
    if (windowWidth < WINDOW_MIN_WIDTH.TABLET) {
      handleWindowWidthChange(DEVICES.MOBILE);
    } else if (windowWidth < WINDOW_MIN_WIDTH.DESKTOP) {
      handleWindowWidthChange(DEVICES.TABLET);
    } else {
      handleWindowWidthChange(DEVICES.DESKTOP);
    }
  }, [windowWidth]);

  return (
    <section className="movies-list">
      {isLoading && <Preloader />}
      {!isLoading
        && !isOnSavedPage
        && search.length !== 0
        && movies.length === 0
        && (<p>{MESSAGES.NOT_FOUND}</p>)}
      {!isLoading && (
      <ul className="movies-list__holder">
        {movies.slice(0, showedMoviesAmount)
          .map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              isOnSavedPage={isOnSavedPage}
              movie={movie}
              isSaved={savedMovies
                ?.map((savedMovie) => savedMovie.movieId)
                ?.includes(movie.id || movie.movieId)}
              onLike={onLike}
              onDelete={onDelete}
            />
          ))}
      </ul>
      )}
      {!isLoading && moviesAmount > showedMoviesAmount && (
        <button
          type="button"
          className="movies-list__action"
          onClick={() => setShowedMoviesAmount((prevState) => prevState + showStep)}
        >
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
