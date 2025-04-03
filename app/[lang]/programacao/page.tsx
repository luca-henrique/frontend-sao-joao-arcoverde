"use client"


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/molecules/footer/footer"
import { useState } from "react"


export default function ProgramacaoPage() {

  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedDay, setSelectedDay] = useState("all");
  const [selectedPole, setSelectedPole] = useState("");

  const allDays = new Set(scheduleData.map(day => day.date));
  const allPoles = new Set(scheduleData.flatMap(day => day.attractions.map(attraction => attraction.pole)));



  const filteredSchedule = scheduleData
    .filter((day) => selectedDay === "all" || day.date === selectedDay)
    .map((day) => ({
      ...day,
      attractions: day.attractions.filter(
        (attraction) =>
          (selectedArtist === "" || attraction.name.toLowerCase().includes(selectedArtist.toLowerCase())) &&
          (selectedPole === "all" || attraction.pole === selectedPole)
      ),
    }))
    .filter((day) => day.attractions.length > 0);



  return (
    <>
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

      <div className="container mx-auto py-6">
        <div className="bg-[#0c1d52] p-4 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar artista ou atração..."
                className="pl-10 bg-[#081235] border-blue-800 text-white"
                onChange={(event) => setSelectedArtist(event.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select onValueChange={(e) => setSelectedDay(e)}>
                <SelectTrigger className="w-[180px] bg-[#081235] border-blue-800 text-white">
                  <SelectValue placeholder="Filtrar por dia" />
                </SelectTrigger>
                <SelectContent className="bg-[#081235] border-blue-800 text-white" >
                  <SelectItem value="all">Todos os dias</SelectItem>
                  {Array.from(allDays).map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(e) => setSelectedPole(e)}>
                <SelectTrigger className="w-[180px] bg-[#081235] border-blue-800 text-white">
                  <SelectValue placeholder="Filtrar por polo" />
                </SelectTrigger>
                <SelectContent className="bg-[#081235] border-blue-800 text-white">
                  <SelectItem value="all">Todos os polos</SelectItem>
                  {Array.from(allPoles).map((pole) => (
                    <SelectItem key={pole} value={pole}>
                      {pole}
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>

            </div>
          </div>
        </div>
      </div>

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
              {filteredSchedule.map((day) => (
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

      <section className="bg-[#0c1d52] py-12 border-t border-blue-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Baixe a Programação Completa</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Tenha a programação completa do São João de Arcoverde 2025 no seu celular para não perder nenhuma atração.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">Download PDF</Button>
        </div>
      </section>

      <Footer />
    </>
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

