import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import CategoryToggleCard from '../components/categories/CategoryToggleCard'
import DeactivateCategoryModal from '../components/categories/DeactivateCategoryModal'
import categoriesData from '../data/categories.json'
import type { Category } from '../types/category'

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>(
    categoriesData as Category[],
  )
  const [categoryToDeactivate, setCategoryToDeactivate] =
    useState<Category | null>(null)

  // Activar sigue siendo directo; desactivar pasa primero por el modal de
  // confirmación (recursos-figma/modal-activar-desactivar-categoria.html).
  const requestToggle = (id: string) => {
    const category = categories.find((c) => c.id === id)
    if (!category) return
    if (category.active) {
      setCategoryToDeactivate(category)
      return
    }
    setCategories((current) =>
      current.map((c) => (c.id === id ? { ...c, active: true } : c)),
    )
  }

  const confirmDeactivate = () => {
    if (!categoryToDeactivate) return
    setCategories((current) =>
      current.map((c) =>
        c.id === categoryToDeactivate.id ? { ...c, active: false } : c,
      ),
    )
    setCategoryToDeactivate(null)
  }

  return (
    <>
      <PageHeader
        title="Categorías"
        subtitle="Activa o desactiva todas las alarmas de una categoría"
      />

      <div className="flex flex-1 flex-col gap-6">
        {categories.map((category) => (
          <CategoryToggleCard
            key={category.id}
            category={category}
            onToggle={requestToggle}
          />
        ))}
      </div>

      <DeactivateCategoryModal
        open={categoryToDeactivate !== null}
        categoryName={categoryToDeactivate?.name ?? ''}
        onCancel={() => setCategoryToDeactivate(null)}
        onConfirm={confirmDeactivate}
      />
    </>
  )
}
