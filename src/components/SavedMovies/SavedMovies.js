import './SavedMovies.css';
import Movies from '../Movies/Movies';

function SavedMovies({ savedMovies }) {
  return (
    <Movies movies={savedMovies} savedMovies={savedMovies} isOnSavedPage />
  );
}

export default SavedMovies;
