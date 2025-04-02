"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { polos } from "@/constants/polos"


export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        <a href="#home" className="hover:text-yellow-400 transition-colors">
          Home
        </a>
        <a href="#programacao" className="hover:text-yellow-400 transition-colors">
          Programação
        </a>
        <DropdownMenu >
          <DropdownMenuTrigger
            className="flex items-center gap-1 hover:text-yellow-400 transition-colors focus:outline-none"

          >
            Polos <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#0c1d52] border-blue-800 text-white"

          >
            {polos.map((polo) => (
              <DropdownMenuItem key={polo.slug} className="hover:bg-[#081235] cursor-pointer">
                <Link href={`/polos/${polo.slug}`} className="w-full">
                  {polo.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/hoteis" className="hover:text-yellow-400 transition-colors">
          Hotéis
        </Link>
        <Link href="/servicos" className="hover:text-yellow-400 transition-colors">
          Serviços
        </Link>
        <a href="#local" className="hover:text-yellow-400 transition-colors">
          Local
        </a>
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
        <Button className="bg-red-600 hover:bg-red-700 text-white">Contato</Button>
      </div>

      {/* Desktop Contact Button */}
      <Button className="hidden md:block bg-red-600 hover:bg-red-700 text-white">Contato</Button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0c1d52] p-4 md:hidden z-50 border-t border-blue-800">
          <nav className="flex flex-col gap-4">
            <a
              href="#home"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#programacao"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Programação
            </a>
            <div className="relative py-2">
              <div className="font-medium mb-2">Polos</div>
              <div className="pl-4 flex flex-col gap-2">
                {polos.map((polo) => (
                  <Link
                    key={polo.slug}
                    href={`/polos/${polo.slug}`}
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {polo.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/hoteis"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hotéis
            </Link>
            <Link
              href="/servicos"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Serviços
            </Link>
            <a
              href="#local"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Local
            </a>
          </nav>
        </div>
      )}
    </header>

  )
}