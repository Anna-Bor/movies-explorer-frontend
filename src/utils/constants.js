export const DEVICES = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
};

export const WINDOW_MIN_WIDTH = {
  MOBILE: 0,
  TABLET: 768,
  DESKTOP: 1280,
};

export const DEFAULT_GRID_ELEMENTS_AMOUNT = {
  MOBILE: 5,
  TABLET: 8,
  DESKTOP: 16,
};

export const DEFAULT_GRID_ELEMENTS_STEP = {
  MOBILE: 2,
  TABLET: 2,
  DESKTOP: 4,
};

export const SHORT_MOVIE_MAX_DURATION = 40;

export const URLS = {
  BEATFILM: {
    BASE: 'https://api.nomoreparties.co',
    MOVIES: '/beatfilm-movies',
  },
  MAIN: {
    BASE: 'https://api.diploma.annabor.nomoredomains.xyz',
    USER: '/users/me',
    MOVIES: '/movies',
    REGISTER: '/signup',
    LOGIN: '/signin',
  },
};

export const FORM_OPTIONS = {
  INPUT_SELECTOR: '.form__field',
  SUBMIT_BUTTON_SELECTOR: '.form__submit-button',
  INPUT_ERROR_CLASS: 'form__field_invalid',
  ERROR_CLASS: 'popup__field-error_active',
  INACTIVE_BUTTON_CLASS: 'form__submit-button_inactive',
  LOADING_TEXT: 'Загрузка...',
};

export const STORAGE_KEYS = {
  TOKEN: 'MOVIES_EXPLORER_TOKEN',
  MOVIES: 'MOVIES_EXPLORER_COLLECTION',
  SAVED_MOVIES: 'MOVIES_EXPLORER_SAVED_COLLECTION',
  SEARCH: 'MOVIES_EXPLORER_SEARCH',
  IS_SHORT: 'MOVIES_EXPLORER_IS_SHORT',
  SEARCH_RESULT: 'MOVIES_EXPLORER_SEARCH_RESULT',
};

export const MESSAGES = {
  PROFILE_UPDATED: 'Профиль успешно обновлен',
  NOT_FOUND: 'Ничего не найдено',
};
