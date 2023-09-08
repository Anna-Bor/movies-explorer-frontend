import './Movies.css';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  movies,
  savedMovies,
  isOnSavedPage,
  onLike,
  onDelete,
  search,
  onSearchChange,
  isShort,
  onIsShortChange,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <Header isSignedIn={currentUser} />
      <main className="movies">
        <SearchForm
          search={search}
          onSearchChange={onSearchChange}
          isShort={isShort}
          onIsShortChange={onIsShortChange}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          isOnSavedPage={isOnSavedPage}
          onLike={onLike}
          onDelete={onDelete}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
