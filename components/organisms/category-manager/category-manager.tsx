"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, X, Check, AlertCircle, Info, Save, RefreshCw, ArrowLeft } from "lucide-react"

interface CategoryManagerProps {
  lang: string
  dict: any
  onClose: () => void
  onCategoriesChange: (categories: CategoryItem[]) => void
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
  description?: string
  count: number
}

export default function CategoryManager({ lang, dict, onClose, onCategoriesChange }: CategoryManagerProps) {
  // State
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<CategoryItem | null>(null)
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info"
    message: string
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  })

  // Load categories from localStorage or use sample data
  useEffect(() => {
    const loadCategories = () => {
      try {
        const savedCategories = localStorage.getItem("galleryCategories")
        if (savedCategories) {
          setCategories(JSON.parse(savedCategories))
        } else {
          // Use sample data for first load
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
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Save categories to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("galleryCategories", JSON.stringify(categories))
      // Evite chamar onCategoriesChange em cada renderização
      // Apenas quando as categorias realmente mudarem
    }
  }, [categories, isLoading])

  // Adicione um useEffect separado para notificar mudanças, com um debounce
  useEffect(() => {
    if (!isLoading) {
      // Usar um timeout para evitar múltiplas chamadas em sequência
      const timer = setTimeout(() => {
        onCategoriesChange(categories)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [categories, isLoading, onCategoriesChange])

  // Show notification
  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
  }

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
    })
  }

  // Open add modal
  const openAddModal = () => {
    resetForm()
    setIsAddModalOpen(true)
  }

  // Open edit modal
  const openEditModal = (category: CategoryItem) => {
    setCurrentCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    })
    setIsEditModalOpen(true)
  }

  // Open delete modal
  const openDeleteModal = (category: CategoryItem) => {
    setCurrentCategory(category)
    setIsDeleteModalOpen(true)
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "name" && !formData.slug) {
      // Auto-generate slug when name changes and slug is empty
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle add category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!formData.name || !formData.slug) {
      showNotification("error", dict.admin?.requiredFields || "Preencha todos os campos obrigatórios")
      return
    }

    // Check if slug already exists
    if (categories.some((cat) => cat.slug === formData.slug)) {
      showNotification("error", dict.admin?.slugExists || "Esta slug já está em uso")
      return
    }

    // Create new category
    const newCategory: CategoryItem = {
      id: Date.now().toString(),
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      count: 0,
    }

    // Add to categories array
    setCategories((prev) => [...prev, newCategory])

    // Show success notification
    showNotification("success", dict.admin?.categoryAdded || "Categoria adicionada com sucesso!")

    // Close modal
    setIsAddModalOpen(false)
    resetForm()
  }

  // Handle edit category
  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentCategory) return

    // Simple validation
    if (!formData.name || !formData.slug) {
      showNotification("error", dict.admin?.requiredFields || "Preencha todos os campos obrigatórios")
      return
    }

    // Check if slug already exists (excluding current category)
    if (categories.some((cat) => cat.slug === formData.slug && cat.id !== currentCategory.id)) {
      showNotification("error", dict.admin?.slugExists || "Esta slug já está em uso")
      return
    }

    // Update category
    const updatedCategories = categories.map((cat) =>
      cat.id === currentCategory.id
        ? {
            ...cat,
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
          }
        : cat,
    )

    setCategories(updatedCategories)

    // Show success notification
    showNotification("success", dict.admin?.categoryUpdated || "Categoria atualizada com sucesso!")

    // Close modal
    setIsEditModalOpen(false)
    setCurrentCategory(null)
    resetForm()
  }

  // Handle delete category
  const handleDeleteCategory = () => {
    if (!currentCategory) return

    // Check if category has images
    if (currentCategory.count > 0) {
      showNotification(
        "error",
        dict.admin?.categoryHasImages ||
          `Esta categoria contém ${currentCategory.count} imagens e não pode ser excluída`,
      )
      setIsDeleteModalOpen(false)
      setCurrentCategory(null)
      return
    }

    // Remove category
    const updatedCategories = categories.filter((cat) => cat.id !== currentCategory.id)
    setCategories(updatedCategories)

    // Show success notification
    showNotification("success", dict.admin?.categoryDeleted || "Categoria excluída com sucesso!")

    // Close modal
    setIsDeleteModalOpen(false)
    setCurrentCategory(null)
  }

  // Filter categories by search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
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

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-lg flex items-center gap-2"
            title={dict.admin?.back || "Voltar"}
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-white">{dict.admin?.manageCategories || "Gerenciar Categorias"}</h2>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-medium rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          <span>{dict.admin?.addCategory || "Adicionar Categoria"}</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={dict.admin?.searchCategories || "Buscar categorias..."}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
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

      {/* Categories List */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-400"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 9.5 2Z" />
              <path d="M19.5 7A2.5 2.5 0 0 1 22 9.5v10a2.5 2.5 0 0 1-5 0v-10A2.5 2.5 0 0 1 19.5 7Z" />
              <path d="M4.5 12a2.5 2.5 0 0 1 5 0v5a2.5 2.5 0 0 1-5 0v-5Z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            {dict.admin?.noCategoriesFound || "Nenhuma categoria encontrada"}
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            {dict.admin?.tryDifferentSearch || "Tente usar termos diferentes ou adicione novas categorias."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                  {dict.admin?.category || "Categoria"}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">{dict.admin?.slug || "Slug"}</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                  {dict.admin?.description || "Descrição"}
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                  {dict.admin?.imagesCount || "Imagens"}
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                  {dict.admin?.actions || "Ações"}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <h4 className="font-medium text-white">{category.name}</h4>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-300 font-mono text-sm">{category.slug}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-400 line-clamp-2">{category.description || "-"}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-2 py-1 bg-white/10 rounded-full text-sm text-white">
                      {category.count}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-2 text-white hover:bg-white/10 rounded-lg"
                        title={dict.admin?.edit || "Editar"}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(category)}
                        className={`p-2 text-white ${
                          category.count > 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500/20"
                        } rounded-lg`}
                        title={
                          category.count > 0
                            ? dict.admin?.cannotDelete || "Não pode ser excluída"
                            : dict.admin?.delete || "Excluir"
                        }
                        disabled={category.count > 0}
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

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-blue-950 border border-white/10 rounded-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">{dict.admin?.addCategory || "Adicionar Categoria"}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.categoryName || "Nome da Categoria"} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{dict.admin?.slug || "Slug"} *</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, slug: generateSlug(formData.name) }))}
                      className="ml-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center"
                      title={dict.admin?.generateSlug || "Gerar Slug"}
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {dict.admin?.slugHelp || "Identificador único usado nas URLs"}
                  </p>
                </div>

                <div>
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
              </div>

              <div className="mt-6 flex justify-end gap-3">
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
                  <Save size={18} />
                  {dict.admin?.save || "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && currentCategory && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-blue-950 border border-white/10 rounded-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">{dict.admin?.editCategory || "Editar Categoria"}</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEditCategory} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {dict.admin?.categoryName || "Nome da Categoria"} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{dict.admin?.slug || "Slug"} *</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, slug: generateSlug(formData.name) }))}
                      className="ml-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center"
                      title={dict.admin?.generateSlug || "Gerar Slug"}
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {dict.admin?.slugHelp || "Identificador único usado nas URLs"}
                  </p>
                </div>

                <div>
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
                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                    <Info size={18} className="text-yellow-500" />
                    <p className="text-sm text-gray-300">
                      {dict.admin?.categoryImagesCount ||
                        `Esta categoria contém ${currentCategory.count} imagens na galeria.`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
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
                  <Save size={18} />
                  {dict.admin?.save || "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentCategory && (
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
                {dict.admin?.deleteCategoryWarning ||
                  `Tem certeza que deseja excluir a categoria "${currentCategory.name}"? Esta ação não pode ser desfeita.`}
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                >
                  {dict.admin?.cancel || "Cancelar"}
                </button>
                <button
                  onClick={handleDeleteCategory}
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
