"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, Phone, MapPin, Clock, ChevronDown, Shield, Heart, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

// Define types for our service data
type Service = {
  id: string
  name: string
  description: string
  address: string
  phone: string
  email?: string
  hours?: string
  category: "police" | "women" | "children" | "health" | "emergency"
  icon: React.ReactNode
}

export default function ServicosPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const polos = [
    { name: "Polo do Cruzeiro", slug: "cruzeiro" },
    { name: "Polo da Poesia", slug: "poesia" },
    { name: "Polo Gospel", slug: "gospel" },
    { name: "Polo das Quadrilhas", slug: "quadrilhas" },
    { name: "Polo Gastronômico", slug: "gastronomico" },
    { name: "Polo Cultural", slug: "cultural" },
  ]

  return (
    <>


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
              <h1 className="text-3xl md:text-4xl font-bold">Serviços Essenciais</h1>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-yellow-400" />
              <span className="text-yellow-400 font-bold">14 a 28 de Junho, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Tabs */}
      <div className="container mx-auto py-6">
        <div className="bg-[#0c1d52] p-4 rounded-lg mb-8">
          <p className="text-center text-lg mb-4">
            Durante o período do São João, estes serviços essenciais estarão disponíveis para garantir sua segurança e
            bem-estar.
          </p>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-5 bg-[#081235] p-1 mb-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-700">
                Todos
              </TabsTrigger>
              <TabsTrigger value="police" className="data-[state=active]:bg-blue-700">
                Polícia
              </TabsTrigger>
              <TabsTrigger value="women" className="data-[state=active]:bg-blue-700">
                Delegacia da Mulher
              </TabsTrigger>
              <TabsTrigger value="children" className="data-[state=active]:bg-blue-700">
                Conselho Tutelar
              </TabsTrigger>
              <TabsTrigger value="emergency" className="data-[state=active]:bg-blue-700">
                Emergência
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="police" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter((service) => service.category === "police")
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="women" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter((service) => service.category === "women")
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="children" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter((service) => service.category === "children")
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter((service) => service.category === "emergency")
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Emergency Numbers Section */}
      <section className="py-8 bg-[#081235]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-white">Números de</span>
            <span className="block text-yellow-400">Emergência</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0c1d52] p-4 rounded-lg text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">SAMU</h3>
              <p className="text-3xl font-bold text-red-500">192</p>
            </div>
            <div className="bg-[#0c1d52] p-4 rounded-lg text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Polícia Militar</h3>
              <p className="text-3xl font-bold text-blue-500">190</p>
            </div>
            <div className="bg-[#0c1d52] p-4 rounded-lg text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Bombeiros</h3>
              <p className="text-3xl font-bold text-orange-500">193</p>
            </div>
            <div className="bg-[#0c1d52] p-4 rounded-lg text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Disque Denúncia</h3>
              <p className="text-3xl font-bold text-purple-500">181</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#0a1744]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-white">Localização dos</span>
            <span className="block text-yellow-400">Serviços</span>
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
              title="Mapa dos serviços"
              className="w-full h-full"
            ></iframe>
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
    </>
  )
}

