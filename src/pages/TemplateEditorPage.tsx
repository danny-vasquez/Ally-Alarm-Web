import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import TemplateSectionCard from '../components/templates/TemplateSectionCard'
import { useTemplates } from '../context/TemplatesContext'
import categoriesData from '../data/categories.json'
import userData from '../data/user.json'
import type { Category } from '../types/category'
import type { TemplateSection } from '../types/templateSection'
import type { AppUser } from '../types/user'

const user = userData as AppUser
const categories = categoriesData as Category[]

function emptySection(id: string): TemplateSection {
  return { id, title: '', minutesBefore: '', minutesAfter: '', message: '' }
}

// "3 horas antes" -> 180, "45 mins antes" -> 45, "10 min después" -> 10.
// El campo "después" del editor queda siempre deshabilitado (así está en
// el diseño), así que solo importa el número para "antes".
function parseMinutesBefore(time: string): string {
  const match = time.match(/(\d+(?:[.,]\d+)?)/)
  if (!match) return ''
  const value = parseFloat(match[1].replace(',', '.'))
  const minutes = /hora/i.test(time) ? value * 60 : value
  return String(Math.round(minutes))
}

export default function TemplateEditorPage() {
  const { categoryId = '' } = useParams()
  const navigate = useNavigate()
  const { templates, getTemplate, saveTemplate } = useTemplates()

  // El selector de categoría debe cubrir tanto las categorías "oficiales"
  // (categories.json) como las que ya existen en plantillas pero no están
  // ahí (p. ej. "Viajes"), para que editar cualquier plantilla existente
  // siempre muestre su categoría seleccionada.
  const categoryOptions = [
    ...categories.map((category) => ({ id: category.id, name: category.name })),
    ...templates
      .filter((template) => !categories.some((category) => category.id === template.id))
      .map((template) => ({ id: template.id, name: template.name })),
  ].map((category) => ({ value: category.id, label: category.name }))

  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId)
  const [sections, setSections] = useState<TemplateSection[]>(() => {
    const existingTemplate = getTemplate(categoryId)
    if (existingTemplate?.activities.length) {
      return existingTemplate.activities.map((activity) => ({
        id: activity.id,
        title: activity.activity,
        minutesBefore: parseMinutesBefore(activity.time),
        minutesAfter: '',
        message: activity.message,
      }))
    }
    return [emptySection(`${categoryId || 'nueva'}-1`)]
  })

  const updateSectionField = (
    sectionId: string,
    field: 'title' | 'minutesBefore' | 'message',
    value: string,
  ) => {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section,
      ),
    )
  }

  const addSection = () => {
    setSections((current) => [
      ...current,
      emptySection(`${selectedCategoryId || 'nueva'}-${Date.now()}`),
    ])
  }

  const removeSection = (sectionId: string) => {
    setSections((current) => current.filter((section) => section.id !== sectionId))
  }

  const handleSave = () => {
    if (!selectedCategoryId) return
    const categoryOption = categoryOptions.find(
      (option) => option.value === selectedCategoryId,
    )
    const existingTemplate = getTemplate(selectedCategoryId)
    saveTemplate({
      id: selectedCategoryId,
      name: categoryOption?.label ?? existingTemplate?.name ?? selectedCategoryId,
      color:
        categories.find((category) => category.id === selectedCategoryId)?.color ??
        existingTemplate?.color ??
        'category-a',
      activities: sections.map((section) => ({
        id: section.id,
        activity: section.title,
        time: section.minutesBefore ? `${section.minutesBefore} min antes` : '',
        message: section.message,
      })),
    })
    navigate('/plantillas')
  }

  return (
    <>
      <PageHeader
        title={`¡Cambia o crea tu plantilla, ${user.name}!`}
        subtitle="Personaliza el comportamiento de tus alarmas por categoría"
      />

      <div className="flex items-center gap-2.5">
        <span className="font-display text-base text-on-primary-container">
          Categoría:
        </span>
        <Select
          label=""
          options={categoryOptions}
          value={selectedCategoryId}
          onChange={setSelectedCategoryId}
        />
      </div>

      <div className="flex flex-col gap-7">
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col gap-7">
            <TemplateSectionCard
              section={section}
              onChange={(field, value) => updateSectionField(section.id, field, value)}
            />
            <div className="flex justify-end gap-2.5">
              <Button
                variant="tonal-muted"
                className="w-50"
                onClick={() => removeSection(section.id)}
              >
                Eliminar sección
              </Button>
              <Button variant="tonal" className="w-50" onClick={addSection}>
                Agregar sección
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2.5">
        <Button
          variant="tonal-muted"
          className="w-50"
          onClick={() => navigate('/plantillas')}
        >
          Cancelar
        </Button>
        <Button variant="filled" className="w-50" onClick={handleSave}>
          Guardar
        </Button>
      </div>
    </>
  )
}
