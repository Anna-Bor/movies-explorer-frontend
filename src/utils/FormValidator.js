class FormValidator {
  constructor(options, element) {
    this._options = options;
    this._element = element;
    this._inputList = Array.from(
      element.querySelectorAll(options.INPUT_SELECTOR),
    );
    this._buttonElement = element.querySelector(options.SUBMIT_BUTTON_SELECTOR);
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._options.INPUT_ERROR_CLASS);
    const errorElement = this._element.querySelector(
      `.${inputElement.id}-error`,
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._options.ERROR_CLASS);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._options.INPUT_ERROR_CLASS);
    const errorElement = this._element.querySelector(
      `.${inputElement.id}-error`,
    );
    errorElement.classList.remove(this._options.ERROR_CLASS);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._options.INACTIVE_BUTTON_CLASS);
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(this._options.INACTIVE_BUTTON_CLASS);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._element.addEventListener('reset', () => {
      setTimeout(() => this._toggleButtonState(), 0);
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
