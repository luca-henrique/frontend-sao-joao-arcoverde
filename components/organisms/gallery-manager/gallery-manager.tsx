"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Plus,
  Trash2,
  Edit,
  X,
  Upload,
  Check,
  Filter,
  ChevronDown,
  ChevronUp,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
  Info,
  Camera,
  Settings,
} from "lucide-react"
import CategoryManager, { CategoryItem } from "../category-manager/category-manager"

// Types
interface GalleryImage {
  id: string
  title: string
  description: string
  src: string
  category: string
  year: string
  featured: boolean
  createdAt: string
}

interface GalleryManagerProps {
  lang: string
  dict: any
}

// Sample years
const sampleYears = ["2025", "2024", "2023", "2022", "2021", "2020"]

const sampleImages: GalleryImage[] = [
  {
    id: "1",
    title: "Show Principal",
    description: "Show de abertura com grande público",
    src: "/placeholder.svg?height=400&width=600",
    category: "shows",
    year: "2023",
    featured: true,
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Decoração da Praça",
    description: "Bandeirinhas e luzes na praça central",
    src: "/placeholder.svg?height=400&width=600",
    category: "decoracao",
    year: "2023",
    featured: false,
    createdAt: "2023-06-16T14:20:00Z",
  },
  {
    id: "3",
    title: "Comidas Típicas",
    description: "Barracas de comidas típicas juninas",
    src: "/placeholder.svg?height=400&width=600",
    category: "comidas",
    year: "2023",
    featured: true,
    createdAt: "2023-06-17T16:45:00Z",
  },
  {
    id: "4",
    title: "Quadrilha Junina",
    description: "Apresentação da quadrilha tradicional",
    src: "/placeholder.svg?height=400&width=600",
    category: "tradicoes",
    year: "2022",
    featured: false,
    createdAt: "2022-06-20T20:15:00Z",
  },
  {
    id: "5",
    title: "Público no Evento",
    description: "Grande público presente no evento",
    src: "/placeholder.svg?height=400&width=600",
    category: "publico",
    year: "2022",
    featured: true,
    createdAt: "2022-06-22T21:30:00Z",
  },
]

