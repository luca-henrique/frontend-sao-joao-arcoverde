import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/molecules/header/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "São João de Arcoverde 2025",
  description: "O melhor São João do interior de Pernambuco",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-[#0a1744] text-white">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


