'use client';

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/use-dictionary";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export const Sponsors = () => {
  const dictionary: any = useDictionary();

  const params = useParams()
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;

  return (
    <section className="py-16 bg-[#0c1d52] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-2">
          <span className="text-white">{dictionary.sponsors.title1}</span>
          <span className="text-yellow-400"> {dictionary.sponsors.title2}</span>
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">{dictionary.sponsors.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {/* Skol */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
            <Image
              src="/placeholder.svg?height=80&width=120"
              alt="Skol"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Governo de Pernambuco */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
            <Image
              src="/placeholder.svg?height=80&width=120"
              alt="Governo de Pernambuco"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>

          {/* SEBRAE */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
            <Image
              src="/placeholder.svg?height=80&width=120"
              alt="SEBRAE"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Banco do Nordeste */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
            <Image
              src="/placeholder.svg?height=80&width=120"
              alt="Banco do Nordeste"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Ministério do Turismo */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
            <Image
              src="/placeholder.svg?height=80&width=120"
              alt="Ministério do Turismo"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Ministério da Cultura */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center h-32">
            <Image
              src="/placeholder.svg?height=80&width=120"
              alt="Ministério da Cultura"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 text-lg">{dictionary.sponsors.cta}</p>
          <Link href={`/${lang}/contato`} className="inline-block mt-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white">{dictionary.sponsors.contactBtn}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}