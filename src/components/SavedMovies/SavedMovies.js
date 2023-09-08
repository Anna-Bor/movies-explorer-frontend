import './SavedMovies.css';
import Movies from '../Movies/Movies';

function SavedMovies({
  savedMovies,
  onLike,
  onDelete,
  search,
  onSearchChange,
  isShort,
  onIsShortChange,
}) {
  return (
    <Movies
      movies={savedMovies}
      savedMovies={savedMovies}
      isOnSavedPage
      onLike={onLike}
      onDelete={onDelete}
      search={search}
      onSearchChange={onSearchChange}
      isShort={isShort}
      onIsShortChange={onIsShortChange}
    />
  );
}

export default SavedMovies;
