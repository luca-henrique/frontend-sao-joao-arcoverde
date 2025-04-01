"use client"
import Image from "next/image"
import { Calendar, MapPin, Music, Navigation, Clock, Phone, Mail, ExternalLink, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


const allDays = [
  {
    dayName: "SÁB",
    date: "14.JUN",
    color: "blue",
    attractions: [
      { name: "GERALDO AZEVEDO", artist: "", time: "20:00", pole: "Principal" },
      { name: "PRISCILA SENNA", artist: "", time: "22:30", pole: "Principal" },
      { name: "DESEJO DE MENINA", artist: "", time: "00:30", pole: "Principal" },
      { name: "TRIO PÉ DE SERRA", artist: "", time: "15:00", pole: "Polo do Cruzeiro" },
    ],
  },
  {
    dayName: "DOM",
    date: "15.JUN",
    color: "green",
    attractions: [
      { name: "FLÁVIO JOSÉ", artist: "", time: "20:00", pole: "Principal" },
      { name: "DORGIVAL DANTAS", artist: "", time: "22:30", pole: "Principal" },
      { name: "CIRO SANTOS", artist: "", time: "00:30", pole: "Principal" },
      { name: "ZABUMBA NOSSA SENHORA", artist: "", time: "15:00", pole: "Polo Cultural" },
    ],
  },
  {
    dayName: "SEG",
    date: "16.JUN",
    color: "yellow",
    attractions: [
      { name: "FESTIVAL DAS", artist: "QUADRILHAS", time: "19:00", pole: "Principal" },
      { name: "JUNINAS", artist: "", time: "20:00", pole: "Principal" },
      { name: "QUADRILHA MATUTA", artist: "", time: "15:00", pole: "Polo das Quadrilhas" },
    ],
  },
  {
    dayName: "TER",
    date: "17.JUN",
    color: "red",
    attractions: [
      { name: "LEO FOGUETE", artist: "", time: "20:00", pole: "Principal" },
      { name: "JONAS ESTICADO", artist: "", time: "22:30", pole: "Principal" },
      { name: "JOÃO VAQUEIRO", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "QUA",
    date: "18.JUN",
    color: "purple",
    attractions: [
      { name: "XAND AVIÃO", artist: "", time: "20:00", pole: "Principal" },
      { name: "PABLO", artist: "", time: "22:30", pole: "Principal" },
      { name: "FORROZÃO CHACAL", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "QUI",
    date: "19.JUN",
    color: "blue",
    attractions: [
      { name: "HENRY FREITAS", artist: "", time: "20:00", pole: "Principal" },
      { name: "TARCÍSIO DO ACORDEON", artist: "", time: "22:30", pole: "Principal" },
      { name: "LUAN ESTILIZADO", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "SEX",
    date: "20.JUN",
    color: "green",
    attractions: [
      { name: "SOLANGE ALMEIDA", artist: "", time: "20:00", pole: "Principal" },
      { name: "NATTAN", artist: "", time: "22:30", pole: "Principal" },
      { name: "LIMÃO COM MEL", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "SÁB",
    date: "21.JUN",
    color: "yellow",
    attractions: [
      { name: "ALCEU VALENÇA", artist: "", time: "20:00", pole: "Principal" },
      { name: "ELBA RAMALHO", artist: "", time: "22:30", pole: "Principal" },
      { name: "RAPHAELA SANTOS", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "DOM",
    date: "22.JUN",
    color: "red",
    attractions: [
      { name: "MANO WALTER", artist: "", time: "20:00", pole: "Principal" },
      { name: "MATHEUS & KAUAN", artist: "", time: "22:30", pole: "Principal" },
      { name: "BANDA MAGNÍFICOS", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "SEG",
    date: "23.JUN",
    color: "purple",
    attractions: [
      { name: "WESLEY SAFADÃO", artist: "", time: "20:00", pole: "Principal" },
      { name: "MARI FERNANDEZ", artist: "", time: "22:30", pole: "Principal" },
      { name: "CAVALEIROS DO FORRÓ", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "TER",
    date: "24.JUN",
    color: "blue",
    attractions: [
      { name: "SANTANNA", artist: "O CANTADOR", time: "20:00", pole: "Principal" },
      { name: "PETRÚCIO AMORIM", artist: "", time: "22:30", pole: "Principal" },
      { name: "QUINTETO VIOLADO", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "QUA",
    date: "25.JUN",
    color: "green",
    attractions: [
      { name: "ALOK", artist: "", time: "20:00", pole: "Principal" },
      { name: "PEDRO SAMPAIO", artist: "", time: "22:30", pole: "Principal" },
      { name: "DENNIS DJ", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "QUI",
    date: "26.JUN",
    color: "yellow",
    attractions: [
      { name: "BELL MARQUES", artist: "", time: "20:00", pole: "Principal" },
      { name: "DURVAL LELYS", artist: "", time: "22:30", pole: "Principal" },
      { name: "TIMBALADA", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "SEX",
    date: "27.JUN",
    color: "red",
    attractions: [
      { name: "ZÉ VAQUEIRO", artist: "", time: "20:00", pole: "Principal" },
      { name: "JOÃO GOMES", artist: "", time: "22:30", pole: "Principal" },
      { name: "VITOR FERNANDES", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
  {
    dayName: "SÁB",
    date: "28.JUN",
    color: "purple",
    attractions: [
      { name: "GUSTTAVO LIMA", artist: "", time: "20:00", pole: "Principal" },
      { name: "SIMONE MENDES", artist: "", time: "22:30", pole: "Principal" },
      { name: "ERIC LAND", artist: "", time: "00:30", pole: "Principal" },
    ],
  },
]

export default function Home() {
  const [activeDot, setActiveDot] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const scrollToSection = (index: number) => {
    const container = carouselRef.current
    if (!container) return

    // Calculate position based on dot index (each dot represents 3 days)
    const itemWidth = container.scrollWidth / allDays.length
    const scrollAmount = itemWidth * index * 3

    container.scrollTo({ left: scrollAmount, behavior: "smooth" })
  }

  const polos = [
    { name: "Polo do Cruzeiro", slug: "cruzeiro" },
    { name: "Polo da Poesia", slug: "poesia" },
    { name: "Polo Gospel", slug: "gospel" },
    { name: "Polo das Quadrilhas", slug: "quadrilhas" },
    { name: "Polo Gastronômico", slug: "gastronomico" },
    { name: "Polo Cultural", slug: "cultural" },
  ]

  return (
    <div className="min-h-screen bg-[#0a1744] text-white overflow-hidden">
      {/* Header */}
      <header className="container mx-auto py-4 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Prefeitura de Arcoverde"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="font-bold text-lg">Arcoverde</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="hover:text-yellow-400 transition-colors">
            Home
          </a>
          <a href="#programacao" className="hover:text-yellow-400 transition-colors">
            Programação
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-yellow-400 transition-colors focus:outline-none">
              Polos <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#0c1d52] border-blue-800 text-white">
              {polos.map((polo) => (
                <DropdownMenuItem key={polo.slug} className="hover:bg-[#081235] cursor-pointer">
                  <Link href={`/polos/${polo.slug}`} className="w-full">
                    {polo.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="#atracoes" className="hover:text-yellow-400 transition-colors">
            Atrações
          </a>
          <a href="#local" className="hover:text-yellow-400 transition-colors">
            Local
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">Contato</Button>
        </div>

        {/* Desktop Contact Button */}
        <Button className="hidden md:block bg-red-600 hover:bg-red-700 text-white">Contato</Button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0c1d52] p-4 md:hidden z-50 border-t border-blue-800">
            <nav className="flex flex-col gap-4">
              <a
                href="#home"
                className="hover:text-yellow-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#programacao"
                className="hover:text-yellow-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Programação
              </a>
              <div className="relative py-2">
                <div className="font-medium mb-2">Polos</div>
                <div className="pl-4 flex flex-col gap-2">
                  {polos.map((polo) => (
                    <Link
                      key={polo.slug}
                      href={`/polos/${polo.slug}`}
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {polo.name}
                    </Link>
                  ))}
                </div>
              </div>
              <a
                href="#atracoes"
                className="hover:text-yellow-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Atrações
              </a>
              <a
                href="#local"
                className="hover:text-yellow-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Local
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1744] to-[#0c1d52] opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] bg-repeat opacity-50"></div>
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
            <div className="relative mb-6">
              <Image
                src="/images/moon.png"
                alt="Lua"
                width={80}
                height={80}
                className="animate-pulse"
                style={{ animationDuration: "6s" }}
              />
            </div>

            <div className="relative max-w-4xl mx-auto">
              <Image
                src="/images/flags.png"
                alt="Bandeirinhas"
                width={120}
                height={60}
                className="absolute -top-10 right-0 md:-top-12 md:right-0 md:w-32"
              />

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

        <div className="relative h-32 mt-12">
          <div className="absolute bottom-0 left-0 right-0">
            <div className="flex justify-between items-end">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-16 md:w-12 md:h-24 bg-yellow-800 rounded-t-lg"></div>
                ))}
              </div>
              <Image src="/images/accordion.png" alt="Acordeão" width={200} height={200} className="mr-4 mb-4" />
            </div>
            <div className="h-8 bg-red-600"></div>
          </div>
        </div>
      </section>

      {/* Programação Section */}
      <section id="programacao" className="py-16 bg-[#0a1744]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
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
              {allDays.map((day) => (
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
                  aria-label={`Ver dias ${i * 3 + 1} a ${Math.min((i + 1) * 3, allDays.length)}`}
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
    </div>)
}