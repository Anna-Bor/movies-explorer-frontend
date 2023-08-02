import StudentPicture from '../../images/student.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__description">
        <div className="student__description-text">
          <h3 className="student__name">Виталий</h3>
          <h4 className="student__caption">Фронтенд-разработчик, 30 лет</h4>
          <p className="student__about-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="student__link"
            href="https://github.com/Anna-Bor"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img
          className="student__picture"
          alt="Фотография студента"
          src={StudentPicture}
        />
      </div>
    </section>
  );
}

export default AboutMe;
