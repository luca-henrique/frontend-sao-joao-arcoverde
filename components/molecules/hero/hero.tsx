"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { CountdownTimer } from "../countdown-time/countdown-time"
import Image from "next/image"
import Logo from "@/assets/Logo1.svg"

export const Hero = () => {
  return (
    <section id="home" className="relative py-16 md:py-4 overflow-hidden h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1744] to-[#0c1d52] opacity-90" />
        <div className="absolute w-full min-h-screen bg-cover inset-0 bg-[url('/images/stars-bg.png')] bg-no-repeat opacity-60 " />
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

          <div className="relative max-w-4xl mx-auto">


            <Image src={Logo} width={600} alt="logo" className="bg-cover" />

            <div className="space-y-4 mb-8">
              <p className="text-2xl md:text-3xl text-teal-300 font-bold flavors-font mb-1">14 A 28 DE JUNHO de 2025</p>

              <div className="mt-6">
                <CountdownTimer targetDate="2025-06-14" />
              </div>
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


    </section>
  )
}