"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Calendar, ImageIcon, Phone, Bed } from "lucide-react"

type NavItem = {
  name: string
  href: string
  icon: React.ReactNode
}

export default function MobileBottomNav({ lang = "pt" }: { lang?: string }) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Definir os itens de navegação com base no idioma atual
  const navItems: NavItem[] = [
    {
      name: lang === "en" ? "Home" : lang === "es" ? "Inicio" : "Home",
      href: `/${lang}`,
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: lang === "en" ? "Schedule" : lang === "es" ? "Programa" : "Programação",
      href: `/${lang}/programacao`,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: lang === "en" ? "Hotels" : lang === "es" ? "Hoteles" : "Hotéis",
      href: `/${lang}/hoteis`,
      icon: <Bed className="w-5 h-5" />,
    },
    {
      name: lang === "en" ? "Gallery" : lang === "es" ? "Galería" : "Galeria",
      href: `/${lang}/galeria`,
      icon: <ImageIcon className="w-5 h-5" />,
    },
    {
      name: lang === "en" ? "Contact" : lang === "es" ? "Contacto" : "Contato",
      href: `/${lang}/contato`,
      icon: <Phone className="w-5 h-5" />,
    },
  ]

  // Controlar a visibilidade da navegação ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Ocultar ao rolar para baixo, mostrar ao rolar para cima
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Verificar se um item está ativo
  const isActive = (href: string) => {
    if (href === `/${lang}` && pathname === `/${lang}`) {
      return true
    }
    return pathname.startsWith(href) && href !== `/${lang}`
  }

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c1d52] border-t border-blue-800 shadow-lg"
     
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center w-full h-full">
            <motion.div
              className={`flex flex-col items-center justify-center ${
                isActive(item.href) ? "text-[#F9A61A]" : "text-gray-400 hover:text-white"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
             
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
