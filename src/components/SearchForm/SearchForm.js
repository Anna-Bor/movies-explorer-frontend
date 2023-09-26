import './SearchForm.css';
import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Search from '../../images/search.svg';

function SearchForm({
  search, onSearchChange, isShort, onIsShortChange, isOnSavedPage,
}) {
  const [searchValue, setSearchValue] = useState(search);

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={(event) => {
          event.preventDefault();
          onSearchChange(searchValue);
        }}
      >
        <div className="search__main-holder">
          <div className="search__input-holder">
            <img src={Search} alt="Лупа" className="search__input-icon" />
            <label htmlFor="search" className="search__label">
              <input
                id="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="search__input"
                placeholder="Фильм"
              />
            </label>
          </div>
          <button
            type="submit"
            className={`search__submit${!isOnSavedPage && searchValue.length === 0 ? ' search__submit_inactive' : ''}`}
            disabled={!isOnSavedPage && searchValue.length === 0}
          >
            Найти
          </button>
        </div>
        <div className="search__separator" />
        <FilterCheckbox
          value={isShort}
          onValueChange={onIsShortChange}
          title="Короткометражки"
        />
      </form>
      <div className="search__section-separator" />
    </section>
  );
}

export default SearchForm;
