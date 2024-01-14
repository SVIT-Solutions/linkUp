import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translations: {
      home: 'Home',
      login: 'Login',
      singup: 'Sing Up',
      account: 'Account',
      settings: 'Settings',
      logout: 'Logout',
      dont_have_an_account: "Don't have an account",
      already_have_an_account: 'Already have an account',
      email: 'Email',
      username: 'Username',
      password: 'Password',
      confirm_password: 'Confirm Password',
      failed_to_login: 'Failed to login',
      this_field_is_required: 'This field is required',
    },
  },
  uk: {
    translations: {
      home: 'Головна',
      login: 'Увійти',
      account: 'Обліковий запис',
      singup: 'Зареєструватися',
      settings: 'Налаштування',
      logout: 'Вийти',
      dont_have_an_account: 'Немає облікового запису',
      already_have_an_account: 'Вже є аккаунт',
      email: 'Електронна пошта',
      username: "Ім'я користувача",
      password: 'Пароль',
      confirm_password: 'Підтвердьте пароль',
      failed_to_login: 'Не вдалося увійти',
      this_field_is_required: "Це поле є обов'язковим",
    },
  },
};

export const languages = Object.keys(resources);

const i18nConfig: InitOptions = {
  resources,
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    formatSeparator: ',',
  },
  react: {
    useSuspense: false,
  },
};

i18n.use(LanguageDetector).init(i18nConfig);

export default i18n;
