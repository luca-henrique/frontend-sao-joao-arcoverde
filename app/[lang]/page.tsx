"use client"

import { Hero } from "@/components/molecules/hero/hero"
import { PartyScheduleSwiper } from "@/components/molecules/party-schedule-swiper/party-schedule-swiper"
import { Features } from "@/components/molecules/features/features"
import { Location } from "@/components/organisms/location/location"
import { BasicInformation } from "@/components/molecules/basic-information/basic-information"
import { Footer } from "@/components/molecules/footer/footer"
import { Sponsors } from "@/components/molecules/sponsors/sponsors"

export default function Home() {
  return (
    <>

      <Hero />
      <PartyScheduleSwiper />
      <Features />
      <Location />
      <BasicInformation />
      <Sponsors />
      <Footer />
    </>)
}