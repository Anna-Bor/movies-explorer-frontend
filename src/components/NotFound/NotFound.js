import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <main>
      <section className="page-not-found">
        <h1 className="page-not-found__header">404</h1>
        <h2 className="page-not-found__sub-header">Страница не найдена</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="page-not-found__action"
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;
