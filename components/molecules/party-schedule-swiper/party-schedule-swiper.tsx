"use client"

import { useDictionary } from "@/hooks/use-dictionary"
import { useState } from "react"
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
    <section id="programacao" className="py-16 bg-[#071242]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-white">{dictionary.schedule.title1}</span>
          <span className="block text-[#F9A61A]">{dictionary.schedule.title2}</span>
        </h2>

        {/* Day Navigation - Horizontal Scrollable */}
        <div className="mb-8 overflow-hidden">
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-[#071242] to-transparent w-12 h-full pointer-events-none"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-[#071242] to-transparent w-12 h-full pointer-events-none"></div>

            <div className="flex overflow-x-auto py-2 scrollbar-hide">
              <div className="flex space-x-2 px-4">
                {Array.from({ length: 15 }, (_, i) => {
                  const date = new Date(2025, 5, 14 + i); // June is 5 (0-indexed)
                  const dayName = new Intl.DateTimeFormat(params.lang === 'pt' ? 'pt-BR' : params.lang === 'es' ? 'es-ES' : 'en-US', { weekday: 'short' }).format(date);
                  const dayNum = date.getDate();
                  const formattedDate = `${dayNum < 10 ? '0' : ''}${dayNum}.JUN`;

                  return (
                    <button
                      key={formattedDate}
                      onClick={() => setActiveDay(formattedDate)}
                      className={`flex flex-col items-center justify-center min-w-[80px] py-3 px-4 rounded-lg transition-all ${activeDay === formattedDate
                        ? "bg-[#FFF1B8] text-[#071242] shadow-lg transform scale-105 font-bold"
                        : "bg-[#1C2769] text-white hover:bg-[#27348B]"
                        }`}
                    >
                      <span className="text-xs font-medium uppercase">{dayName}</span>
                      <span className="text-lg font-bold">{dayNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Day Display */}
          <div className="text-center mt-4">
            <p className="text-xl font-bold text-[#F9A61A]">
              {selectedDay?.fullDate || ""}
            </p>
          </div>
        </div>

        {/* Stages Swiper */}
        <div className="relative mb-8">
          {/* Navigation Arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#1C2769] hover:bg-[#27348B] text-white rounded-full p-3 shadow-lg -ml-4 md:block transition-opacity duration-300"
            onClick={() => {
              const container = document.getElementById('stages-container');
              if (container) {
                container.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
            id="stages-prev-button"
            aria-label="Ver palcos anteriores"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#1C2769] hover:bg-[#27348B] text-white rounded-full p-3 shadow-lg -mr-4 md:block transition-opacity duration-300"
            onClick={() => {
              const container = document.getElementById('stages-container');
              if (container) {
                container.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
            id="stages-next-button"
            aria-label="Ver próximos palcos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Stages Container */}
          <div
            id="stages-container"
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {Object.entries(attractionsByPole).map(([pole, attractions], index) => {
              // Cores neutras para todos os palcos
              const colors = {
                bg: "#1C2769", // azul escuro
                header: "#0c1d52", // azul mais escuro
                card: "#071242", // azul ainda mais escuro
                text: "#FFF1B8" // texto em tom claro
              };

              return (
                <div
                  key={pole}
                  className={`rounded-lg overflow-hidden min-w-[300px] flex-shrink-0 snap-start`}
                  style={{ backgroundColor: colors.bg }}
                >
                  <div className="p-4 text-center border-b border-opacity-20 border-white" style={{ backgroundColor: colors.header }}>
                    <h3 className="text-xl font-bold text-white">{pole}</h3>
                    <p className="text-lg font-bold" style={{ color: colors.text }}>{selectedDay?.date}</p>
                  </div>
                  <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                    {attractions.map((attraction, index) => (
                      <div key={index} className="p-4 rounded-md text-center" style={{ backgroundColor: colors.card }}>
                        <h4 className="text-lg font-bold text-white">{attraction.name}</h4>
                        {attraction.artist && <p className="text-[#F9A61A]">{attraction.artist}</p>}
                        <p className="mt-1" style={{ color: colors.text }}>{attraction.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href={`/${params.lang}/programacao`}>
            <Button className="bg-[#F9A61A] hover:bg-[#F2960F] text-[#071242] font-bold">
              {dictionary.schedule.viewAllBtn}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}