"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, Calendar, Clock, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useDictionary } from "@/hooks/use-dictionary"
import { useParams } from "next/navigation"
import { mainStage } from "@/constants/main-stage"


export default function DailySchedule() {
  const [expandedDay, setExpandedDay] = useState<number | null>(null)

  const dictionary: any = useDictionary();
  const params = useParams();
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;

  const toggleDay = (dayId: number) => {
    setExpandedDay(expandedDay === dayId ? null : dayId)
  }

  return (
    <div className="bg-[#071242] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-white">Programação</span>
            <span className="block text-[#F9A61A]">Diária</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Confira a programação completa do São João de Arcoverde 2025, com os melhores artistas do forró e da música
            nordestina.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {mainStage.map((day) => (
            <div key={day.id} className="bg-[#0c1d52] rounded-lg overflow-hidden border border-blue-800">
              <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => toggleDay(day.id)}>
                <div className="flex items-center gap-4">
                  <div className="bg-[#F9A61A] text-[#071242] w-16 h-16 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs font-bold">{day.dayName}</span>
                    <span className="text-xl font-bold">{day.dayNumber}</span>
                    <span className="text-xs font-bold">{day.month}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{day.artists.join(" • ")}</h3>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Calendar className="w-4 h-4 text-[#F9A61A]" />
                      <span>{day.date}</span>
                      <span className="mx-2">|</span>
                      <Clock className="w-4 h-4 text-[#F9A61A]" />
                      <span>A partir das 19h</span>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-[#F9A61A] transition-transform duration-300 ${expandedDay === day.id ? "rotate-180" : ""
                    }`}
                />
              </div>

              <AnimatePresence>
                {expandedDay === day.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t border-blue-800">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
                            <Image
                              src={day.image}
                              alt={`São João de Arcoverde - ${day.date}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:w-2/3">
                          <h4 className="text-lg font-bold text-[#F9A61A] mb-4">Programação do Dia</h4>
                          <div className="space-y-4">
                            {day.schedule.map((item, index) => (
                              <div key={index} className="flex items-start gap-4 bg-[#081235] p-3 rounded-lg">
                                <div className="bg-[#0c1d52] text-white px-3 py-2 rounded-md text-center min-w-[80px]">
                                  <span className="block font-bold">{item.time}</span>
                                </div>
                                <div>
                                  <h5 className="font-bold text-white">{item.artist}</h5>
                                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <MapPin className="w-4 h-4 text-[#F9A61A]" />
                                    <span>{item.stage}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 flex justify-end">
                            <Button className="bg-[#F9A61A] hover:bg-[#F2960F] text-[#071242] font-bold">
                              <Link href={`/${lang}/programacao`}>
                                {dictionary.schedule.viewAllBtn}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-8">
        <Link href={`/${lang}/programacao`}>
          <Button className="bg-[#F9A61A] hover:bg-[#F2960F] text-[#071242] font-bold">
            {dictionary.schedule.viewAllBtn}
          </Button>
        </Link>
      </div>
    </div>
  )
}
