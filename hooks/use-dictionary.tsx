import { DictionaryContext } from "@/providers/language";
import { useContext } from "react";


export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
}