import './MoviesCard.css';
import Save from '../../images/save.svg';
import Saved from '../../images/saved.svg';
import Delete from '../../images/delete.svg';
import { URLS } from '../../utils/constants';

function MoviesCard({
  image, name, duration, isSaved, isOnSavedPage,
}) {
  return (
    <li className="movies-card">
      <img
        src={URLS.BEATFILM.BASE + image}
        alt={name}
        className="movies-card__image"
      />
      <div className="movies-card__info">
        <h2 className="movies-card__name">{name}</h2>
        {isSaved && (
          <button className="movies-card__action" type="button">
            <img src={isOnSavedPage ? Delete : Saved} alt="Удалить" />
          </button>
        )}
        {!isSaved && (
          <button className="movies-card__action" type="button">
            <img src={Save} alt="Сохранить" />
          </button>
        )}
      </div>
      <p className="movies-card__duration">
        {`${Math.floor(duration / 60)}ч ${duration % 60}м`}
      </p>
    </li>
  );
}

export default MoviesCard;
