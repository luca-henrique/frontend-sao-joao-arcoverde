"use client"

import { useDictionary } from "@/hooks/use-dictionary"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { allDays, Attraction } from "@/constants/all-days"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"


export const PartyScheduleSwiper = () => {
  const dictionary: any = useDictionary()
  const [activeDay, setActiveDay] = useState("14.JUN")
  const params = useParams()
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;


  const getAttractionsForDay = (date: string) => {
    const day = allDays.find((day) => day.date === date)
    if (!day) return {}

    const attractionsByPole: Record<string, Attraction[]> = {}

    day.attractions.forEach((attraction) => {
      if (!attractionsByPole[attraction.pole]) {
        attractionsByPole[attraction.pole] = []
      }
      attractionsByPole[attraction.pole].push(attraction)
    })

    return attractionsByPole
  }

  const attractionsByPole = getAttractionsForDay(activeDay)
  const selectedDay = allDays.find((day) => day.date === activeDay)

  return (
    <section id="programacao" className="py-16 bg-[#0a1744]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-white">{dictionary.schedule.title1}</span>
          <span className="block text-yellow-400">{dictionary.schedule.title2}</span>
        </h2>

        {/* Day Tabs */}
        <div className="mb-8">
          <Tabs defaultValue="14.JUN" value={activeDay} onValueChange={setActiveDay} className="w-full">
            <TabsList className="grid grid-cols-5 bg-[#0c1d52] p-0 rounded-lg overflow-hidden">
              {allDays.slice(0, 5).map((day) => (
                <TabsTrigger
                  aria-controls="radix-tab-content-junho"
                  key={day.date}
                  value={day.date}
                  className={`py-3 px-4 data-[state=active]:bg-white data-[state=active]:text-[#0a1744] data-[state=active]:shadow-none transition-colors`}
                >
                  {day.dayName} {day.date}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(attractionsByPole).map(([pole, attractions]) => (
            <div
              key={pole}
              className={`rounded-lg overflow-hidden ${pole === "Palco Principal"
                ? "bg-[#0c1d52]"
                : pole === "Palco Junino"
                  ? "bg-[#8B4513]"
                  : "bg-[#4B0082]"
                }`}
            >
              <div className="p-4 text-center border-b border-opacity-20 border-white">
                <h3 className="text-xl font-bold">{pole}</h3>
                <p className="text-2xl font-bold text-blue-400">{selectedDay?.date}</p>
              </div>
              <div className="p-4 space-y-2">
                {attractions.map((attraction, index) => (
                  <div key={index} className="bg-[#081235] p-4 rounded-md text-center">
                    <h4 className="text-lg font-bold">{attraction.name}</h4>
                    {attraction.artist && <p className="text-yellow-400">{attraction.artist}</p>}
                    <p className="text-gray-300 mt-1">{attraction.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href={`/${lang}/programacao`}>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              {dictionary.schedule.viewAllBtn}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}