"use client"

import { Hero } from "@/components/molecules/hero/hero"
import { PartyScheduleSwiper } from "@/components/molecules/party-schedule-swiper/party-schedule-swiper"
import { Features } from "@/components/molecules/features/features"
import { Location } from "@/components/organisms/location/location"
import { BasicInformation } from "@/components/molecules/basic-information/basic-information"
import { Footer } from "@/components/molecules/footer/footer"
import { Sponsors } from "@/components/molecules/sponsors/sponsors"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/images/stars-bg.avif" type="image/avif" />
      </Head>
      <Hero />
      <PartyScheduleSwiper />
      <Features />
      <Location />
      <BasicInformation />
      <Sponsors />
      <Footer />
    </>)
}