import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import { FORM_OPTIONS } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Form from '../Form/Form';

function Profile({
  onSubmit, isLoading, onLogout, message, setMessage,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [isButtonHidden, setIsButtonHidden] = useState(true);

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
  }, [currentUser]);

  return (
    <>
      <Header isSignedIn={currentUser} />
      <main>
        <section className="profile">
          <h1 className="profile__title">{`Привет, ${currentUser?.name}!`}</h1>
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
            isButtonDisabled={isLoading
              || (currentUser?.name === name && currentUser?.email === email)}
            isButtonHidden={isButtonHidden}
            message={message}
            setMessage={setMessage}
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
                <button
                  className="profile__action profile__action_accent"
                  type="button"
                  onClick={onLogout}
                >
                  Выйти из аккаунта
                </button>
              </div>
            )}
          </Form>
        </section>
      </main>
    </>
  );
}

export default Profile;
