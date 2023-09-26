import { useEffect, useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import Form from '../Form/Form';
import { FORM_OPTIONS } from '../../utils/constants';

function Login({ isLoggedIn, onSubmit, isLoading }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, []);
  return (
    <section className="login">
      <NavLink to="/" className="login__logo">
        <img src={Logo} alt="Логотип" />
      </NavLink>
      <h1 className="login__header">Рады видеть!</h1>
      <Form
        inputs={[
          {
            id: 'email-input',
            name: 'email',
            type: 'email',
            placeholder: 'E-mail',
            ariaLabel: 'Поле введения электронной почты',
            autoComplete: 'email',
            value: email,
            onValueChange: setEmail,
            additionalProps: {
              minLength: 2,
              maxLength: 40,
            },
          },
          {
            id: 'password-input',
            name: 'password',
            type: 'password',
            placeholder: 'Пароль',
            ariaLabel: 'Поле введения пароля',
            autoComplete: 'current-password',
            value: password,
            onValueChange: setPassword,
            additionalProps: {
              minLength: 2,
              maxLength: 12,
            },
          },
        ]}
        onSubmit={onSubmit}
        buttonText={isLoading ? FORM_OPTIONS.LOADING_TEXT : 'Войти'}
        isButtonDisabled={isLoading}
      />
      <div className="login__redirect">
        <p className="login__redirect-text">Ещё не зарегистрированы?</p>
        <NavLink className="login__redirect-link" to="/signup">
          Регистрация
        </NavLink>
      </div>
    </section>
  );
}

export default Login;
