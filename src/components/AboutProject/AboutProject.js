import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about">
      <h2 className="about__title">О проекте</h2>
      <ul className="about__description-holder">
        <li className="about__description">
          <h3 className="about__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__description-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about__description">
          <h3 className="about__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__description-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about__duration-holder">
        <p className="about__duration about__duration_accent">1 неделя</p>
        <p className="about__duration">4 недели</p>
        <p className="about__duration-description">Back-end</p>
        <p className="about__duration-description">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
