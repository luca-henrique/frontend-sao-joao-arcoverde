'use client'

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/use-dictionary";

import { MapPin, Navigation, Clock, Phone, Mail, ExternalLink } from "lucide-react"

export const Location = () => {
  const dictionary: any = useDictionary();
  return (
    <section id="local" className="py-16 bg-[#0c1d52]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-white">{dictionary.location.title1}</span>
          <span className="block text-yellow-400">{dictionary.location.title2}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31559.02580989655!2d-37.07688368700576!3d-8.424344042880352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a98769f2e4d13d%3A0x96e7c63b83029a7!2sArcoverde%2C%20PE%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1711932000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa do local do evento"
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Address and Info */}
          <div className="bg-[#081235] p-8 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">{dictionary.location.venueName}</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg">{dictionary.location.address.title}:</p>
                    <p className="text-gray-300">{dictionary.location.address.line1}</p>
                    <p className="text-gray-300">{dictionary.location.address.line2}</p>
                    <p className="text-gray-300">{dictionary.location.address.line3}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg">{dictionary.location.hours.title}:</p>
                    <p className="text-gray-300">{dictionary.location.hours.line1}</p>
                    <p className="text-gray-300">{dictionary.location.hours.line2}</p>
                    <p className="text-gray-300">{dictionary.location.hours.line3}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Navigation className="text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg">{dictionary.location.directions.title}:</p>
                    <p className="text-gray-300">{dictionary.location.directions.line1}</p>
                    <p className="text-gray-300">{dictionary.location.directions.line2}</p>
                    <p className="text-gray-300">{dictionary.location.directions.line3}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="text-green-500" />
                <p>(87) 3821-1234</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-blue-400" />
                <p>contato@saojoaoarcoverde.com.br</p>
              </div>
              <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                {dictionary.location.mapBtn}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}