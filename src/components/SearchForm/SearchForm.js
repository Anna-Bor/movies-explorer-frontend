import './SearchForm.css';
import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Search from '../../images/search.svg';

function SearchForm() {
  const [isShort, setIsShort] = useState(true);

  return (
    <section className="search">
      <form className="search__form">
        <div className="search__main-holder">
          <div className="search__input-holder">
            <img src={Search} alt="Лупа" className="search__input-icon" />
            <label htmlFor="search" className="search__label">
              <input
                id="search"
                className="search__input"
                placeholder="Фильм"
              />
            </label>
          </div>
          <button type="submit" className="search__submit">
            Найти
          </button>
        </div>
        <div className="search__separator" />
        <FilterCheckbox
          value={isShort}
          onValueChange={() => setIsShort(!isShort)}
          title="Короткометражки"
        />
      </form>
      <div className="search__section-separator" />
    </section>
  );
}

export default SearchForm;
