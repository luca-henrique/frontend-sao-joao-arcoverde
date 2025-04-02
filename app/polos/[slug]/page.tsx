"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, MapPin, Clock, Music } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



// Define the types for our data
type Attraction = {
  name: string
  artist: string
  time: string
  pole: string
  description?: string
}

type ScheduleDay = {
  dayName: string
  date: string
  color: string
  attractions: Attraction[]
}

// This is a dynamic page that will be generated for each pole
export default function PoloPage({ params }: { params: { slug: string } }) {
  // Get the pole slug from the URL
  const { slug } = params

  // Get the pole information based on the slug
  const poleInfo = getPoleInfo(slug)

  // Filter the schedule data to only show attractions for this pole
  const poleSchedule = scheduleData
    .map((day) => ({
      ...day,
      attractions: day.attractions.filter(
        (attraction) =>
          attraction.pole.toLowerCase().includes(poleInfo.name.toLowerCase()) ||
          (slug === "quadrilhas" && attraction.pole.toLowerCase().includes("quadrilha")),
      ),
    }))
    .filter((day) => day.attractions.length > 0)


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
              <Link href="/programacao" className="text-gray-400 hover:text-white">
                Programação
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <h1 className="text-3xl md:text-4xl font-bold">{poleInfo.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-yellow-400" />
              <span className="text-yellow-400 font-bold">14 a 28 de Junho, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pole Info */}
      <div className="container mx-auto py-8">
        <div className="bg-[#0c1d52] p-6 rounded-lg border border-blue-800 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center">{poleInfo.icon}</div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">{poleInfo.name}</h2>
              <p className="text-gray-300 mb-4">{poleInfo.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <MapPin className="text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Localização:</p>
                    <p className="text-gray-300">{poleInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Horário de Funcionamento:</p>
                    <p className="text-gray-300">{poleInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="container mx-auto pb-16">
        <h2 className="text-2xl font-bold mb-6">Programação do {poleInfo.name}</h2>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-end mb-6">
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {poleSchedule.map((day) => (
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
                        <p className="font-bold text-white">{attraction.name}</p>
                        {attraction.artist && <p className="text-yellow-400">{attraction.artist}</p>}
                        <p className="text-gray-300 text-sm mt-1">{attraction.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="space-y-6">
              {poleSchedule.map((day) => (
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
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{attraction.name}</h3>
                              {attraction.artist && <p className="text-yellow-400">{attraction.artist}</p>}
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

      {/* Related Poles */}
      <section className="bg-[#0c1d52] py-12 border-t border-blue-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Outros Polos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getRelatedPoles(slug).map((pole) => (
              <Link href={`/polos/${pole.slug}`} key={pole.slug}>
                <div className="bg-[#081235] p-6 rounded-lg border border-blue-800 hover:border-yellow-400 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                      {pole.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{pole.name}</h3>
                      <p className="text-gray-300 text-sm">{pole.shortDescription}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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

// Helper function to get pole information based on slug
function getPoleInfo(slug: string) {
  const poles = [
    {
      slug: "cruzeiro",
      name: "Polo do Cruzeiro",
      description:
        "O Polo do Cruzeiro é dedicado à música tradicional nordestina, com apresentações de trios de forró pé-de-serra, sanfoneiros e bandas regionais.",
      location: "Praça do Cruzeiro, Centro",
      hours: "15h às 22h",
      icon: <Music className="w-10 h-10 text-white" />,
      shortDescription: "Música tradicional nordestina",
    },
    {
      slug: "poesia",
      name: "Polo da Poesia",
      description:
        "Espaço dedicado à literatura de cordel, repentistas e poetas populares, celebrando a rica tradição literária nordestina.",
      location: "Praça da Cultura, Centro",
      hours: "15h às 21h",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      shortDescription: "Literatura de cordel e repentistas",
    },
    {
      slug: "gospel",
      name: "Polo Gospel",
      description: "Dedicado à música gospel e apresentações religiosas, com corais, cantores e grupos de louvor.",
      location: "Praça da Igreja Matriz, Centro",
      hours: "15h às 21h",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      shortDescription: "Música gospel e apresentações religiosas",
    },
    {
      slug: "quadrilhas",
      name: "Polo das Quadrilhas",
      description:
        "Espaço dedicado às tradicionais quadrilhas juninas, com apresentações de grupos de todas as idades.",
      location: "Quadra Poliesportiva Municipal",
      hours: "15h às 22h",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      shortDescription: "Quadrilhas juninas tradicionais",
    },
    {
      slug: "gastronomico",
      name: "Polo Gastronômico",
      description:
        "Dedicado à culinária típica nordestina, com barracas de comidas tradicionais, doces e bebidas juninas.",
      location: "Praça de Alimentação, Centro",
      hours: "15h às 00h",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      shortDescription: "Culinária típica nordestina",
    },
    {
      slug: "cultural",
      name: "Polo Cultural",
      description:
        "Espaço dedicado às manifestações culturais tradicionais, como o Samba de Coco, artesanato e exposições.",
      location: "Centro Cultural de Arcoverde",
      hours: "14h às 21h",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      shortDescription: "Manifestações culturais tradicionais",
    },
  ]

  return poles.find((pole) => pole.slug === slug) || poles[0]
}

// Helper function to get related poles (excluding the current one)
function getRelatedPoles(currentSlug: string) {
  const allPoles = [
    {
      slug: "cruzeiro",
      name: "Polo do Cruzeiro",
      shortDescription: "Música tradicional nordestina",
      icon: <Music className="w-6 h-6 text-white" />,
    },
    {
      slug: "poesia",
      name: "Polo da Poesia",
      shortDescription: "Literatura de cordel e repentistas",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      slug: "gospel",
      name: "Polo Gospel",
      shortDescription: "Música gospel e apresentações religiosas",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      slug: "quadrilhas",
      name: "Polo das Quadrilhas",
      shortDescription: "Quadrilhas juninas tradicionais",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      slug: "gastronomico",
      name: "Polo Gastronômico",
      shortDescription: "Culinária típica nordestina",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      slug: "cultural",
      name: "Polo Cultural",
      shortDescription: "Manifestações culturais tradicionais",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
  ]

  // Filter out the current pole and return 3 random related poles
  return allPoles
    .filter((pole) => pole.slug !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
}

// This is the same schedule data used in the main programacao page
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
  // Additional days would be included here
]

