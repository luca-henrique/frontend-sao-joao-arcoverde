import type React from "react";

import { Header } from "@/components/molecules/header/header";
import Head from "next/head";
import { locales } from "@/middleware/get-locale";
import MobileBottomNav from "@/components/organisms/mobile-bottom-nav/mobile-bottom-nav";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

interface LangLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  const { lang } = await params
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/images/stars-bg.avif" type="image/avif" />
      </Head>
      <div className="min-h-screen w-full bg-[#0a1744] text-white">
        <Header />
        {children}
        <MobileBottomNav lang={lang} />
      </div>
    </>
  );
};

