'use client'

import Image from "next/image"
import { SignInForm } from "./login-form"
import { useDictionary } from "@/hooks/use-dictionary"

export default function LoginPage() {
  const dict = useDictionary()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-950 to-blue-900 px-4">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] bg-repeat opacity-30"></div>
      </div>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden z-10">
        <div className="p-6 sm:p-8">
           <div className="flex justify-center mb-6">
            <Image src="/images/logo.svg" alt="São João de Arcoverde" width={180} height={120} className="h-auto" />
          </div>

          

          <h1 className="text-2xl font-bold text-center text-white mb-8">
            {dict.admin?.loginTitle || "Área Administrativa"}
          </h1>
          <SignInForm  />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950 to-transparent z-0"></div>
    </div>
  )
}

