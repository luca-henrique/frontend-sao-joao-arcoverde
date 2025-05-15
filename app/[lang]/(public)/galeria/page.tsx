"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ScrollReveal from "@/components/scroll-reveal";

// Categorias de imagens
const categories = [
  { id: "all", name: "Todas as Fotos" },
  { id: "shows", name: "Shows" },
  { id: "quadrilhas", name: "Quadrilhas" },
  { id: "comidas", name: "Comidas Típicas" },
  { id: "decoracao", name: "Decoração" },
  { id: "publico", name: "Público" },
];

// Imagens da galeria
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=400",
    alt: "São João de Arcoverde - Dia 14",
    caption: "Geraldo Azevedo no palco principal",
    category: "shows",
    year: "2024",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=400",
    alt: "São João de Arcoverde - Dia 15",
    caption: "Dorgival Dantas animando a multidão",
    category: "shows",
    year: "2024",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=400",
    alt: "São João de Arcoverde - Dia 16",
    caption: "Festival das Quadrilhas Juninas",
    category: "quadrilhas",
    year: "2024",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=400",
    alt: "São João de Arcoverde - Dia 17",
    caption: "Jonas Esticado em apresentação emocionante",
    category: "shows",
    year: "2024",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=400",
    alt: "São João de Arcoverde - Dia 18",
    caption: "Xand Avião levantando o público",
    category: "shows",
    year: "2024",
  },
];

// Anos disponíveis
const years = ["Todos", "2024", "2023", "2022"];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Filtrar imagens por categoria e ano
  const filteredImages = galleryImages.filter((image) => {
    const categoryMatch =
      selectedCategory === "all" || image.category === selectedCategory;
    const yearMatch = selectedYear === "Todos" || image.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  // Abrir lightbox
  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  // Fechar lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  // Navegar entre imagens no lightbox
  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === filteredImages[selectedImage].id
    );

    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(nextIndex);
    } else {
      const prevIndex =
        (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(prevIndex);
    }
  };

  // Lidar com teclas de navegação
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") navigateImage("next");
    if (e.key === "ArrowLeft") navigateImage("prev");
  };

  return (
    <div className="min-h-screen bg-[#0a1744] text-white">
      {/* Page Title */}
      <div className="bg-[#0c1d52] py-8 border-y border-blue-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-gray-400 hover:text-white flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <h1 className="text-3xl md:text-4xl font-bold">
                Galeria de Fotos
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                <span className="text-white">Momentos</span>
                <span className="text-yellow-400"> Inesquecíveis</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Reviva os melhores momentos do São João de Arcoverde através das
                nossas imagens.
              </p>
            </div>
          </ScrollReveal>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className={
                    selectedCategory === category.id
                      ? "bg-[#F9A61A] text-[#071242] hover:bg-[#F2960F]"
                      : "border-blue-800 text-white hover:bg-[#0c1d52]"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <select
                className="bg-[#0c1d52] border border-blue-800 rounded-md px-4 py-2 text-white"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <ScrollReveal key={image.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-white text-sm font-medium">
                          {image.caption}
                        </p>
                        <p className="text-yellow-400 text-xs mt-1">
                          {image.year}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-300 text-lg">
                  Nenhuma imagem encontrada com os filtros selecionados.
                </p>
                <Button
                  className="mt-4 bg-[#F9A61A] text-[#071242] hover:bg-[#F2960F]"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedYear("Todos");
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.button
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={filteredImages[selectedImage].src || "/placeholder.svg"}
                  alt={filteredImages[selectedImage].alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="bg-black/70 p-4 w-full text-center">
                <p className="text-white text-lg">
                  {filteredImages[selectedImage].caption}
                </p>
                <p className="text-yellow-400 text-sm mt-1">
                  {filteredImages[selectedImage].year}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#081235] py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <Image
                src="/images/logo.png"
                alt="Prefeitura de Arcoverde"
                width={80}
                height={80}
                className="object-contain"
              />
              <div>
                <p className="font-bold">Prefeitura de Arcoverde</p>
                <p className="text-sm text-gray-400">
                  Secretaria de Turismo, Esportes e Eventos
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2025 São João de Arcoverde. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
