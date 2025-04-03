"use client";

import { useDictionary } from "@/hooks/use-dictionary";
import { Calendar, MapPin, Music } from "lucide-react";

export const Features = () => {
  const dictionary: any = useDictionary();

  return (
    <section id="atracoes" className="py-16 bg-[#0a1744]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0c1d52] p-6 rounded-lg text-center">
            <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-[#0a1744]" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {dictionary.features.feature1.title}
            </h3>
            <p className="text-gray-300">
              {dictionary.features.feature1.description}
            </p>
          </div>
          <div className="bg-[#0c1d52] p-6 rounded-lg text-center">
            <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-[#0a1744]" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {dictionary.features.feature2.title}
            </h3>
            <p className="text-gray-300">
              {dictionary.features.feature2.description}
            </p>
          </div>
          <div className="bg-[#0c1d52] p-6 rounded-lg text-center">
            <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#0a1744]" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {dictionary.features.feature3.title}
            </h3>
            <p className="text-gray-300">
              {dictionary.features.feature3.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
