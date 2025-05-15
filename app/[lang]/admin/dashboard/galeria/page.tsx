'use client'

import GalleryManager from "@/components/organisms/gallery-manager/gallery-manager"

import { useDictionary } from "@/hooks/use-dictionary"

export default async function GalleryAdminPage() {
  const dict = useDictionary()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">{dict.admin?.galleryManagement || "Gerenciamento da Galeria"}</h1>
      </div>

      <GalleryManager lang={'pt'} dict={dict} />
    </div>
  )
}
