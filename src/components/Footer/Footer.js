import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__info-holder">
        <p className="footer__copyright">©2023</p>
        <ul className="footer__list">
          <li>
            <a
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Anna-Bor"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
