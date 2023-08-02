import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="page-not-found">
      <h1 className="page-not-found__header">404</h1>
      <h2 className="page-not-found__sub-header">Страница не найдена</h2>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="page-not-found__action"
      >
        Назад
      </button>
    </main>
  );
}

export default NotFound;
