export const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "en";

export const namespaces = [
  "common",
  "auth",
  "booking",
  "mentor",
  "payment",
  "dashboard",
] as const;

export type Namespace = (typeof namespaces)[number];
