"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Music } from "lucide-react"
import FadeIn from "@/components/fade-in"

export default function AnimatedCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const festivalDate = new Date("2025-06-14T00:00:00")
      const now = new Date()
      const difference = festivalDate.getTime() - now.getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    setTimeLeft(calculateTimeLeft())
    setIsLoading(false)

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-[#F9A61A] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-[#0c1d52] w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center mb-2 shadow-lg"
        whileHover={{ scale: 1.05, backgroundColor: "#081235" }}
      >
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="text-3xl md:text-4xl font-bold text-[#F9A61A]"
        >
          {value < 10 ? `0${value}` : value}
        </motion.span>
      </motion.div>
      <span className="text-white text-sm uppercase">{label}</span>
    </motion.div>
  )

  return (
    <div className="py-16 bg-[#0a1744] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#F9A61A] rounded-full opacity-5"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-500 rounded-full opacity-5"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-500 rounded-full opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">
              <span className="text-white">Contagem Regressiva para o</span>
              <span className="block text-[#F9A61A]">São João de Arcoverde 2025</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Prepare-se para o maior São João do interior de Pernambuco!
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col items-center">
          <div className="flex gap-4 md:gap-8 mb-12">
            <CountdownUnit value={timeLeft.days} label="Dias" />
            <CountdownUnit value={timeLeft.hours} label="Horas" />
            <CountdownUnit value={timeLeft.minutes} label="Minutos" />
            <CountdownUnit value={timeLeft.seconds} label="Segundos" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <FadeIn direction="up" delay={0.2}>
              <motion.div
                className="bg-[#0c1d52] p-6 rounded-lg text-center"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="bg-[#F9A61A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#0a1744]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">14 a 28 de Junho</h3>
                <p className="text-gray-300">15 dias de festa com as melhores atrações do forró</p>
              </motion.div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <motion.div
                className="bg-[#0c1d52] p-6 rounded-lg text-center"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="bg-[#F9A61A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="w-8 h-8 text-[#0a1744]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">+50 Atrações</h3>
                <p className="text-gray-300">Os maiores nomes da música nordestina em um só lugar</p>
              </motion.div>
            </FadeIn>

            <FadeIn direction="up" delay={0.6}>
              <motion.div
                className="bg-[#0c1d52] p-6 rounded-lg text-center"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="bg-[#F9A61A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#0a1744]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">24 Horas de Festa</h3>
                <p className="text-gray-300">Programação para todos os horários e todos os gostos</p>
              </motion.div>
            </FadeIn>
          </div>

          <motion.div
            className="mt-12 bg-gradient-to-r from-red-600 to-yellow-500 p-1 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-[#081235] px-6 py-3 rounded-md">
              <p className="text-white text-lg font-bold">Garanta seu lugar na maior festa junina do interior!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
