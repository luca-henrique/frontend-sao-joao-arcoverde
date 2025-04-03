"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { polos } from "@/constants/polos"
import { useParams } from "next/navigation"
import LanguageSwitcher from "../language-switch/language-switch"
import { useDictionary } from "@/hooks/use-dictionary"


export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const dictionary: any = useDictionary()

  const params = useParams()
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;


  return (
    <header className="container mx-auto py-2 flex justify-between items-center relative z-20">
      <Image
        src="/images/logo.svg"
        alt="Prefeitura de Arcoverde"
        width={80}
        height={80}
        className="object-contain"
      />
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <a href={`/${params.lang}`} className="hover:text-yellow-400 transition-colors">
          {dictionary.nav.home}
        </a>
        <a href={`/${params.lang}/programacao`} className="hover:text-yellow-400 transition-colors">
          {dictionary.nav.schedule}
        </a>
        <DropdownMenu >
          <DropdownMenuTrigger
            className="flex items-center gap-1 hover:text-yellow-400 transition-colors focus:outline-none"

          >
            {dictionary.nav.poles} <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#0c1d52] border-blue-800 text-white"

          >
            {polos.map((polo) => (
              <DropdownMenuItem key={polo.slug} className="hover:bg-[#081235] cursor-pointer">
                <Link href={`/${params.lang}/polos/${polo.slug}`} className="w-full">
                  {polo.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href={`/${params.lang}/hoteis`} className="hover:text-yellow-400 transition-colors">
          {dictionary.nav.hotels}
        </Link>
        <Link href={`/${params.lang}/servicos`} className="hover:text-yellow-400 transition-colors">
          {dictionary.nav.services}
        </Link>


        {/* Language Switcher */}
        <LanguageSwitcher currentLang={lang} />
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <button
          className="text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <Link href={`/${params.lang}/contato`}>
          <Button className="bg-red-600 hover:bg-red-700 text-white">{dictionary.nav.contact}</Button>
        </Link>
      </div>

      {/* Desktop Contact Button */}
      <Link href={`/${params.lang}/contato`} className="hidden md:block">
        <Button className="bg-red-600 hover:bg-red-700 text-white">{dictionary.nav.contact}</Button>
      </Link>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0c1d52] p-4 md:hidden z-50 border-t border-blue-800">
          <nav className="flex flex-col gap-4">
            <a
              href="#home"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.home}
            </a>
            <a
              href="#programacao"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.schedule}
            </a>
            <div className="relative py-2">
              <div className="font-medium mb-2">{dictionary.nav.poles}</div>
              <div className="pl-4 flex flex-col gap-2">
                {polos.map((polo) => (
                  <Link
                    key={polo.slug}
                    href={`/${params.lang}/polos/${polo.slug}`}
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {polo.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href={`/${params.lang}/hoteis`}
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.hotels}
            </Link>
            <Link
              href={`/${params.lang}/servicos`}
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.services}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="py-2 border-t border-blue-800 mt-2">
              <div className="font-medium mb-2">{dictionary.language}</div>
              <div className="pl-4 flex flex-col gap-2">
                <Link
                  href="/pt"
                  className={`${params.lang === "pt" ? "text-yellow-400 font-bold" : "text-gray-300"} hover:text-yellow-400 transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Português
                </Link>
                <Link
                  href="/en"
                  className={`${params.lang === "en" ? "text-yellow-400 font-bold" : "text-gray-300"} hover:text-yellow-400 transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  English
                </Link>
                <Link
                  href="/es"
                  className={`${params.lang === "es" ? "text-yellow-400 font-bold" : "text-gray-300"} hover:text-yellow-400 transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Español
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>

  )
}