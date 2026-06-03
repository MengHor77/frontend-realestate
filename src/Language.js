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
      "hero_title": "Find Your Dream Home",
      "hero_subtitle": "We provide the best real estate buy, sell, and rent services in Cambodia",
      "search_placeholder": "Search location or property type...",
      "all_types": "All Types",
      "search_btn": "Search",
      "our_services": "Our Main Services",
      "featured_projects": "Latest Projects",
      "curated_for_you": "Carefully selected for you",
      "view_all": "View All",
      "special_offer": "Special Offer",
      "new_listing": "New Listing",
      "hot_deal": "Hot Deal",
      "villa_title": "Modern Twin Villa Chroy Changvar",
      "shophouse_title": "Shophouse near Mall",
      "condo_title": "Modern Condo City Center",
      "phnom_penh": "Phnom Penh",
      "bed_count": "{{count}} Bedrooms",
      "bath_count": "{{count}} Bathrooms",
      "cta_title": "Want to sell or rent your property?",
      "cta_subtitle": "Our expert agents will help you get the best price quickly.",
      "consult_now": "Consult Now",
      "default_service_desc": "Explore many great options available.",
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
      "hero_title": "ស្វែងរកផ្ទះក្នុងក្តីសុបិនរបស់អ្នក",
      "hero_subtitle": "យើងផ្តល់ជូននូវសេវាកម្មទិញ លក់ និងជួលអចលនទ្រព្យដែលល្អបំផុតក្នុងប្រទេសកម្ពុជា",
      "search_placeholder": "ស្វែងរកទីតាំង ឬប្រភេទផ្ទះ...",
      "all_types": "គ្រប់ប្រភេទ",
      "search_btn": "ស្វែងរក",
      "our_services": "សេវាកម្មចម្បងរបស់យើង",
      "featured_projects": "គម្រោងថ្មីៗបំផុត",
      "curated_for_you": "ជ្រើសរើសដោយយកចិត្តទុកដាក់សម្រាប់អ្នក",
      "view_all": "មើលទាំងអស់",
      "special_offer": "ការផ្តល់ជូនពិសេស",
      "new_listing": "គម្រោងថ្មី",
      "hot_deal": "តម្លៃពិសេស",
      "villa_title": "វីឡាភ្លោះទំនើប តំបន់ជ្រោយចង្វារ",
      "shophouse_title": "ផ្ទះអាជីវកម្ម ជិតផ្សារទំនើប",
      "condo_title": "ខុនដូទំនើប កណ្តាលក្រុង",
      "phnom_penh": "រាជធានីភ្នំពេញ",
      "bed_count": "{{count}} បន្ទប់គេង",
      "bath_count": "{{count}} បន្ទប់ទឹក",
      "cta_title": "ចង់ដាក់លក់ ឬជួលអចលនទ្រព្យរបស់អ្នកមែនទេ?",
      "cta_subtitle": "ភ្នាក់ងារជំនាញរបស់យើងនឹងជួយអ្នកឱ្យទទួលបានតម្លៃខ្ពស់ និងលឿនបំផុត។",
      "consult_now": "ប្រឹក្សាយោបល់ឥឡូវនេះ",
      "default_service_desc": "ស្វែងរកជម្រើសល្អៗជាច្រើនកន្លែង",
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