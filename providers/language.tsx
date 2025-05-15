'use client'

import { createContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/i18n';
import { IDictionary } from '@/types/dictionary';



export const DictionaryContext = createContext<IDictionary | null>(null);

export interface DictionaryProps {
  children: React.ReactNode
}

export const DictionaryProvider = ({ children }: DictionaryProps) => {
  const [dictionary, setDictionary] = useState<IDictionary | null>(null);
  const params = useParams();

  useEffect(() => {
    async function loadDictionary() {
      const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;
      const dict = await getDictionary(lang ?? 'pt');
      setDictionary(dict)
    }
    loadDictionary();
  }, [params.lang]);

  if (!dictionary) {
    return (
      <div className="min-h-screen bg-[#0a1744] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}
