import { useEffect, useRef } from 'react';
import './Form.css';
import FormInput from '../FormInput/FormInput';
import FormValidator from '../../utils/FormValidator';
import { FORM_OPTIONS } from '../../utils/constants';

function Form({
  inputs,
  modifier,
  onSubmit,
  buttonText,
  isSeparatorEnabled,
  isButtonDisabled,
  isButtonHidden,
  children,
  message,
  setMessage,
}) {
  const formElementRef = useRef(undefined);

  useEffect(
    () => {
      new FormValidator(
        FORM_OPTIONS,
        formElementRef.current,
      ).enableValidation();
      if (setMessage) {
        setMessage('');
      }
    },
    [],
  );

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(
      inputs
        .map((input) => input.name)
        .reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: formElementRef.current[cur].value,
          }),
          {},
        ),
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form${modifier ? ` form_${modifier}` : ''}`}
      ref={formElementRef}
    >
      {inputs
        .map((input) => (
          <FormInput
            key={input.id}
            id={input.id}
            modifier={modifier}
            name={input.name}
            type={input.type}
            readOnly={input.readOnly}
            placeholder={input.placeholder}
            ariaLabel={input.ariaLabel}
            autoComplete={input.autoComplete}
            value={input.value}
            onValueChange={input.onValueChange}
            additionalProps={input.additionalProps}
          />
        ))
        .reduce((prev, curr, currIndex) => {
          const key = `sep-${currIndex}`;
          return [
            prev,
            isSeparatorEnabled ? (
              <hr className="form__separator" key={key} />
            ) : undefined,
            curr,
          ];
        })}
      <p className="form__message">{message}</p>
      <button
        className={`form__submit-button${
          isButtonHidden ? ' form__submit-button_hidden' : ''
        }${isButtonDisabled ? ' form__submit-button_inactive' : ''}`}
        type="submit"
        disabled={isButtonDisabled}
      >
        {buttonText}
      </button>
      {children}
    </form>
  );
}

export default Form;
