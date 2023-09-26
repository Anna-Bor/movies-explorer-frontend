import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Movies from '../Movies/Movies';
import { searchMovie } from '../../utils/utils';

function SavedMovies({
  savedMovies,
  onLike,
  onDelete,
}) {
  const [savedSearch, setSavedSearch] = useState('');
  const [isSavedShort, setIsSavedShort] = useState(false);
  const [savedSearchResult, setSavedSearchResult] = useState(savedMovies);

  useEffect(() => {
    setSavedSearchResult(searchMovie(savedMovies, savedSearch, isSavedShort));
  }, [savedMovies, savedSearch, isSavedShort]);

  return (
    <Movies
      movies={savedSearchResult}
      savedMovies={savedSearchResult}
      isOnSavedPage
      onLike={onLike}
      onDelete={onDelete}
      search={savedSearch}
      onSearchChange={setSavedSearch}
      isShort={isSavedShort}
      onIsShortChange={() => setIsSavedShort((prevState) => !prevState)}
    />
  );
}

export default SavedMovies;
