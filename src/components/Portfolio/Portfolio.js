import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/Anna-Bor/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <span className="portfolio__link-text">Статичный сайт</span>
            <span className="portfolio__link-decorator">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/Anna-Bor/mesto"
            target="_blank"
            rel="noreferrer"
          >
            <span className="portfolio__link-text">Адаптивный сайт</span>
            <span className="portfolio__link-decorator">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item portfolio__list-item_last">
          <a
            className="portfolio__link"
            href="https://github.com/Anna-Bor/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >
            <span className="portfolio__link-text">
              Одностраничное приложение
            </span>
            <span className="portfolio__link-decorator">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
