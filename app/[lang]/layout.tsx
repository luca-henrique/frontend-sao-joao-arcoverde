import type React from "react";

import { DictionaryProvider } from "@/providers/language";
import { Header } from "@/components/molecules/header/header";

interface LangLayoutProps {
  children: React.ReactNode;
}

const LangLayout = ({ children }: LangLayoutProps) => {
  return (
    <DictionaryProvider>
      <div className="min-h-screen w-full bg-[#0a1744] text-white">
        <Header />
        {children}
      </div>
    </DictionaryProvider>
  );
};

export default LangLayout;
