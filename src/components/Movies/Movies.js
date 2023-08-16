import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, savedMovies, isOnSavedPage }) {
  return (
    <>
      <Header isSignedIn />
      <main className="movies">
        <SearchForm />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          isOnSavedPage={isOnSavedPage}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