// Service Card Component
function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-[#081235] rounded-lg overflow-hidden border border-blue-800 flex flex-col h-full">
      <div className="p-4 flex-grow">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-full">{service.icon}</div>
          <div>
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-sm text-gray-300">{service.description}</p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-2">
            <MapPin className="text-red-500 mt-1 flex-shrink-0 w-4 h-4" />
            <p className="text-sm text-gray-300">{service.address}</p>
          </div>

          <div className="flex items-start gap-2">
            <Phone className="text-green-500 mt-1 flex-shrink-0 w-4 h-4" />
            <p className="text-sm text-gray-300">{service.phone}</p>
          </div>

          {service.email && (
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-300">{service.email}</p>
            </div>
          )}

          {service.hours && (
            <div className="flex items-start gap-2">
              <Clock className="text-yellow-400 mt-1 flex-shrink-0 w-4 h-4" />
              <p className="text-sm text-gray-300">{service.hours}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-blue-800 bg-[#0c1d52]">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Ligar Agora</Button>
      </div>
    </div>
  )
}

// Sample services data
const services: Service[] = [
  {
    id: "police-1",
    name: "Delegacia de Polícia Civil",
    description: "Delegacia central para registro de ocorrências e atendimento ao público.",
    address: "Av. Dom Pedro II, 450, Centro, Arcoverde - PE",
    phone: "(87) 3821-8765",
    email: "delegacia.arcoverde@policiacivil.pe.gov.br",
    hours: "24 horas",
    category: "police",
    icon: <Shield className="w-6 h-6 text-white" />,
  },
  {
    id: "police-2",
    name: "Batalhão da Polícia Militar",
    description: "Unidade da Polícia Militar responsável pelo policiamento ostensivo.",
    address: "Rua Coronel Antônio Japiassu, 320, Centro, Arcoverde - PE",
    phone: "(87) 3821-1190",
    hours: "24 horas",
    category: "police",
    icon: <Shield className="w-6 h-6 text-white" />,
  },
  {
    id: "women-1",
    name: "Delegacia da Mulher",
    description: "Delegacia especializada no atendimento às mulheres vítimas de violência.",
    address: "Rua Antônio Japiassu, 280, Centro, Arcoverde - PE",
    phone: "(87) 3821-8770",
    email: "delegacia.mulher@policiacivil.pe.gov.br",
    hours: "Segunda a Sexta, 8h às 18h (Plantão 24h durante o São João)",
    category: "women",
    icon: <Heart className="w-6 h-6 text-white" />,
  },
  {
    id: "children-1",
    name: "Conselho Tutelar",
    description:
      "Órgão permanente e autônomo encarregado de zelar pelo cumprimento dos direitos da criança e do adolescente.",
    address: "Rua José Bonifácio, 120, Centro, Arcoverde - PE",
    phone: "(87) 3821-4567",
    email: "conselhotutelar@arcoverde.pe.gov.br",
    hours: "Segunda a Sexta, 8h às 17h (Plantão 24h durante o São João)",
    category: "children",
    icon: <Users className="w-6 h-6 text-white" />,
  },
  {
    id: "children-2",
    name: "Centro de Referência da Criança e Adolescente",
    description:
      "Centro especializado no atendimento e proteção de crianças e adolescentes em situação de vulnerabilidade.",
    address: "Rua das Flores, 230, São Cristóvão, Arcoverde - PE",
    phone: "(87) 3821-4570",
    hours: "Segunda a Sexta, 8h às 17h",
    category: "children",
    icon: <Users className="w-6 h-6 text-white" />,
  },
  {
    id: "emergency-1",
    name: "Hospital Regional de Arcoverde",
    description: "Hospital público com pronto-socorro e atendimento de emergência 24 horas.",
    address: "Av. José Bonifácio, 650, Centro, Arcoverde - PE",
    phone: "(87) 3821-3000",
    hours: "24 horas",
    category: "emergency",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        key="hospital-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    id: "emergency-2",
    name: "SAMU - Serviço de Atendimento Móvel de Urgência",
    description: "Serviço de atendimento médico de emergência com ambulâncias.",
    address: "Base Central: Av. Dom Pedro II, 800, Centro, Arcoverde - PE",
    phone: "192",
    hours: "24 horas",
    category: "emergency",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        key="samu-icon"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "emergency-3",
    name: "Corpo de Bombeiros",
    description: "Unidade do Corpo de Bombeiros para atendimento de emergências e resgates.",
    address: "Rua Coronel Antônio Japiassu, 350, Centro, Arcoverde - PE",
    phone: "193",
    hours: "24 horas",
    category: "emergency",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        key="bombeiros-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
      </svg>
    ),
  },
]

