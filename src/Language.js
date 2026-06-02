import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      "home": "Home",
      "sale": "Sale",
      "rent": "Rent",
      "news": "News",
      "contact": "Contact Us",
      "signup": "Sign Up",
      "login": "Login",
      // Login & SignUp Page
      "username": "Username",
      "password": "Password",
      "email": "Email",
      "confirm_password": "Confirm Password",
      "create_account": "Create New Account",
      "login_now": "Login Now",
      "forgot_password": "Forgot Password?",
      "have_account": "Already have an account?",
      "no_account": "Don't have an account?",
      "welcome_title": "Find Your Dream Home",
      "welcome_subtitle": "Manage your buying, selling, and renting with ease."
    }
  },
  kh: {
    translation: {
      // Header
      "home": "ទំព័រដើម",
      "sale": "លក់",
      "rent": "ជួល",
      "news": "ព័ត៌មាន",
      "contact": "ទាក់ទងយើង",
      "signup": "ចុះឈ្មោះ",
      "login": "ចូលប្រើ",
      // Login & SignUp Page
      "username": "ឈ្មោះអ្នកប្រើប្រាស់",
      "password": "លេខសម្ងាត់",
      "email": "អ៊ីមែល",
      "confirm_password": "បញ្ជាក់លេខសម្ងាត់",
      "create_account": "បង្កើតគណនីថ្មី",
      "login_now": "ចូលប្រើប្រាស់ឥឡូវនេះ",
      "forgot_password": "ភ្លេចលេខសម្ងាត់?",
      "have_account": "មានគណនីរួចហើយមែនទេ?",
      "no_account": "មិនទាន់មានគណនីមែនទេ?",
      "welcome_title": "ស្វែងរកផ្ទះក្នុងក្តីសុបិន",
      "welcome_subtitle": "គ្រប់គ្រងការទិញ លក់ និងជួលផ្ទះរបស់អ្នកដោយភាពងាយស្រួល។"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // បើរកភាសាមិនឃើញ វានឹងប្រើអង់គ្លេស
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;