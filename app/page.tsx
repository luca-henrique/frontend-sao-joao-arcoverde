"use client"

import { redirect } from "next/navigation"
import { defaultLocale } from "@/middleware/get-locale"

export default function Home() {
  redirect(`/${defaultLocale}`)
}

