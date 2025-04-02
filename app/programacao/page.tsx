"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, Filter, Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function ProgramacaoPage() {
  const polos = [
    { name: "Polo do Cruzeiro", slug: "cruzeiro" },
    { name: "Polo da Poesia", slug: "poesia" },
    { name: "Polo Gospel", slug: "gospel" },
    { name: "Polo das Quadrilhas", slug: "quadrilhas" },
    { name: "Polo Gastronômico", slug: "gastronomico" },
    { name: "Polo Cultural", slug: "cultural" },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a1744] text-white">
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
          <DropdownMenu >
            <DropdownMenuTrigger
              className="flex items-center gap-1 hover:text-yellow-400 transition-colors focus:outline-none"

            >
              Polos <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#0c1d52] border-blue-800 text-white"

            >
              {polos.map((polo) => (
                <DropdownMenuItem key={polo.slug} className="hover:bg-[#081235] cursor-pointer">
                  <Link href={`/polos/${polo.slug}`} className="w-full">
                    {polo.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/hoteis" className="hover:text-yellow-400 transition-colors">
            Hotéis
          </Link>
          <Link href="/servicos" className="hover:text-yellow-400 transition-colors">
            Serviços
          </Link>
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
              >
                Home
              </a>
              <a
                href="#programacao"
                className="hover:text-yellow-400 transition-colors py-2"
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
                    >
                      {polo.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/hoteis"
                className="hover:text-yellow-400 transition-colors py-2"

              >
                Hotéis
              </Link>
              <Link
                href="/servicos"
                className="hover:text-yellow-400 transition-colors py-2"

              >
                Serviços
              </Link>
              <a
                href="#local"
                className="hover:text-yellow-400 transition-colors py-2"

              >
                Local
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Page Title */}
      <div className="bg-[#0c1d52] py-8 border-y border-blue-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <h1 className="text-3xl md:text-4xl font-bold">Programação Completa</h1>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-yellow-400" />
              <span className="text-yellow-400 font-bold">14 a 28 de Junho, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto py-6">
        <div className="bg-[#0c1d52] p-4 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar artista ou atração..."
                className="pl-10 bg-[#081235] border-blue-800 text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select>
                <SelectTrigger className="w-[180px] bg-[#081235] border-blue-800 text-white">
                  <SelectValue placeholder="Filtrar por dia" />
                </SelectTrigger>
                <SelectContent className="bg-[#081235] border-blue-800 text-white">
                  <SelectItem value="all">Todos os dias</SelectItem>
                  <SelectItem value="14">14 de Junho</SelectItem>
                  <SelectItem value="15">15 de Junho</SelectItem>
                  <SelectItem value="16">16 de Junho</SelectItem>
                  <SelectItem value="17">17 de Junho</SelectItem>
                  <SelectItem value="18">18 de Junho</SelectItem>
                  <SelectItem value="19">19 de Junho</SelectItem>
                  <SelectItem value="20">20 de Junho</SelectItem>
                  <SelectItem value="21">21 de Junho</SelectItem>
                  <SelectItem value="22">22 de Junho</SelectItem>
                  <SelectItem value="23">23 de Junho</SelectItem>
                  <SelectItem value="24">24 de Junho</SelectItem>
                  <SelectItem value="25">25 de Junho</SelectItem>
                  <SelectItem value="26">26 de Junho</SelectItem>
                  <SelectItem value="27">27 de Junho</SelectItem>
                  <SelectItem value="28">28 de Junho</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] bg-[#081235] border-blue-800 text-white">
                  <SelectValue placeholder="Filtrar por polo" />
                </SelectTrigger>
                <SelectContent className="bg-[#081235] border-blue-800 text-white">
                  <SelectItem value="all">Todos os polos</SelectItem>
                  <SelectItem value="principal">Polo Principal</SelectItem>
                  <SelectItem value="cruzeiro">Polo do Cruzeiro</SelectItem>
                  <SelectItem value="poesia">Polo da Poesia</SelectItem>
                  <SelectItem value="gospel">Polo Gospel</SelectItem>
                  <SelectItem value="quadrilhas">Polo das Quadrilhas</SelectItem>
                  <SelectItem value="gastronomico">Polo Gastronômico</SelectItem>
                  <SelectItem value="cultural">Polo Cultural</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-blue-800 text-white">
                <Filter className="w-4 h-4 mr-2" />
                Mais Filtros
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Tabs */}
      <div className="container mx-auto pb-16">
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">15 Dias de Festa</h2>
            <TabsList className="bg-[#0c1d52]">
              <TabsTrigger value="grid" className="data-[state=active]:bg-blue-700">
                Grade
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-blue-700">
                Lista
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {scheduleData.map((day) => (
                <div key={day.date} className="bg-[#0c1d52] p-4 rounded-lg border border-blue-800">
                  <div className="flex items-center justify-center gap-2 mb-4 pb-2 border-b border-blue-800">
                    <div className="flex flex-col items-center">
                      <span className={`text-${day.color}-400 text-sm`}>{day.dayName}</span>
                      <span className={`text-${day.color}-400 font-bold text-xl`}>{day.date}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {day.attractions.map((attraction, index) => (
                      <div key={index} className="text-center p-2 hover:bg-[#081235] rounded transition-colors">
                        <div className="flex justify-center mb-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${attraction.pole === "Principal" ? "bg-red-600 text-white" : "bg-blue-600 text-white"
                              }`}
                          >
                            {attraction.pole}
                          </span>
                        </div>
                        <p className="font-bold text-white">{attraction.name}</p>
                        {attraction.artist && <p className="text-yellow-400">{attraction.artist}</p>}
                        <p className="text-gray-300 text-sm mt-1">{attraction.time}</p>
                        {attraction.supportActs &&
                          attraction.supportActs.map((act, i) => (
                            <p key={i} className="text-yellow-400 text-sm">
                              {act}
                            </p>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="space-y-6">
              {scheduleData.map((day) => (
                <div key={day.date} className="bg-[#0c1d52] rounded-lg border border-blue-800 overflow-hidden">
                  <div className={`bg-${day.color}-900 p-4 flex justify-between items-center`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-bold">
                        {day.dayName} - {day.date}
                      </span>
                    </div>
                    <span className="text-sm bg-[#081235] px-2 py-1 rounded">{day.attractions.length} atrações</span>
                  </div>
                  <div className="p-4">
                    <div className="divide-y divide-blue-800">
                      {day.attractions.map((attraction, index) => (
                        <div
                          key={index}
                          className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center mt-1">
                              <span className="text-gray-300 text-sm">{attraction.time}</span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full mt-1 ${attraction.pole === "Principal" ? "bg-red-600 text-white" : "bg-blue-600 text-white"
                                  }`}
                              >
                                {attraction.pole}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{attraction.name}</h3>
                              {attraction.artist && <p className="text-yellow-400">{attraction.artist}</p>}
                              {attraction.supportActs &&
                                attraction.supportActs.map((act, i) => (
                                  <p key={i} className="text-yellow-400 text-sm">
                                    {act}
                                  </p>
                                ))}
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-800 text-white hover:bg-blue-800"
                            >
                              Detalhes
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Download Section */}
      <section className="bg-[#0c1d52] py-12 border-t border-blue-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Baixe a Programação Completa</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Tenha a programação completa do São João de Arcoverde 2025 no seu celular para não perder nenhuma atração.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">Download PDF</Button>
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
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2025 São João de Arcoverde. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const scheduleData = [
  {
    dayName: "SÁB",
    date: "14.JUN",
    color: "blue",
    attractions: [
      { name: "GERALDO AZEVEDO", artist: "", time: "20:00", pole: "Principal" },
      { name: "PRISCILA SENNA", artist: "", time: "22:30", pole: "Principal" },
      { name: "DESEJO DE MENINA", artist: "", time: "00:30", pole: "Principal" },
      { name: "TRIO PÉ DE SERRA", artist: "", time: "15:00", pole: "Polo do Cruzeiro" },
      { name: "FORRÓ RAIZ", artist: "", time: "17:30", pole: "Polo do Cruzeiro" },
      { name: "POETAS POPULARES", artist: "", time: "16:00", pole: "Polo da Poesia" },
      { name: "CORAL MUNICIPAL", artist: "", time: "15:00", pole: "Polo Gospel" },
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
      { name: "BANDA REGIONAL", artist: "", time: "17:00", pole: "Polo Cultural" },
      { name: "FESTIVAL DE COMIDAS TÍPICAS", artist: "", time: "16:00", pole: "Polo Gastronômico" },
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
      { name: "QUADRILHA JUNINA ARRETADA", artist: "", time: "16:30", pole: "Polo das Quadrilhas" },
      { name: "QUADRILHA TRADIÇÃO", artist: "", time: "18:00", pole: "Polo das Quadrilhas" },
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
      { name: "CANTORES GOSPEL", artist: "", time: "16:00", pole: "Polo Gospel" },
      { name: "SARAU DE POESIA", artist: "", time: "17:00", pole: "Polo da Poesia" },
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
      { name: "FEIRA DE ARTESANATO", artist: "", time: "15:00", pole: "Polo Cultural" },
      { name: "TRIO PÉ DE SERRA", artist: "", time: "16:00", pole: "Polo do Cruzeiro" },
    ],
  },
]

