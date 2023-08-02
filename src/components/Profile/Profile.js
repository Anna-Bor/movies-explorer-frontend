import './Profile.css';
import { useState } from 'react';
import Header from '../Header/Header';
import { FORM_OPTIONS } from '../../utils/constants';
import Form from '../Form/Form';

function Profile({ onSubmit, isLoading, user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isButtonHidden, setIsButtonHidden] = useState(true);

  return (
    <>
      <Header isSignedIn />
      <main className="profile">
        <h1 className="profile__title">{`Привет, ${name}!`}</h1>
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
              readOnly: isButtonHidden,
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
              readOnly: isButtonHidden,
              additionalProps: {
                minLength: 2,
                maxLength: 40,
              },
            },
          ]}
          isSeparatorEnabled
          modifier="inline"
          onSubmit={onSubmit}
          type="login"
          buttonText={isLoading ? FORM_OPTIONS.LOADING_TEXT : 'Сохранить'}
          isButtonDisabled={isLoading}
          isButtonHidden={isButtonHidden}
        >
          {isButtonHidden && (
            <div className="profile__action-holder">
              <button
                type="button"
                className="profile__action"
                onClick={() => setIsButtonHidden(false)}
              >
                Редактировать
              </button>
              <button className="profile__action profile__action_accent" type="button">
                Выйти из аккаунта
              </button>
            </div>
          )}
        </Form>
      </main>
    </>
  );
}

export default Profile;
