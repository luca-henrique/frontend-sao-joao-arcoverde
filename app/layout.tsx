import type React from "react"
import { Farro, Flavors } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

import { DictionaryProvider } from "@/providers/language"

import "./globals.css"

const farro = Farro({
  weight: ["300", "400", "500", "700",],
  subsets: ["latin"],
})

const flavors = Flavors({
  weight: ["400"],
  subsets: ["latin"],
})

export const metadata = {
  title: "São João de Arcoverde 2025",
  description: "O melhor São João do interior de Pernambuco",
  author: 'Lucas Paes'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${farro.className} ${flavors.className} `}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <DictionaryProvider>
            {children}
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


