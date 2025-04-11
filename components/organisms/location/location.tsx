'use client'

import { EventMap } from "@/components/molecules/event-map/event-map";
import ScrollReveal from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/use-dictionary";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, Mail, ExternalLink } from "lucide-react"

export const Location = () => {
  const dictionary: any = useDictionary();
  return (
    <section id="local" className="py-16 bg-[#0a1744]">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">
              <span className="text-white">{dictionary.location.title1}</span>
              <span className="block text-[#F9A61A]">{dictionary.location.title2}</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{dictionary.location.venueName}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ScrollReveal>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31559.02580989655!2d-37.07688368700576!3d-8.424344042880352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a98769f2e4d13d%3A0x96e7c63b83029a7!2sArcoverde%2C%20PE%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1711932000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa do local do evento"
              ></iframe>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-[#0c1d52] p-8 rounded-lg shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#F9A61A] mb-3">{dictionary.location.address.title}</h3>
                  <p className="text-white">{dictionary.location.address.line1}</p>
                  <p className="text-white">{dictionary.location.address.line2}</p>
                  <p className="text-white">{dictionary.location.address.line3}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#F9A61A] mb-3">{dictionary.location.hours.title}</h3>
                  <p className="text-white">{dictionary.location.hours.line1}</p>
                  <p className="text-white">{dictionary.location.hours.line2}</p>
                  <p className="text-white">{dictionary.location.hours.line3}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#F9A61A] mb-3">{dictionary.location.directions.title}</h3>
                  <p className="text-white">{dictionary.location.directions.line1}</p>
                  <p className="text-white">{dictionary.location.directions.line2}</p>
                  <p className="text-white">{dictionary.location.directions.line3}</p>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-4">
                  <a
                    href="https://maps.google.com/?q=Arcoverde,PE,Brasil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#F9A61A] hover:bg-[#F2960F] text-[#071242] font-bold px-6 py-3 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    {dictionary.location.mapBtn}
                  </a>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}