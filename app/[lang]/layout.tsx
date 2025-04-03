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
        <meta property="og:title" content="Netflix Brasil - Assista a séries e filmes online" />
        <meta property="og:description" content="Assista a filmes e séries online ou transmita diretamente para sua Smart TV, console, PC, Mac, celular, tablet e mais." />
        <meta property="og:image" content="https://assets.nflxext.com/ffe/siteui/vlv3/brazil-og.jpg" />
        <meta property="og:url" content="https://www.netflix.com/br/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Netflix Brasil - Assista a séries e filmes online" />
        <meta name="twitter:description" content="Assista a filmes e séries online ou transmita diretamente para sua Smart TV, console, PC, Mac, celular, tablet e mais." />
        <meta name="twitter:image" content="https://assets.nflxext.com/ffe/siteui/vlv3/brazil-og.jpg" />
        <meta name="twitter:site" content="@NetflixBrasil" />
      </Head>
      <div className="min-h-screen w-full bg-[#0a1744] text-white">
        <Header />
        {children}
      </div>
    </DictionaryProvider>
  );
};

export default LangLayout;
