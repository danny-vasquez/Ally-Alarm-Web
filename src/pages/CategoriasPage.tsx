import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import CategoryToggleCard from '../components/categories/CategoryToggleCard'
import categoriesData from '../data/categories.json'
import type { Category } from '../types/category'

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>(
    categoriesData as Category[],
  )

  const toggleCategory = (id: string) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? { ...category, active: !category.active }
          : category,
      ),
    )
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
            onToggle={toggleCategory}
          />
        ))}
      </div>
    </>
  )
}
