import { Plus, TriangleAlert } from 'lucide-react'
import { useMemo, useState } from 'react'
import Button from '../components/ui/Button'
import Dialog from '../components/ui/Dialog'
import Select from '../components/ui/Select'
import PageHeader from '../components/layout/PageHeader'
import TemplateCard from '../components/templates/TemplateCard'
import templatesData from '../data/templates.json'
import userData from '../data/user.json'
import type { TemplateCategory } from '../types/template'
import type { AppUser } from '../types/user'

const user = userData as AppUser
const ALL_CATEGORIES = 'all'

export default function PlantillasPage() {
  const [templates, setTemplates] = useState<TemplateCategory[]>(
    templatesData as TemplateCategory[],
  )
  const [templateToDelete, setTemplateToDelete] =
    useState<TemplateCategory | null>(null)
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES)

  const categoryOptions = [
    { value: ALL_CATEGORIES, label: 'Todas las categorías' },
    ...templates.map((template) => ({
      value: template.id,
      label: template.name,
    })),
  ]

  const visibleTemplates = useMemo(
    () =>
      categoryFilter === ALL_CATEGORIES
        ? templates
        : templates.filter((template) => template.id === categoryFilter),
    [templates, categoryFilter],
  )

  const confirmDelete = () => {
    if (!templateToDelete) return
    setTemplates((current) =>
      current.filter((template) => template.id !== templateToDelete.id),
    )
    setTemplateToDelete(null)
  }

  return (
    <>
      <PageHeader
        title={`¡Estas son tus plantillas, ${user.name}!`}
        subtitle="Organiza tus alarmas con plantillas para tus rutinas según la categoría."
      />

      <div className="flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-end">
        <div className="w-full sm:w-64">
          <Select
            label="Categoría"
            options={categoryOptions}
            value={categoryFilter}
            onChange={setCategoryFilter}
          />
        </div>
        <Button variant="tonal" icon={<Plus size={18} strokeWidth={3} />}>
          Crear Plantilla
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-7">
        {visibleTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onDelete={setTemplateToDelete}
          />
        ))}
      </div>

      <Dialog
        open={templateToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setTemplateToDelete(null)
        }}
        icon={<TriangleAlert size={40} />}
        headline={`¿Deseas eliminar la plantilla para "${templateToDelete?.name}"?`}
        actions={
          <>
            <Button
              variant="tonal-muted"
              onClick={() => setTemplateToDelete(null)}
            >
              Cancelar
            </Button>
            <Button variant="filled" onClick={confirmDelete}>
              Eliminar
            </Button>
          </>
        }
      >
        <p className="max-w-[390px] font-display text-base text-on-primary-container">
          Tu configuración de alarmas previas o posteriores para esta
          categoría dejarán de funcionar
        </p>
      </Dialog>
    </>
  )
}
