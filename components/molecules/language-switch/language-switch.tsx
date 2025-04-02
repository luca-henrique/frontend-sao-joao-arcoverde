"use client"

import { Globe } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function LanguageSwitcher({ currentLang = "pt" }: { currentLang?: string }) {
  const [open, setOpen] = useState(false)

  const languages = [
    { code: "pt", name: "Português" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="flex items-center gap-1 hover:text-yellow-400 transition-colors focus:outline-none"
        onMouseEnter={() => setOpen(true)}
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#0c1d52] border-blue-800 text-white" onMouseLeave={() => setOpen(false)}>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`${currentLang === language.code ? "bg-[#081235] font-bold" : "hover:bg-[#081235]"} cursor-pointer`}
          >
            <Link href={`/${language.code}`} className="w-full">
              {language.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

