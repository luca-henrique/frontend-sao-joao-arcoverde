"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"


function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [daysRemaining, setDaysRemaining] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const timeDifference = target.getTime() - now.getTime()
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))
      return daysDifference > 0 ? daysDifference : 0
    }

    setDaysRemaining(calculateDaysRemaining())
    setIsLoading(false)

    // Update the countdown every day
    const interval = setInterval(() => {
      setDaysRemaining(calculateDaysRemaining())
    }, 86400000) // 24 hours in milliseconds

    return () => clearInterval(interval)
  }, [targetDate])

  if (isLoading) {
    return <div className="animate-pulse bg-blue-800 h-16 w-40 rounded-lg mx-auto"></div>
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-1 rounded-lg shadow-lg">
        <div className="bg-[#081235] px-6 py-3 rounded-md">
          <p className="text-white text-sm uppercase font-bold mb-1">Contagem Regressiva</p>
          <div className="flex items-center justify-center gap-2">
            <div className="bg-[#0c1d52] px-4 py-2 rounded-md">
              <span className="text-3xl md:text-4xl font-bold text-white">{daysRemaining}</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-yellow-400">
              {daysRemaining === 1 ? "DIA" : "DIAS"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Hero = () => {
  return (
    <section id="home" className="relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1744] to-[#0c1d52] opacity-90" />
        <div className="absolute w-full min-h-screen bg-cover inset-0 bg-[url('/images/stars-bg.png')] bg-no-repeat opacity-60 " />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 md:left-20 w-20 h-20 md:w-32 md:h-32 opacity-20 md:opacity-30">
        <div
          className="absolute inset-0 rounded-full bg-yellow-400 animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>
      <div className="absolute bottom-10 right-10 md:right-20 w-16 h-16 md:w-24 md:h-24 opacity-20 md:opacity-30">
        <div
          className="absolute inset-0 rounded-full bg-red-500 animate-pulse"
          style={{ animationDuration: "5s" }}
        ></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">

          <div className="relative max-w-4xl mx-auto">


            <div className="relative z-10 mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-2 text-shadow-lg drop-shadow-lg">
                <span className="text-white">SÃO JOÃO</span>
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold mb-2 text-shadow-lg drop-shadow-lg">
                <span className="text-yellow-400">DE ARCOVERDE</span>
              </h2>
              <h3 className="text-5xl md:text-7xl font-bold text-shadow-lg drop-shadow-lg">
                <span className="text-white">
                  É <span className="text-6xl md:text-8xl text-red-500">SHOW!!</span>
                </span>
              </h3>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-2xl md:text-3xl text-teal-300 font-bold">14 A 28 DE JUNHO</p>
              <p className="text-xl md:text-2xl text-yellow-400">O melhor São João do Interior! 2025</p>

              <div className="mt-6">
                <CountdownTimer targetDate="2025-06-14" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/programacao">
                <Button className="bg-red-600 hover:bg-red-700 text-white text-lg py-6 px-8 rounded-full shadow-lg transform transition hover:scale-105">
                  Ver Programação
                </Button>
              </Link>
              <a href="#local">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-6 px-8 rounded-full shadow-lg transform transition hover:scale-105">
                  Como Chegar
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}