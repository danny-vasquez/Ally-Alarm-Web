import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import templatesData from '../data/templates.json'
import type { TemplateCategory } from '../types/template'

interface TemplatesContextValue {
  templates: TemplateCategory[]
  getTemplate: (id: string) => TemplateCategory | undefined
  deleteTemplate: (id: string) => void
  saveTemplate: (template: TemplateCategory) => void
}

const TemplatesContext = createContext<TemplatesContextValue | null>(null)

/**
 * Fuente de verdad en memoria para las plantillas (sin backend ni
 * localStorage: "no debe persistir, solo tener consistencia" dentro de la
 * sesión). Compartida entre PlantillasPage y TemplateEditorPage para que
 * editar/eliminar en una se refleje en la otra.
 */
export function TemplatesProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<TemplateCategory[]>(
    templatesData as TemplateCategory[],
  )

  const getTemplate = (id: string) => templates.find((t) => t.id === id)

  const deleteTemplate = (id: string) => {
    setTemplates((current) => current.filter((t) => t.id !== id))
  }

  const saveTemplate = (template: TemplateCategory) => {
    setTemplates((current) => {
      const exists = current.some((t) => t.id === template.id)
      return exists
        ? current.map((t) => (t.id === template.id ? template : t))
        : [...current, template]
    })
  }

  return (
    <TemplatesContext.Provider
      value={{ templates, getTemplate, deleteTemplate, saveTemplate }}
    >
      {children}
    </TemplatesContext.Provider>
  )
}

export function useTemplates() {
  const context = useContext(TemplatesContext)
  if (!context) {
    throw new Error('useTemplates debe usarse dentro de <TemplatesProvider>')
  }
  return context
}
