import type React from "react";

import { DictionaryProvider } from "@/providers/language";
import { Header } from "@/components/molecules/header/header";
import Head from "next/head";

interface LangLayoutProps {
  children: React.ReactNode;
}

const LangLayout = ({ children }: LangLayoutProps) => {
  return (
    <DictionaryProvider>
      <Head>
        <link rel="preload" as="image" href="/images/stars-bg.avif" type="image/avif" />
      </Head>
      <div className="min-h-screen w-full bg-[#0a1744] text-white">
        <Header />
        {children}
      </div>
    </DictionaryProvider>
  );
};

export default LangLayout;
