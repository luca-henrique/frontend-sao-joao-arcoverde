import pt from "./pt.json";
import en from "./en.json";
import es from "./es.json";
import { locales } from "@/middleware/get-locale";

const dictionaries = {
  pt,
  en,
  es,
};

export async function getDictionary(locale: string) {
  // If the locale is not in the list of supported locales, use the default locale
  if (!locales.includes(locale)) {
    locale = "pt";
  }

  // Return the dictionary for the requested locale
  return dictionaries[locale as keyof typeof dictionaries] || dictionaries.pt;
}
