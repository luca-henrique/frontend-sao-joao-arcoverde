"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/use-dictionary";
import Link from "next/link";
import { useParams } from "next/navigation";

export const BasicInformation = () => {
  const dictionary: any = useDictionary();

  const params = useParams()
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;

  return (
    <section className="py-16 bg-[#0a1744]">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">{dictionary.cta.title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">{dictionary.cta.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${lang}/programacao`}>
            <Button className="bg-red-600 hover:bg-red-700 text-white text-lg py-6 px-8">
              {dictionary.cta.scheduleBtn}
            </Button>
          </Link>
          <a href="/#local">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-6 px-8">
              {dictionary.cta.locationBtn}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}