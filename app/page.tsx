"use client"
import Image from "next/image"
import { Calendar, MapPin, Music, Navigation, Clock, Phone, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

import { events } from "@/constants/event"

import { Hero } from "@/components/molecules/hero/hero"



export default function Home() {
  const [activeDot, setActiveDot] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    const handleScroll = () => {
      if (!container) return

      const scrollPosition = container.scrollLeft
      const itemWidth = container.scrollWidth / events.length
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

  const scrollToSection = (index: number) => {
    const container = carouselRef.current
    if (!container) return

    // Calculate position based on dot index (each dot represents 3 days)
    const itemWidth = container.scrollWidth / events.length
    const scrollAmount = itemWidth * index * 3

    container.scrollTo({ left: scrollAmount, behavior: "smooth" })
  }



  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Programação Section */}
      <section id="programacao" className="py-16 bg-[#0a1744]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 flex flex-row justify-center items-center gap-2">
            <span className="text-white">Programação</span>
            <span className="block text-yellow-400">Imperdível</span>
          </h2>

          <div className="relative">
            {/* Left Arrow */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#0c1d52] hover:bg-blue-800 text-white rounded-full p-2 shadow-lg -ml-4 hidden md:block"
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#0c1d52] hover:bg-blue-800 text-white rounded-full p-2 shadow-lg -mr-4 hidden md:block"
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {events.map((day) => (
                <div
                  key={day.date}
                  className="bg-[#0c1d52] p-4 rounded-lg border border-blue-800 min-w-[280px] flex-shrink-0 snap-start"
                >
                  <div className="flex items-center justify-center gap-2 mb-2 pb-2 border-b border-blue-800">
                    <span className={`text-${day.color}-400`}>{day.dayName}</span>
                    <span className={`text-${day.color}-400 font-bold text-xl`}>{day.date}</span>
                  </div>
                  <div className="space-y-3">
                    {day.attractions.map((attraction, index) => (
                      <div key={index} className="text-center">
                        <p className="font-bold text-white">{attraction.name}</p>
                        {attraction.artist && <p className="text-yellow-400">{attraction.artist}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeDot === i ? "bg-yellow-400 scale-125" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  onClick={() => scrollToSection(i)}
                  aria-label={`Ver dias ${i * 3 + 1} a ${Math.min((i + 1) * 3, events.length)}`}
                ></button>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/programacao">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                Ver Programação Completa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="atracoes" className="py-16 bg-[#0a1744]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0c1d52] p-6 rounded-lg text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-[#0a1744]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Grandes Atrações</h3>
              <p className="text-gray-300">
                Os melhores artistas do forró e da música nordestina reunidos em um só lugar.
              </p>
            </div>
            <div className="bg-[#0c1d52] p-6 rounded-lg text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#0a1744]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Localização Privilegiada</h3>
              <p className="text-gray-300">
                Fácil acesso e estrutura completa para você aproveitar o melhor do São João.
              </p>
            </div>
            <div className="bg-[#0c1d52] p-6 rounded-lg text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#0a1744]" />
              </div>
              <h3 className="text-xl font-bold mb-2">15 Dias de Festa</h3>
              <p className="text-gray-300">De 14 a 28 de junho, a maior festa junina do interior de Pernambuco.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="local" className="py-16 bg-[#0c1d52]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">Como</span>
            <span className="block text-yellow-400">Chegar</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31559.02580989655!2d-37.07688368700576!3d-8.424344042880352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a98769f2e4d13d%3A0x96e7c63b83029a7!2sArcoverde%2C%20PE%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1711932000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa do local do evento"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Address and Info */}
            <div className="bg-[#081235] p-8 rounded-lg shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Parque de Eventos São João de Arcoverde</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-lg">Endereço:</p>
                      <p className="text-gray-300">Av. Dom Pedro II, 1250</p>
                      <p className="text-gray-300">Centro, Arcoverde - PE</p>
                      <p className="text-gray-300">CEP: 56506-000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-lg">Horários:</p>
                      <p className="text-gray-300">Abertura dos portões: 18h</p>
                      <p className="text-gray-300">Início dos shows: 20h</p>
                      <p className="text-gray-300">Encerramento: 4h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Navigation className="text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-lg">Como chegar:</p>
                      <p className="text-gray-300">A 5 minutos do centro da cidade</p>
                      <p className="text-gray-300">Transporte público disponível</p>
                      <p className="text-gray-300">Estacionamento gratuito no local</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="text-green-500" />
                  <p>(87) 3821-1234</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-blue-400" />
                  <p>contato@saojoaoarcoverde.com.br</p>
                </div>
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Ver no Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0a1744]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Não Perca o Maior São João do Interior!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Venha celebrar conosco o São João de Arcoverde 2025, com as melhores atrações e a mais autêntica festa
            junina.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programacao">
              <Button className="bg-red-600 hover:bg-red-700 text-white text-lg py-6 px-8">Programação Completa</Button>
            </Link>
            <a href="#local">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-6 px-8">
                Como Chegar
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-[#0c1d52] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] bg-cover bg-center bg-no-repeat opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-2">
            <span className="text-white">Nossos</span>
            <span className="text-yellow-400"> Patrocinadores</span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            O São João de Arcoverde 2025 é realizado com o apoio destas importantes instituições e empresas.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {/* Skol */}
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="Skol"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Governo de Pernambuco */}
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="Governo de Pernambuco"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>

            {/* SEBRAE */}
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="SEBRAE"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Banco do Nordeste */}
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="Banco do Nordeste"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Ministério do Turismo */}
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="Ministério do Turismo"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Ministério da Cultura */}
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="Ministério da Cultura"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 text-lg">Interessado em patrocinar o São João de Arcoverde 2025?</p>
            <Link href="/contato" className="inline-block mt-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Entre em Contato</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#081235] py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <Image
                src="/images/logo.png"
                alt="Prefeitura de Arcoverde"
                width={80}
                height={80}
                className="object-contain"
              />
              <div>
                <p className="font-bold">Prefeitura de Arcoverde</p>
                <p className="text-sm text-gray-400">Secretaria de Turismo, Esportes e Eventos</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.\" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>)
}