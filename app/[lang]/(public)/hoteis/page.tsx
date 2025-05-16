"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Star,
  Wifi,
  Coffee,
  Car,
  Bath,
  Users,
  Home,
  Bed,
  Heart,
  Share,
  Award,
  Utensils,
  Tv,
  Wind,
  Snowflake,
  ChevronUp,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Define types for our property data
type Amenity = {
  name: string
  icon: React.ReactNode
}

type Review = {
  id: string
  author: string
  rating: number
  comment: string
  date: string
  avatar?: string
}

type PropertyImage = {
  url: string
  alt: string
}

type Property = {
  id: string
  name: string
  description: string
  address: string
  phone: string
  priceRange: string
  rating: number
  images: PropertyImage[]
  amenities: Amenity[]
  distanceToEvent: string
  website?: string
  type: "hotel" | "pousada" | "casa" | "apartamento"
  rooms?: number
  bathrooms?: number
  capacity?: number
  host?: {
    name: string
    rating: number
    responseRate: string
    avatar?: string
  }
  reviews?: Review[]
  featured?: boolean
}

export default function HoteisPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({})
  const [selectedTab, setSelectedTab] = useState("todos")
  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("propertyFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("propertyFavorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const polos = [
    { name: "Polo do Cruzeiro", slug: "cruzeiro" },
    { name: "Polo da Poesia", slug: "poesia" },
    { name: "Polo Gospel", slug: "gospel" },
    { name: "Polo das Quadrilhas", slug: "quadrilhas" },
    { name: "Polo Gastronômico", slug: "gastronomico" },
    { name: "Polo Cultural", slug: "cultural" },
  ]

  // Function to navigate through property images
  const navigateImages = (propertyId: string, direction: "next" | "prev") => {
    const property = properties.find((p) => p.id === propertyId)
    if (!property) return

    const currentIndex = activeImageIndex[propertyId] || 0
    const totalImages = property.images.length

    let newIndex
    if (direction === "next") {
      newIndex = (currentIndex + 1) % totalImages
    } else {
      newIndex = (currentIndex - 1 + totalImages) % totalImages
    }

    setActiveImageIndex((prev) => ({
      ...prev,
      [propertyId]: newIndex,
    }))
  }

  // Filter properties based on selected tab and favorites
  const filteredProperties = properties.filter((property) => {
    if (showFavorites) {
      return favorites.includes(property.id)
    }

    if (selectedTab === "todos") {
      return true
    }
    return property.type === selectedTab
  })

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
              <h1 className="text-3xl md:text-4xl font-bold">Hospedagem em Arcoverde</h1>
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
              <Tabs defaultValue="todos" className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="bg-[#081235] p-1">
                  <TabsTrigger value="todos" className="data-[state=active]:bg-blue-700">
                    Todos
                  </TabsTrigger>
                  <TabsTrigger value="hotel" className="data-[state=active]:bg-blue-700">
                    Hospedagem
                  </TabsTrigger>
                  <TabsTrigger value="pousada" className="data-[state=active]:bg-blue-700">
                    Pousadas
                  </TabsTrigger>
                  <TabsTrigger value="casa" className="data-[state=active]:bg-blue-700">
                    Casas
                  </TabsTrigger>
                  <TabsTrigger value="apartamento" className="data-[state=active]:bg-blue-700">
                    Apartamentos
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFavorites(!showFavorites)}
                className={cn("border-blue-500 text-white hover:bg-blue-800", showFavorites && "bg-blue-700")}
              >
                <Heart className={cn("w-4 h-4 mr-2", showFavorites && "fill-red-500 text-red-500")} />
                Favoritos ({favorites.length})
              </Button>
            </div>
            <div className="text-sm text-gray-300">{filteredProperties.length} opções encontradas</div>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="container mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-[#0c1d52] rounded-lg overflow-hidden border border-blue-800 flex flex-col"
            >
              <div className="relative h-64">
                {/* Image carousel */}
                <div className="relative w-full h-full">
                  <Image
                    src={property.images[activeImageIndex[property.id] || 0].url || "/placeholder.svg"}
                    alt={property.images[activeImageIndex[property.id] || 0].alt}
                    fill
                    className="object-cover transition-opacity duration-300"
                  />

                  {/* Navigation arrows */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          navigateImages(property.id, "prev")
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          navigateImages(property.id, "next")
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {property.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 rounded-full px-2 py-1 text-xs">
                      {(activeImageIndex[property.id] || 0) + 1} / {property.images.length}
                    </div>
                  )}
                </div>

                {/* Price tag */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold px-2 py-1 rounded-md text-sm">
                  {property.priceRange}
                </div>

                {/* Property type badge */}
                <div className="absolute top-2 left-2">
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    {property.type === "hotel" && "Hotel"}
                    {property.type === "pousada" && "Pousada"}
                    {property.type === "casa" && "Casa"}
                    {property.type === "apartamento" && "Apartamento"}
                  </Badge>
                </div>

                {/* Favorite button */}
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute bottom-2 right-2 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                  aria-label={favorites.includes(property.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart
                    className={cn(
                      "w-5 h-5",
                      favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-white",
                    )}
                  />
                </button>
              </div>

              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{property.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1">{property.rating}</span>
                  </div>
                </div>

                {/* Property type and capacity */}
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-300">
                  {property.type === "casa" || property.type === "apartamento" ? (
                    <>
                      {property.rooms && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>
                            {property.rooms} {property.rooms === 1 ? "quarto" : "quartos"}
                          </span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>
                            {property.bathrooms} {property.bathrooms === 1 ? "banheiro" : "banheiros"}
                          </span>
                        </div>
                      )}
                      {property.capacity && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {property.capacity} {property.capacity === 1 ? "hóspede" : "hóspedes"}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      <span>{property.type === "hotel" ? "Hotel" : "Pousada"}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 mb-4 text-sm line-clamp-2">{property.description}</p>

                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="text-red-500 mt-1 flex-shrink-0 w-4 h-4" />
                  <p className="text-sm text-gray-300">{property.address}</p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Car className="text-blue-400 w-4 h-4" />
                  <p className="text-sm text-gray-300">{property.distanceToEvent}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {property.amenities.slice(0, 4).map((amenity, index) => (
                    <div key={index} className="flex items-center bg-[#081235] px-2 py-1 rounded-md text-xs">
                      {amenity.icon}
                      <span className="ml-1">{amenity.name}</span>
                    </div>
                  ))}
                  {property.amenities.length > 4 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="bg-[#081235] px-2 py-1 rounded-md text-xs hover:bg-[#0a1744]">
                          +{property.amenities.length - 4} mais
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#0c1d52] text-white border-blue-800">
                        <h3 className="text-lg font-bold mb-4">Comodidades de {property.name}</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {property.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2">
                              {amenity.icon}
                              <span>{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {/* Host information for houses and apartments */}
                {(property.type === "casa" || property.type === "apartamento") && property.host && (
                  <div className="border-t border-blue-800 pt-3 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={property.host.avatar || "/placeholder.svg?height=50&width=50"}
                          alt={`Anfitrião ${property.host.name}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Anfitrião: {property.host.name}</p>
                        <div className="flex items-center text-xs text-gray-300">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                          <span>
                            {property.host.rating} • Responde em {property.host.responseRate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-blue-800 bg-[#081235]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{property.phone}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700 text-white">Ver detalhes</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0c1d52] text-white border-blue-800 max-w-3xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Image carousel */}
                        <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                          <Image
                            src={property.images[activeImageIndex[property.id] || 0].url}
                            alt={property.images[activeImageIndex[property.id] || 0].alt}
                            fill
                            className="object-cover"
                          />

                          {/* Navigation arrows */}
                          {property.images.length > 1 && (
                            <>
                              <button
                                onClick={() => navigateImages(property.id, "prev")}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
                                aria-label="Imagem anterior"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => navigateImages(property.id, "next")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
                                aria-label="Próxima imagem"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </>
                          )}

                          {/* Image counter */}
                          {property.images.length > 1 && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 rounded-full px-2 py-1 text-xs">
                              {(activeImageIndex[property.id] || 0) + 1} / {property.images.length}
                            </div>
                          )}
                        </div>

                        {/* Property details */}
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold">{property.name}</h2>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleFavorite(property.id)}
                                className="bg-[#081235] p-2 rounded-full hover:bg-[#0a1744]"
                                aria-label={
                                  favorites.includes(property.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"
                                }
                              >
                                <Heart
                                  className={cn(
                                    "w-5 h-5",
                                    favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-white",
                                  )}
                                />
                              </button>
                              <button
                                className="bg-[#081235] p-2 rounded-full hover:bg-[#0a1744]"
                                aria-label="Compartilhar"
                              >
                                <Share className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <Badge className="bg-blue-600">
                              {property.type === "hotel" && "Hotel"}
                              {property.type === "pousada" && "Pousada"}
                              {property.type === "casa" && "Casa"}
                              {property.type === "apartamento" && "Apartamento"}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1">{property.rating}</span>
                            </div>
                            {property.featured && (
                              <Badge className="bg-yellow-600">
                                <Award className="w-3 h-3 mr-1" /> Destaque
                              </Badge>
                            )}
                          </div>

                          <div className="mb-4">
                            <p className="text-gray-300">{property.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-start gap-2">
                              <MapPin className="text-red-500 mt-1 flex-shrink-0 w-4 h-4" />
                              <p className="text-sm text-gray-300">{property.address}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <Car className="text-blue-400 w-4 h-4" />
                              <p className="text-sm text-gray-300">{property.distanceToEvent}</p>
                            </div>

                            {property.type === "casa" || property.type === "apartamento" ? (
                              <>
                                {property.rooms && (
                                  <div className="flex items-center gap-2">
                                    <Bed className="w-4 h-4" />
                                    <span className="text-sm">
                                      {property.rooms} {property.rooms === 1 ? "quarto" : "quartos"}
                                    </span>
                                  </div>
                                )}
                                {property.bathrooms && (
                                  <div className="flex items-center gap-2">
                                    <Bath className="w-4 h-4" />
                                    <span className="text-sm">
                                      {property.bathrooms} {property.bathrooms === 1 ? "banheiro" : "banheiros"}
                                    </span>
                                  </div>
                                )}
                                {property.capacity && (
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm">
                                      {property.capacity} {property.capacity === 1 ? "hóspede" : "hóspedes"}
                                    </span>
                                  </div>
                                )}
                              </>
                            ) : null}

                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{property.phone}</span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h3 className="font-bold mb-2">Comodidades</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {property.amenities.slice(0, 6).map((amenity, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  {amenity.icon}
                                  <span>{amenity.name}</span>
                                </div>
                              ))}
                            </div>
                            {property.amenities.length > 6 && (
                              <button className="text-blue-400 text-sm mt-2 hover:underline">
                                Ver todas as {property.amenities.length} comodidades
                              </button>
                            )}
                          </div>

                          {/* Host information for houses and apartments */}
                          {(property.type === "casa" || property.type === "apartamento") && property.host && (
                            <div className="border-t border-blue-800 pt-4 mt-4">
                              <h3 className="font-bold mb-2">Sobre o anfitrião</h3>
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                  <Image
                                    src={property.host.avatar || "/placeholder.svg?height=50&width=50"}
                                    alt={`Anfitrião ${property.host.name}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{property.host.name}</p>
                                  <div className="flex items-center text-sm text-gray-300">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                    <span>
                                      {property.host.rating} • Responde em {property.host.responseRate}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="mt-6">
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Reservar agora</Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
            <span className="text-white">Localização das</span>
            <span className="block text-yellow-400">Hospedagens</span>
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
              title="Mapa das hospedagens"
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
            Os hotéis, pousadas e casas de Arcoverde ficam lotados durante o período do São João. Faça sua reserva o
            quanto antes para garantir o melhor preço e disponibilidade.
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

// Sample property data with expanded information
const properties: Property[] = [
  {
    id: "hotel-1",
    name: "Hotel São João Palace",
    description:
      "Hotel 4 estrelas com excelente localização, próximo ao Parque de Eventos. Oferece café da manhã incluso, piscina e estacionamento gratuito. Quartos espaçosos com ar-condicionado e TV a cabo.",
    address: "Av. Dom Pedro II, 850, Centro, Arcoverde",
    phone: "(87) 3821-5678",
    priceRange: "R$ 250 - R$ 450",
    rating: 4.7,
    type: "hotel",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Fachada do Hotel São João Palace" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Lobby do Hotel São João Palace" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Quarto do Hotel São João Palace" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Piscina do Hotel São João Palace" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
      { name: "Piscina", icon: <Bath className="w-3 h-3" /> },
      { name: "Ar-condicionado", icon: <Snowflake className="w-3 h-3" /> },
      { name: "Restaurante", icon: <Utensils className="w-3 h-3" /> },
      { name: "TV a cabo", icon: <Tv className="w-3 h-3" /> },
    ],
    distanceToEvent: "500m do Parque de Eventos",
    featured: true,
  },
  {
    id: "hotel-2",
    name: "Pousada Forró e Tradição",
    description:
      "Pousada aconchegante com decoração típica nordestina. Quartos confortáveis e ambiente familiar, ideal para quem busca tranquilidade. Café da manhã regional com tapioca e cuscuz.",
    address: "Rua das Flores, 123, Bairro São Cristóvão, Arcoverde",
    phone: "(87) 3821-4321",
    priceRange: "R$ 150 - R$ 250",
    rating: 4.5,
    type: "pousada",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Entrada da Pousada Forró e Tradição" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Quarto da Pousada Forró e Tradição" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Área comum da Pousada Forró e Tradição" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Ar-condicionado", icon: <Snowflake className="w-3 h-3" /> },
    ],
    distanceToEvent: "1,2km do Parque de Eventos",
  },
  {
    id: "hotel-3",
    name: "Hotel Central Arcoverde",
    description:
      "Hotel moderno no centro da cidade, com fácil acesso a restaurantes e comércio. Oferece serviço de quarto 24h e academia. Ideal para viajantes a negócios e turistas.",
    address: "Av. Principal, 500, Centro, Arcoverde",
    phone: "(87) 3821-7890",
    priceRange: "R$ 200 - R$ 350",
    rating: 4.3,
    type: "hotel",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Fachada do Hotel Central Arcoverde" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Recepção do Hotel Central Arcoverde" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Quarto do Hotel Central Arcoverde" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Academia do Hotel Central Arcoverde" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
      { name: "Academia", icon: <Users className="w-3 h-3" /> },
      { name: "Ar-condicionado", icon: <Snowflake className="w-3 h-3" /> },
      { name: "Serviço de quarto", icon: <Utensils className="w-3 h-3" /> },
    ],
    distanceToEvent: "800m do Parque de Eventos",
  },
  {
    id: "casa-1",
    name: "Casa Junina com Piscina",
    description:
      "Linda casa com decoração junina, piscina privativa e churrasqueira. Perfeita para famílias ou grupos de amigos que querem aproveitar o São João com conforto e privacidade.",
    address: "Rua dos Ipês, 78, Bairro Novo, Arcoverde",
    phone: "(87) 99876-5432",
    priceRange: "R$ 350 - R$ 450/dia",
    rating: 4.9,
    type: "casa",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Fachada da Casa Junina" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Sala de estar da Casa Junina" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Piscina da Casa Junina" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Quarto principal da Casa Junina" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Área de churrasqueira da Casa Junina" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Piscina privativa", icon: <Bath className="w-3 h-3" /> },
      { name: "Churrasqueira", icon: <Utensils className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
      { name: "Ar-condicionado", icon: <Snowflake className="w-3 h-3" /> },
      { name: "TV a cabo", icon: <Tv className="w-3 h-3" /> },
      { name: "Cozinha completa", icon: <Utensils className="w-3 h-3" /> },
    ],
    distanceToEvent: "1,5km do Parque de Eventos",
    rooms: 3,
    bathrooms: 2,
    capacity: 8,
    host: {
      name: "Maria da Silva",
      rating: 4.8,
      responseRate: "1 hora",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    featured: true,
  },
  {
    id: "apartamento-1",
    name: "Apartamento Central com Vista",
    description:
      "Apartamento moderno e bem localizado, com vista para a cidade. A apenas 5 minutos a pé do Parque de Eventos. Totalmente mobiliado e equipado para sua estadia durante o festival.",
    address: "Edifício Central, Apto 502, Centro, Arcoverde",
    phone: "(87) 99765-4321",
    priceRange: "R$ 200 - R$ 300/dia",
    rating: 4.6,
    type: "apartamento",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Sala do Apartamento Central" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Quarto do Apartamento Central" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Cozinha do Apartamento Central" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Vista da varanda do Apartamento Central" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Ar-condicionado", icon: <Snowflake className="w-3 h-3" /> },
      { name: "TV a cabo", icon: <Tv className="w-3 h-3" /> },
      { name: "Cozinha equipada", icon: <Utensils className="w-3 h-3" /> },
      { name: "Elevador", icon: <ChevronUp className="w-3 h-3" /> },
      { name: "Varanda", icon: <Wind className="w-3 h-3" /> },
    ],
    distanceToEvent: "400m do Parque de Eventos",
    rooms: 2,
    bathrooms: 1,
    capacity: 4,
    host: {
      name: "João Pereira",
      rating: 4.7,
      responseRate: "30 minutos",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "casa-2",
    name: "Chalé Sertanejo",
    description:
      "Chalé rústico com decoração típica do sertão nordestino. Ambiente tranquilo e aconchegante, ideal para casais ou pequenas famílias que buscam uma experiência autêntica.",
    address: "Estrada do Sertão, Km 3, Zona Rural, Arcoverde",
    phone: "(87) 99888-7777",
    priceRange: "R$ 180 - R$ 250/dia",
    rating: 4.8,
    type: "casa",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Fachada do Chalé Sertanejo" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Interior do Chalé Sertanejo" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Área externa do Chalé Sertanejo" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
      { name: "Rede de descanso", icon: <Wind className="w-3 h-3" /> },
      { name: "Fogão a lenha", icon: <Utensils className="w-3 h-3" /> },
    ],
    distanceToEvent: "3,5km do Parque de Eventos",
    rooms: 1,
    bathrooms: 1,
    capacity: 3,
    host: {
      name: "Antônio Nunes",
      rating: 4.9,
      responseRate: "2 horas",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "pousada-1",
    name: "Pousada Cantinho do Sertão",
    description:
      "Pousada rústica com ambiente acolhedor e café da manhã regional. Quartos simples mas confortáveis, com ótimo custo-benefício. Atendimento familiar e acolhedor.",
    address: "Rua do Forró, 45, Bairro São Miguel, Arcoverde",
    phone: "(87) 3821-2345",
    priceRange: "R$ 120 - R$ 200",
    rating: 4.2,
    type: "pousada",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Entrada da Pousada Cantinho do Sertão" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Quarto da Pousada Cantinho do Sertão" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Café da manhã da Pousada Cantinho do Sertão" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Ventilador", icon: <Wind className="w-3 h-3" /> },
    ],
    distanceToEvent: "1,5km do Parque de Eventos",
  },
  {
    id: "apartamento-2",
    name: "Flat São João",
    description:
      "Flat moderno e funcional, perfeito para quem busca praticidade durante o festival. Localizado em prédio com segurança 24h e próximo aos principais polos do São João.",
    address: "Rua das Bandeiras, 210, Centro, Arcoverde",
    phone: "(87) 99123-4567",
    priceRange: "R$ 180 - R$ 250/dia",
    rating: 4.4,
    type: "apartamento",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Sala do Flat São João" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Quarto do Flat São João" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Cozinha do Flat São João" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Ar-condicionado", icon: <Snowflake className="w-3 h-3" /> },
      { name: "TV a cabo", icon: <Tv className="w-3 h-3" /> },
      { name: "Cozinha compacta", icon: <Utensils className="w-3 h-3" /> },
      { name: "Segurança 24h", icon: <Users className="w-3 h-3" /> },
    ],
    distanceToEvent: "700m do Parque de Eventos",
    rooms: 1,
    bathrooms: 1,
    capacity: 2,
    host: {
      name: "Ana Carvalho",
      rating: 4.5,
      responseRate: "1 hora",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "hotel-4",
    name: "Grande Hotel Arcoverde",
    description:
      "O mais tradicional hotel da cidade, com amplos quartos e excelente serviço. Restaurante próprio com culinária regional e internacional. Estrutura completa para sua estadia.",
    address: "Praça Central, 100, Centro, Arcoverde",
    phone: "(87) 3821-0001",
    priceRange: "R$ 280 - R$ 500",
    rating: 4.8,
    type: "hotel",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Fachada do Grande Hotel Arcoverde" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Lobby do Grande Hotel Arcoverde" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Quarto do Grande Hotel Arcoverde" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Restaurante do Grande Hotel Arcoverde" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Piscina do Grande Hotel Arcoverde" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Café da manhã", icon: <Coffee className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
      { name: "Piscina", icon: <Bath className="w-3 h-3" /> },
      { name: "Ar-condicionado", icon: <Snowflake className="w-3 h-3" /> },
      { name: "Restaurante", icon: <Utensils className="w-3 h-3" /> },
      { name: "Academia", icon: <Users className="w-3 h-3" /> },
    ],
    distanceToEvent: "600m do Parque de Eventos",
    featured: true,
  },
  {
    id: "casa-3",
    name: "Casa Família Junina",
    description:
      "Casa espaçosa ideal para grupos grandes ou famílias. Quintal amplo com área de churrasco e espaço para crianças. Localizada em bairro tranquilo e seguro, próximo ao centro.",
    address: "Rua das Palmeiras, 45, Bairro Boa Vista, Arcoverde",
    phone: "(87) 99555-1234",
    priceRange: "R$ 400 - R$ 500/dia",
    rating: 4.7,
    type: "casa",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Fachada da Casa Família Junina" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Sala de estar da Casa Família Junina" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Quintal da Casa Família Junina" },
      { url: "/placeholder.svg?height=400&width=600", alt: "Cozinha da Casa Família Junina" },
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
      { name: "Churrasqueira", icon: <Utensils className="w-3 h-3" /> },
      { name: "Estacionamento", icon: <Car className="w-3 h-3" /> },
      { name: "Ar-condicionado", icon: <Snowflake className="w-3 h-3" /> },
      { name: "TV a cabo", icon: <Tv className="w-3 h-3" /> },
      { name: "Cozinha completa", icon: <Utensils className="w-3 h-3" /> },
      { name: "Área para crianças", icon: <Users className="w-3 h-3" /> },
    ],
    distanceToEvent: "2km do Parque de Eventos",
    rooms: 4,
    bathrooms: 3,
    capacity: 12,
    host: {
      name: "Roberto Almeida",
      rating: 4.6,
      responseRate: "3 horas",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
]
