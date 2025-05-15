"use client"

import { Hero } from "@/components/molecules/hero/hero"
import { Location } from "@/components/organisms/location/location"
import { BasicInformation } from "@/components/molecules/basic-information/basic-information"
import { Footer } from "@/components/molecules/footer/footer"
import { Sponsors } from "@/components/molecules/sponsors/sponsors"
import AnimatedCountdown from "@/components/organisms/animated-countdown/animated-countdown"

import ScrollReveal from "@/components/scroll-reveal"
import DailySchedule from "@/components/molecules/daily-schedule/daily-schedule"
import TestimonialsSection from "@/components/molecules/testimonials-section/testimonials-section"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { allDays } from "@/constants/all-days"
import { useDictionary } from "@/hooks/use-dictionary"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function Home() {
  const [activeDot, setActiveDot] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDay, setActiveDay] = useState("14.JUN")

  const dictionary: any = useDictionary();
  const params = useParams();
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;

  // Custom scrollbar styles
  useEffect(() => {
    // Adiciona estilos para a barra de rolagem personalizada
    const style = document.createElement("style")
    style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  /* Estilo para barras de rolagem verticais em containers de atrações */
  #stages-container > div > div::-webkit-scrollbar {
    width: 6px;
  }
  
  #stages-container > div > div::-webkit-scrollbar-track {
    background: rgba(28, 28, 26, 0.2);
    border-radius: 10px;
  }
  
  #stages-container > div > div::-webkit-scrollbar-thumb {
    background: rgba(249, 166, 26, 0.5);
    border-radius: 10px;
  }
  
  #stages-container > div > div::-webkit-scrollbar-thumb:hover {
    background: rgba(249, 166, 26, 0.8);
  }

  /* Add perspective for 3D effects */
  .perspective {
    perspective: 166,26,0.8);
  }

  /* Add perspective for 3D effects */
  .perspective {
    perspective: 1000px;
  }

  /* Add smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
`
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])



  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    const handleScroll = () => {
      if (!container) return

      const scrollPosition = container.scrollLeft
      const itemWidth = container.scrollWidth / allDays.length
      const newActiveDot = Math.round(scrollPosition / itemWidth)

      // We want to group the dots into 5 sections
      const dotIndex = Math.min(Math.floor(newActiveDot / 3), 4)

      if (dotIndex !== activeDot) {
        setActiveDot(dotIndex)
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [activeDot])

  return (
    <>
      <Hero />
      <AnimatedCountdown />
      <section id="daily-schedule" className="py-16 bg-[#0a1744]">
        <DailySchedule />
      </section>

      {/* Daily Schedule Section */}

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Features Section */}
      <section id="atracoes" className="py-16 bg-[#0a1744]">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-2">
                <span className="text-white">Experiência</span>
                <span className="block text-[#F9A61A]">Completa</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                O São João de Arcoverde oferece muito mais do que música. Confira tudo o que você vai encontrar.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <motion.div
                className="bg-[#0c1d52] p-6 rounded-lg text-center"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.div
                  className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#071242]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white">{dictionary.features.feature1.title}</h3>
                <p className="text-gray-300">{dictionary.features.feature1.description}</p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <motion.div
                className="bg-[#0c1d52] p-6 rounded-lg text-center"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.div
                  className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#071242]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white">{dictionary.features.feature2.title}</h3>
                <p className="text-gray-300">{dictionary.features.feature2.description}</p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <motion.div
                className="bg-[#0c1d52] p-6 rounded-lg text-center"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.div
                  className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#071242]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white">{dictionary.features.feature3.title}</h3>
                <p className="text-gray-300">{dictionary.features.feature3.description}</p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#071242]">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-2">
                <span className="text-white">Perguntas</span>
                <span className="block text-[#F9A61A]">Frequentes</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">Tire suas dúvidas sobre o São João de Arcoverde 2025.</p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <motion.div
                className="bg-[#0c1d52] p-6 rounded-lg"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              >
                <Link href={`/${params.lang}/contato`} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">Ainda tem dúvidas?</h3>
                    <p className="text-gray-300">Entre em contato conosco para mais informações.</p>
                  </div>
                  <motion.div
                    className="bg-[#F9A61A] p-3 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#071242]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </Link>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <Location />
      <BasicInformation />
      <Sponsors />
      <Footer />
    </>)
}