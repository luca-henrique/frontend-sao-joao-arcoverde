'use client'

import type React from "react"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { Eye, EyeOff, LogIn } from "lucide-react"
import { useDictionary } from "@/hooks/use-dictionary"

export const SignInForm = () => {

  const params = useParams();
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;

  const translations = useDictionary()


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulating authentication - in a real app, this would call an API
    try {
      // Simple validation
      if (!email || !password) {
        throw new Error(translations.requiredFields || "Todos os campos são obrigatórios")
      }

      // For demo purposes, accept any email with admin and password "festival2025"
      if (email.includes("admin") && password === "festival2025") {
        // Set a session token in localStorage
        localStorage.setItem(
          "adminSession",
          JSON.stringify({
            isLoggedIn: true,
            email,
            timestamp: new Date().toISOString(),
          }),
        )

        // Redirect to admin dashboard
        router.push(`/${lang}/admin/galeria`)
      } else {
        throw new Error(translations.invalidCredentials || "Credenciais inválidas")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-white text-sm">{error}</div>}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
          {translations.emailLabel || "Email"}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder={translations.emailPlaceholder || "seu@email.com"}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
          {translations.passwordLabel || "Senha"}
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder={translations.passwordPlaceholder || "••••••••"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-70"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-blue-950 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <LogIn size={20} />
        )}
        {translations.loginButton || "Entrar"}
      </button>
    </form>
  )
}