export default function GalleryManager({ lang, dict }: GalleryManagerProps) {
  // State
  const [images, setImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterYear, setFilterYear] = useState("")
  const [sortField, setSortField] = useState<"createdAt" | "title">("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info"
    message: string
  } | null>(null)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    src: "",
    category: "",
    year: new Date().getFullYear().toString(),
    featured: false,
  })

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  // Load categories from localStorage or use default
  useEffect(() => {
    const loadCategories = () => {
      try {
        const savedCategories = localStorage.getItem("galleryCategories")
        if (savedCategories) {
          setCategories(JSON.parse(savedCategories))
        } else {
          // Use default categories
          const defaultCategories: CategoryItem[] = [
            { id: "1", name: "Shows", slug: "shows", description: "Apresentações e shows musicais", count: 2 },
            { id: "2", name: "Decoração", slug: "decoracao", description: "Decoração do evento", count: 1 },
            { id: "3", name: "Comidas Típicas", slug: "comidas", description: "Gastronomia junina", count: 1 },
            { id: "4", name: "Tradições", slug: "tradicoes", description: "Tradições e cultura junina", count: 1 },
            { id: "5", name: "Público", slug: "publico", description: "Fotos do público", count: 1 },
            {
              id: "6",
              name: "Infraestrutura",
              slug: "infraestrutura",
              description: "Estrutura do evento",
              count: 0,
            },
          ]
          setCategories(defaultCategories)
          localStorage.setItem("galleryCategories", JSON.stringify(defaultCategories))
        }
      } catch (error) {
        console.error("Error loading categories:", error)
        setCategories([])
      }
    }

    loadCategories()
  }, [])

  // Load images from localStorage or use sample data
  useEffect(() => {
    const loadImages = () => {
      try {
        const savedImages = localStorage.getItem("galleryImages")
        if (savedImages) {
          setImages(JSON.parse(savedImages))
        } else {
          // Use sample data for first load
          setImages(sampleImages)
          localStorage.setItem("galleryImages", JSON.stringify(sampleImages))
        }
      } catch (error) {
        console.error("Error loading images:", error)
        setImages(sampleImages)
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
  }, [])

  // Update category counts when images change
  // Remova este useEffect que está causando o loop infinito:
  /*
  useEffect(() => {
    if (!isLoading && categories.length > 0) {
      // Count images per category
      const categoryCounts: Record<string, number> = {}
      images.forEach((image) => {
        categoryCounts[image.category] = (categoryCounts[image.category] || 0) + 1
      })

      // Update category counts
      const updatedCategories = categories.map((category) => ({
        ...category,
        count: categoryCounts[category.slug] || 0,
      }))

      setCategories(updatedCategories)
      localStorage.setItem("galleryCategories", JSON.stringify(updatedCategories))
    }
  }, [images, isLoading, categories])
  */

  // E substitua por esta versão que não causa loop infinito:
  useEffect(() => {
    if (!isLoading && categories.length > 0) {
      // Count images per category
      const categoryCounts: Record<string, number> = {}
      images.forEach((image) => {
        categoryCounts[image.category] = (categoryCounts[image.category] || 0) + 1
      })

      // Update category counts without causing a loop
      const needsUpdate = categories.some((category) => (categoryCounts[category.slug] || 0) !== category.count)

      if (needsUpdate) {
        const updatedCategories = categories.map((category) => ({
          ...category,
          count: categoryCounts[category.slug] || 0,
        }))

        setCategories(updatedCategories)
        localStorage.setItem("galleryCategories", JSON.stringify(updatedCategories))
      }
    }
  }, [images, isLoading, categories])

  // Save images to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("galleryImages", JSON.stringify(images))
    }
  }, [images, isLoading])

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)

    // Create a preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Filter and sort images
  const filteredImages = images
    .filter((image) => {
      const matchesSearch =
        image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = filterCategory ? image.category === filterCategory : true
      const matchesYear = filterYear ? image.year === filterYear : true

      return matchesSearch && matchesCategory && matchesYear
    })
    .sort((a, b) => {
      if (sortField === "title") {
        return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      } else {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      src: "",
      category: "",
      year: new Date().getFullYear().toString(),
      featured: false,
    })
    setUploadedFile(null)
    setPreviewUrl("")
  }

  // Show notification
  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  // Open add modal
  const openAddModal = () => {
    resetForm()
    setIsAddModalOpen(true)
  }

  // Open edit modal
  const openEditModal = (image: GalleryImage) => {
    setCurrentImage(image)
    setFormData({
      title: image.title,
      description: image.description,
      src: image.src,
      category: image.category,
      year: image.year,
      featured: image.featured,
    })
    setPreviewUrl(image.src)
    setIsEditModalOpen(true)
  }

  // Open view modal
  const openViewModal = (image: GalleryImage) => {
    setCurrentImage(image)
    setIsViewModalOpen(true)
  }

  // Open delete modal
  const openDeleteModal = (image: GalleryImage) => {
    setCurrentImage(image)
    setIsDeleteModalOpen(true)
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle add image
  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!formData.title || !formData.category || !formData.year) {
      showNotification("error", dict.admin?.requiredFields || "Preencha todos os campos obrigatórios")
      return
    }

    // Create new image
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      src: previewUrl || formData.src || "/placeholder.svg?height=400&width=600",
      category: formData.category,
      year: formData.year,
      featured: formData.featured,
      createdAt: new Date().toISOString(),
    }

    // Add to images array
    setImages((prev) => [newImage, ...prev])

    // Show success notification
    showNotification("success", dict.admin?.imageAdded || "Imagem adicionada com sucesso!")

    // Close modal
    setIsAddModalOpen(false)
    resetForm()
  }

  // Handle edit image
  const handleEditImage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentImage) return

    // Simple validation
    if (!formData.title || !formData.category || !formData.year) {
      showNotification("error", dict.admin?.requiredFields || "Preencha todos os campos obrigatórios")
      return
    }

    // Update image
    const updatedImages = images.map((img) =>
      img.id === currentImage.id
        ? {
            ...img,
            title: formData.title,
            description: formData.description,
            src: previewUrl || formData.src || img.src,
            category: formData.category,
            year: formData.year,
            featured: formData.featured,
          }
        : img,
    )

    setImages(updatedImages)

    // Show success notification
    showNotification("success", dict.admin?.imageUpdated || "Imagem atualizada com sucesso!")

    // Close modal
    setIsEditModalOpen(false)
    setCurrentImage(null)
    resetForm()
  }

  // Handle delete image
  const handleDeleteImage = () => {
    if (!currentImage) return

    // Remove image
    const updatedImages = images.filter((img) => img.id !== currentImage.id)
    setImages(updatedImages)

    // Show success notification
    showNotification("success", dict.admin?.imageDeleted || "Imagem excluída com sucesso!")

    // Close modal
    setIsDeleteModalOpen(false)
    setCurrentImage(null)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedImages.length === 0) return

    // Remove selected images
    const updatedImages = images.filter((img) => !selectedImages.includes(img.id))
    setImages(updatedImages)

    // Show success notification
    showNotification("success", dict.admin?.imagesDeleted || `${selectedImages.length} imagens excluídas com sucesso!`)

    // Reset selection
    setSelectedImages([])
    setSelectAll(false)
  }

  // Handle sort change
  const handleSortChange = (field: "createdAt" | "title") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setFilterCategory("")
    setFilterYear("")
    setSortField("createdAt")
    setSortDirection("desc")
  }

  // Handle image selection
  const handleSelectImage = (id: string) => {
    setSelectedImages((prev) => (prev.includes(id) ? prev.filter((imageId) => imageId !== id) : [...prev, id]))
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((img) => img.id))
    }
    setSelectAll(!selectAll)
  }

  // Check if an image is selected
  const isSelected = useCallback((id: string) => selectedImages.includes(id), [selectedImages])

  // Handle categories update
  const handleCategoriesUpdate = (updatedCategories: CategoryItem[]) => {
    setCategories(updatedCategories)
  }

  // Get category name by slug
  const getCategoryName = (slug: string) => {
    const category = categories.find((cat) => cat.slug === slug)
    return category ? category.name : slug
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // If category manager is open, show it
  if (isCategoryManagerOpen) {
    return (
      <CategoryManager
        lang={lang}
        dict={dict}
        onClose={() => setIsCategoryManagerOpen(false)}
        onCategoriesChange={handleCategoriesUpdate}
      />
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md flex items-start gap-3 ${
            notification.type === "success"
              ? "bg-green-500/90 text-white"
              : notification.type === "error"
                ? "bg-red-500/90 text-white"
                : "bg-blue-500/90 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="w-5 h-5 mt-0.5" />
          ) : notification.type === "error" ? (
            <AlertCircle className="w-5 h-5 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 mt-0.5" />
          )}
          <div className="flex-1">
            <p>{notification.message}</p>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white" aria-label="Fechar">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={dict.admin?.searchGallery || "Buscar na galeria..."}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2"
          >
            <Filter size={18} />
            <span className="hidden sm:inline">{dict.admin?.filter || "Filtrar"}</span>
            {(filterCategory || filterYear) && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-yellow-500 text-blue-950 rounded-full">
                {(filterCategory ? 1 : 0) + (filterYear ? 1 : 0)}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCategoryManagerOpen(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2"
            title={dict.admin?.manageCategories || "Gerenciar Categorias"}
          >
            <Settings size={18} />
            <span className="hidden sm:inline">{dict.admin?.categories || "Categorias"}</span>
          </button>

          {selectedImages.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline">
                {dict.admin?.deleteSelected || `Excluir (${selectedImages.length})`}
              </span>
            </button>
          )}

          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-medium rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">{dict.admin?.addImage || "Adicionar Imagem"}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {isFilterOpen && (
        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {dict.admin?.category || "Categoria"}
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">{dict.admin?.allCategories || "Todas as categorias"}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">{dict.admin?.year || "Ano"}</label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">{dict.admin?.allYears || "Todos os anos"}</option>
                {sampleYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {dict.admin?.sortBy || "Ordenar por"}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSortChange("createdAt")}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                    sortField === "createdAt"
                      ? "bg-yellow-500 text-blue-950"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {dict.admin?.date || "Data"}
                  {sortField === "createdAt" &&
                    (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </button>

                <button
                  onClick={() => handleSortChange("title")}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                    sortField === "title" ? "bg-yellow-500 text-blue-950" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {dict.admin?.title || "Título"}
                  {sortField === "title" &&
                    (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 text-sm text-white hover:text-yellow-300 flex items-center gap-1"
            >
              <RefreshCw size={14} />
              {dict.admin?.resetFilters || "Resetar filtros"}
            </button>
          </div>
        </div>
      )}

      {/* Gallery List */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            {dict.admin?.noImagesFound || "Nenhuma imagem encontrada"}
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            {dict.admin?.tryDifferentFilters || "Tente usar filtros diferentes ou adicione novas imagens à galeria."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded text-yellow-500 focus:ring-yellow-500 focus:ring-offset-0 bg-white/10 border-white/20"
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                  {dict.admin?.image || "Imagem"}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                  {dict.admin?.details || "Detalhes"}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                  {dict.admin?.category || "Categoria"}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">{dict.admin?.year || "Ano"}</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                  {dict.admin?.actions || "Ações"}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((image) => (
                <tr
                  key={image.id}
                  className={`border-b border-white/5 hover:bg-white/5 ${isSelected(image.id) ? "bg-white/10" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected(image.id)}
                        onChange={() => handleSelectImage(image.id)}
                        className="w-4 h-4 rounded text-yellow-500 focus:ring-yellow-500 focus:ring-offset-0 bg-white/10 border-white/20"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="relative w-20 h-20 rounded-lg overflow-hidden bg-white/5 cursor-pointer"
                      onClick={() => openViewModal(image)}
                    >
                      <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                      {image.featured && (
                        <div className="absolute top-0 right-0 bg-yellow-500 text-xs text-blue-950 px-1 py-0.5">★</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <h4 className="font-medium text-white">{image.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-2">{image.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 bg-white/10 rounded-full text-sm text-white">
                      {getCategoryName(image.category)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white">{image.year}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openViewModal(image)}
                        className="p-2 text-white hover:bg-white/10 rounded-lg"
                        title={dict.admin?.view || "Visualizar"}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openEditModal(image)}
                        className="p-2 text-white hover:bg-white/10 rounded-lg"
                        title={dict.admin?.edit || "Editar"}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(image)}
                        className="p-2 text-white hover:bg-red-500/20 rounded-lg"
                        title={dict.admin?.delete || "Excluir"}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Image Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-blue-950 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">{dict.admin?.addImage || "Adicionar Imagem"}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddImage} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.title || "Título"} *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.description || "Descrição"}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.imageUpload || "Upload de Imagem"}
                  </label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center justify-center w-full h-12 px-4 py-2 bg-white/10 border border-white/20 border-dashed rounded-lg text-white hover:bg-white/15 cursor-pointer">
                      <Upload size={18} className="mr-2" />
                      <span>{dict.admin?.selectFile || "Selecionar arquivo"}</span>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                    {uploadedFile && (
                      <p className="text-xs text-gray-400">
                        {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)} KB)
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.imageUrl || "URL da Imagem"}
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="src"
                      value={formData.src}
                      onChange={handleInputChange}
                      placeholder="/placeholder.svg?height=400&width=600"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      disabled={!!uploadedFile}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {dict.admin?.imageUrlHelp || "Deixe em branco para usar uma imagem de placeholder"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.preview || "Pré-visualização"}
                  </label>
                  <div className="h-[100px] bg-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                    {previewUrl ? (
                      <div className="relative w-full h-full">
                        <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                      </div>
                    ) : formData.src ? (
                      <div className="relative w-full h-full">
                        <Image src={formData.src || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="text-gray-400 flex items-center gap-2">
                        <Eye size={18} />
                        <span>{dict.admin?.noPreview || "Sem pré-visualização"}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.category || "Categoria"} *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">{dict.admin?.selectCategory || "Selecione uma categoria"}</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{dict.admin?.year || "Ano"} *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {sampleYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded text-yellow-500 focus:ring-yellow-500 focus:ring-offset-0 bg-white/10 border-white/20"
                    />
                    <span className="text-white">{dict.admin?.featured || "Destacar na galeria"}</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                >
                  {dict.admin?.cancel || "Cancelar"}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-medium rounded-lg flex items-center gap-2"
                >
                  <Check size={18} />
                  {dict.admin?.save || "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {isEditModalOpen && currentImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-blue-950 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">{dict.admin?.editImage || "Editar Imagem"}</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEditImage} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.title || "Título"} *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.description || "Descrição"}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.imageUpload || "Upload de Imagem"}
                  </label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center justify-center w-full h-12 px-4 py-2 bg-white/10 border border-white/20 border-dashed rounded-lg text-white hover:bg-white/15 cursor-pointer">
                      <Upload size={18} className="mr-2" />
                      <span>{dict.admin?.selectFile || "Selecionar arquivo"}</span>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                    {uploadedFile && (
                      <p className="text-xs text-gray-400">
                        {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)} KB)
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.imageUrl || "URL da Imagem"}
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="src"
                      value={formData.src}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      disabled={!!uploadedFile}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.preview || "Pré-visualização"}
                  </label>
                  <div className="h-[100px] bg-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={previewUrl || formData.src || currentImage.src}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.category || "Categoria"} *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">{dict.admin?.selectCategory || "Selecione uma categoria"}</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{dict.admin?.year || "Ano"} *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {sampleYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded text-yellow-500 focus:ring-yellow-500 focus:ring-offset-0 bg-white/10 border-white/20"
                    />
                    <span className="text-white">{dict.admin?.featured || "Destacar na galeria"}</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                >
                  {dict.admin?.cancel || "Cancelar"}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-medium rounded-lg flex items-center gap-2"
                >
                  <Check size={18} />
                  {dict.admin?.save || "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Image Modal */}
      {isViewModalOpen && currentImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full">
            <div className="flex justify-end mb-2">
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-white p-2">
                <X size={24} />
              </button>
            </div>

            <div className="bg-blue-950/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <div className="relative w-full h-[60vh]">
                <Image
                  src={currentImage.src || "/placeholder.svg"}
                  alt={currentImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{currentImage.title}</h3>
                    <p className="text-gray-300">{currentImage.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                        {getCategoryName(currentImage.category)}
                      </span>
                      <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                        {currentImage.year}
                      </span>
                      {currentImage.featured && (
                        <span className="inline-block px-3 py-1 bg-yellow-500 rounded-full text-sm text-blue-950 font-medium">
                          {dict.admin?.featured || "Destacada"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsViewModalOpen(false)
                        openEditModal(currentImage)
                      }}
                      className="p-2 text-white hover:bg-white/10 rounded-lg"
                      title={dict.admin?.edit || "Editar"}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setIsViewModalOpen(false)
                        openDeleteModal(currentImage)
                      }}
                      className="p-2 text-white hover:bg-red-500/20 rounded-lg"
                      title={dict.admin?.delete || "Excluir"}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-blue-950 border border-white/10 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 text-red-500">
                <Trash2 size={32} />
              </div>

              <h3 className="text-xl font-bold text-white text-center mb-2">
                {dict.admin?.confirmDelete || "Confirmar exclusão"}
              </h3>

              <p className="text-gray-300 text-center mb-6">
                {dict.admin?.deleteWarning ||
                  "Tem certeza que deseja excluir esta imagem? Esta ação não pode ser desfeita."}
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                >
                  {dict.admin?.cancel || "Cancelar"}
                </button>
                <button
                  onClick={handleDeleteImage}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  {dict.admin?.delete || "Excluir"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
