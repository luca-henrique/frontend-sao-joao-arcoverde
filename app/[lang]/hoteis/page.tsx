"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, MapPin, Phone, Star, Wifi, Coffee, Car, Bath } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Define types for our hotel data
type Amenity = {
  name: string
  icon: React.ReactNode
}

type Hotel = {
  id: string
  name: string
  description: string
  address: string
  phone: string
  priceRange: string
  rating: number
  image: string
  amenities: Amenity[]
  distanceToEvent: string
  website?: string
}

export default function HoteisPage() {

  return (
    <div className="min-h-screen bg-[#0a1744] text-white">
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
              <h1 className="text-3xl md:text-4xl font-bold">Hotéis e Hospedagem</h1>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-yellow-400" />
              <span className="text-yellow-400 font-bold">14 a 28 de Junho, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto py-6">
        <div className="bg-[#0c1d52] p-4 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <h2 className="text-xl font-bold">Encontre sua hospedagem ideal para o São João</h2>
            <div className="flex flex-wrap gap-2">
              <Tabs defaultValue="todos" className="w-full">
                <TabsList className="bg-[#081235] p-1">
                  <TabsTrigger value="todos" className="data-[state=active]:bg-blue-700">
                    Todos
                  </TabsTrigger>
                  <TabsTrigger value="hoteis" className="data-[state=active]:bg-blue-700">
                    Hotéis
                  </TabsTrigger>
                  <TabsTrigger value="pousadas" className="data-[state=active]:bg-blue-700">
                    Pousadas
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Hotels List */}
      <div className="container mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-[#0c1d52] rounded-lg overflow-hidden border border-blue-800 flex flex-col"
            >
              <div className="relative h-48">
                <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold px-2 py-1 rounded-md text-sm">
                  {hotel.priceRange}
                </div>
              </div>
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{hotel.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 text-sm">{hotel.description}</p>
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="text-red-500 mt-1 flex-shrink-0 w-4 h-4" />
                  <p className="text-sm text-gray-300">{hotel.address}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Car className="text-blue-400 w-4 h-4" />
                  <p className="text-sm text-gray-300">{hotel.distanceToEvent}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center bg-[#081235] px-2 py-1 rounded-md text-xs">
                      {amenity.icon}
                      <span className="ml-1">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-blue-800 bg-[#081235]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{hotel.phone}</span>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Reservar</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-[#0c1d52]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-white">Localização dos</span>
            <span className="block text-yellow-400">Hotéis</span>
          </h2>

          <div className="rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31559.02580989655!2d-37.07688368700576!3d-8.424344042880352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a98769f2e4d13d%3A0x96e7c63b83029a7!2sArcoverde%2C%20PE%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1711932000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa dos hotéis"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0a1744]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Garanta sua hospedagem com antecedência!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Os hotéis e pousadas de Arcoverde ficam lotados durante o período do São João. Faça sua reserva o quanto
            antes para garantir o melhor preço e disponibilidade.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-6 px-8">
            Ver todas as opções
          </Button>
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

// Sample hotel data
const hotels: Hotel[] = [
  {
    id: "hotel-1",
    name: "Hotel São João Palace",
    description:
      "Hotel 4 estrelas com excelente localização, próximo ao Parque de Eventos. Oferece café da manhã incluso, piscina e estacionamento gratuito.",
    address: "Av. Dom Pedro II, 850, Centro, Arcoverde",
    phone: "(87) 3821-5678",
    priceRange: "R$ 250 - R$ 450",
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600",
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
      { name: "Piscina", icon: <Bath className="w-3 h-3" /> },
    ],
    distanceToEvent: "500m do Parque de Eventos",
  },
  {
    id: "hotel-2",
    name: "Pousada Forró e Tradição",
    description:
      "Pousada aconchegante com decoração típica nordestina. Quartos confortáveis e ambiente familiar, ideal para quem busca tranquilidade.",
    address: "Rua das Flores, 123, Bairro São Cristóvão, Arcoverde",
    phone: "(87) 3821-4321",
    priceRange: "R$ 150 - R$ 250",
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600",
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
    ],
    distanceToEvent: "1,2km do Parque de Eventos",
  },
  {
    id: "hotel-3",
    name: "Hotel Central Arcoverde",
    description:
      "Hotel moderno no centro da cidade, com fácil acesso a restaurantes e comércio. Oferece serviço de quarto 24h e academia.",
    address: "Av. Principal, 500, Centro, Arcoverde",
    phone: "(87) 3821-7890",
    priceRange: "R$ 200 - R$ 350",
    rating: 4.3,
    image: "/placeholder.svg?height=400&width=600",
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
    ],
    distanceToEvent: "800m do Parque de Eventos",
  },
  {
    id: "hotel-4",
    name: "Pousada Cantinho do Sertão",
    description:
      "Pousada rústica com ambiente acolhedor e café da manhã regional. Quartos simples mas confortáveis, com ótimo custo-benefício.",
    address: "Rua do Forró, 45, Bairro São Miguel, Arcoverde",
    phone: "(87) 3821-2345",
    priceRange: "R$ 120 - R$ 200",
    rating: 4.2,
    image: "/placeholder.svg?height=400&width=600",
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
    ],
    distanceToEvent: "1,5km do Parque de Eventos",
  },
  {
    id: "hotel-5",
    name: "Grande Hotel Arcoverde",
    description:
      "O mais tradicional hotel da cidade, com amplos quartos e excelente serviço. Restaurante próprio com culinária regional e internacional.",
    address: "Praça Central, 100, Centro, Arcoverde",
    phone: "(87) 3821-0001",
    priceRange: "R$ 280 - R$ 500",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600",
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
      { name: "Piscina", icon: <Bath className="w-3 h-3" /> },
    ],
    distanceToEvent: "600m do Parque de Eventos",
  },
  {
    id: "hotel-6",
    name: "Pousada Recanto Junino",
    description:
      "Pousada temática com decoração junina o ano todo. Café da manhã com comidas típicas e ambiente familiar.",
    address: "Rua das Quadrilhas, 78, Bairro Alto, Arcoverde",
    phone: "(87) 3821-6543",
    priceRange: "R$ 140 - R$ 220",
    rating: 4.4,
    image: "/placeholder.svg?height=400&width=600",
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
    ],
    distanceToEvent: "1,8km do Parque de Eventos",
  },
]

