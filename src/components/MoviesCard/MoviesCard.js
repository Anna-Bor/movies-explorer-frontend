import './MoviesCard.css';
import Save from '../../images/save.svg';
import Saved from '../../images/saved.svg';
import Delete from '../../images/delete.svg';
import { URLS } from '../../utils/constants';

function MoviesCard({
  movie, isSaved, isOnSavedPage, onLike, onDelete,
}) {
  const like = (e) => {
    e.preventDefault();
    onLike({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${URLS.BEATFILM.BASE}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${URLS.BEATFILM.BASE}${URLS.BEATFILM.MOVIES}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    });
  };

  const unlike = (e) => {
    e.preventDefault();
    onDelete(movie.id || movie.movieId);
  };

  return (
    <li className="movies-card">
      <a
        className="movies-card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={
            movie.image.url ? URLS.BEATFILM.BASE + movie.image.url : movie.image
          }
          alt={movie.nameRU || movie.nameEN}
          className="movies-card__image"
        />
        <div className="movies-card__info">
          <h2 className="movies-card__name">{movie.nameRU || movie.nameEN}</h2>
          {isSaved && (
            <button
              className="movies-card__action"
              type="button"
              onClick={unlike}
            >
              <img src={isOnSavedPage ? Delete : Saved} alt="Удалить" />
            </button>
          )}
          {!isSaved && (
            <button
              className="movies-card__action"
              type="button"
              onClick={like}
            >
              <img src={Save} alt="Сохранить" />
            </button>
          )}
        </div>
        <p className="movies-card__duration">
          {`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}
        </p>
      </a>
    </li>
  );
}

export default MoviesCard;
