import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../../images/logo.svg';

function Header({ isSignedIn }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={Logo} alt="Логотип" />
      </Link>
      {isSignedIn ? (
        <nav className="header__navigation">
          <div
            className={`header__navigation-backdrop${
              isMenuOpened ? ' header__navigation-backdrop_active' : ''
            }`}
          />
          <div
            className={`header__navigation-list-holder${
              isMenuOpened ? ' header__navigation-list-holder_opened' : ''
            }`}
          >
            <button
              type="button"
              className="header__menu-button-close"
              aria-label="Закрыть меню"
              onClick={() => setIsMenuOpened(false)}
            />
            <ul className="header__navigation-list">
              <li className="header__navigation-list-item header__navigation-list-item_first">
                <NavLink
                  className={({ isActive }) => `header__navigation-link${
                    isActive ? ' header__navigation-link_active' : ''
                  }`}
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
              <li className="header__navigation-list-item">
                <NavLink
                  className={({ isActive }) => `header__navigation-link${
                    isActive ? ' header__navigation-link_active' : ''
                  }`}
                  to="/movies"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="header__navigation-list-item">
                <NavLink
                  className={({ isActive }) => `header__navigation-link${
                    isActive ? ' header__navigation-link_active' : ''
                  }`}
                  to="/saved-movies"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li className="header__navigation-list-item header__navigation-list-item_last">
                <Link
                  className="header__navigation-link header__navigation-link_with-image"
                  to="/profile"
                >
                  <span>Аккаунт</span>
                  <span className="header__profile-logo" />
                </Link>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="header__menu-button"
            aria-label="Открыть меню"
            onClick={() => setIsMenuOpened(true)}
          />
        </nav>
      ) : (
        <nav className="header__actions-holder">
          <ul className="header__actions-list">
            <li>
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to="/signin" className="header__link header__link_accent">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
