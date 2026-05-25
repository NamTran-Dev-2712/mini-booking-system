import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { defaultLanguage } from "~/config/languages";

import commonEn from "../../public/locales/en/common.json";
import authEn from "../../public/locales/en/auth.json";
import bookingEn from "../../public/locales/en/booking.json";
import mentorEn from "../../public/locales/en/mentor.json";
import paymentEn from "../../public/locales/en/payment.json";
import dashboardEn from "../../public/locales/en/dashboard.json";
import publicEn from "../../public/locales/en/public.json";

import commonVi from "../../public/locales/vi/common.json";
import authVi from "../../public/locales/vi/auth.json";
import bookingVi from "../../public/locales/vi/booking.json";
import mentorVi from "../../public/locales/vi/mentor.json";
import paymentVi from "../../public/locales/vi/payment.json";
import dashboardVi from "../../public/locales/vi/dashboard.json";
import publicVi from "../../public/locales/vi/public.json";

const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    booking: bookingEn,
    mentor: mentorEn,
    payment: paymentEn,
    dashboard: dashboardEn,
    public: publicEn,
  },
  vi: {
    common: commonVi,
    auth: authVi,
    booking: bookingVi,
    mentor: mentorVi,
    payment: paymentVi,
    dashboard: dashboardVi,
    public: publicVi,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    supportedLngs: ["en", "vi"],
    ns: [
      "common",
      "auth",
      "booking",
      "mentor",
      "payment",
      "dashboard",
      "public",
    ],
    defaultNS: "common",
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
