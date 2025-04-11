"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

type Testimonial = {
  id: number
  name: string
  location: string
  image: string
  quote: string
  rating: number
  year: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    location: "Recife, PE",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "O São João de Arcoverde superou todas as minhas expectativas! A organização, as atrações e a energia do público foram incríveis. Já estou planejando voltar no próximo ano!",
    rating: 5,
    year: "2024",
  },
  {
    id: 2,
    name: "João Santos",
    location: "Caruaru, PE",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Mesmo sendo de Caruaru, que tem um São João famoso, fiquei impressionado com a festa em Arcoverde. A diversidade de atrações e a hospitalidade do povo fazem toda a diferença.",
    rating: 5,
    year: "2024",
  },
  {
    id: 3,
    name: "Ana Beatriz",
    location: "Garanhuns, PE",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Participei de vários festejos juninos pelo Nordeste, mas o São João de Arcoverde tem um charme especial. A mistura de tradição com atrações modernas agrada a todos os públicos.",
    rating: 4,
    year: "2023",
  },
  {
    id: 4,
    name: "Carlos Eduardo",
    location: "São Paulo, SP",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Viajei do Sudeste especialmente para o São João de Arcoverde e valeu cada quilômetro! Uma experiência cultural incrível que todos deveriam vivenciar pelo menos uma vez na vida.",
    rating: 5,
    year: "2024",
  },
  {
    id: 5,
    name: "Fernanda Costa",
    location: "Arcoverde, PE",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Como moradora de Arcoverde, tenho muito orgulho do nosso São João. A cada ano a festa fica melhor, trazendo turistas de todo o Brasil e movimentando nossa economia local.",
    rating: 5,
    year: "2023",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="py-16 bg-[#0a1744]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">
              <span className="text-white">O que dizem sobre o</span>
              <span className="block text-[#F9A61A]">São João de Arcoverde</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Confira os depoimentos de quem já viveu a experiência do maior São João do interior de Pernambuco.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#0c1d52] hover:bg-[#081235] text-white rounded-full p-3 shadow-lg -ml-4 md:-ml-6"
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#0c1d52] hover:bg-[#081235] text-white rounded-full p-3 shadow-lg -mr-4 md:-mr-6"
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Testimonials Carousel */}
          <div className="bg-[#0c1d52] rounded-xl p-6 md:p-10 shadow-xl">
            <div className="absolute top-6 right-10 text-[#F9A61A] opacity-20">
              <Quote className="w-20 h-20" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-[#F9A61A]">
                    <Image
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-300 text-center">{testimonials[currentIndex].location}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonials[currentIndex].rating ? "text-[#F9A61A] fill-[#F9A61A]" : "text-gray-400"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">São João {testimonials[currentIndex].year}</p>
                </div>

                <div className="md:w-2/3">
                  <blockquote className="text-lg md:text-xl text-white italic">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-[#F9A61A] w-6" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Ver depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
