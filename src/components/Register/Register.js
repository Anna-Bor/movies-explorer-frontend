import { useState } from 'react';
import './Register.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import Form from '../Form/Form';
import { FORM_OPTIONS } from '../../utils/constants';

function Register({ onSubmit, isLoading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <section className="register">
      <NavLink to="/" className="register__logo">
        <img src={Logo} alt="Логотип" />
      </NavLink>
      <h1 className="register__header">Добро пожаловать!</h1>
      <Form
        inputs={[
          {
            id: 'name-input',
            name: 'name',
            type: 'text',
            placeholder: 'Имя',
            ariaLabel: 'Поле введения имени',
            autoComplete: 'given-name',
            value: name,
            onValueChange: setName,
            additionalProps: {
              minLength: 2,
              maxLength: 30,
            },
          },
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
            autoComplete: 'new-password',
            value: password,
            onValueChange: setPassword,
            additionalProps: {
              minLength: 2,
              maxLength: 12,
            },
          },
        ]}
        onSubmit={onSubmit}
        buttonText={
          isLoading ? FORM_OPTIONS.LOADING_TEXT : 'Зарегистрироваться'
        }
        isButtonDisabled={isLoading}
      />
      <div className="register__redirect">
        <p className="register__redirect-text">Уже зарегистрированы?</p>
        <NavLink className="register__redirect-link" to="/signin">
          Войти
        </NavLink>
      </div>
    </section>
  );
}

export default Register;
