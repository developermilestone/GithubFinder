import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { default as localEN } from "@/translations/en/translation.json";
import { default as localPT } from "@/translations/pt/translation.json";

i18n.use(initReactI18next).init({
  resources:  {
    en: {
      translation: localEN,
    },
    pt: {
      translation: localPT,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: "__",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;