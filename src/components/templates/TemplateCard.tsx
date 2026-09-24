import { useEffect, useRef, useState } from 'react'
import { MdIconR } from '../../lib/material'
import IconButton from '../ui/IconButton'
import type { TemplateCategory } from '../../types/template'

const CATEGORY_HEADER_BG: Record<string, string> = {
  'category-a': 'bg-category-a',
  'category-b': 'bg-category-b',
  'category-c': 'bg-category-c',
  'category-d': 'bg-category-d',
  'category-e': 'bg-category-e',
}

interface TemplateCardProps {
  template: TemplateCategory
  onEdit: (template: TemplateCategory) => void
  onDelete: (template: TemplateCategory) => void
}

export default function TemplateCard({
  template,
  onEdit,
  onDelete,
}: TemplateCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerBg = CATEGORY_HEADER_BG[template.color] ?? 'bg-category-a'

  useEffect(() => {
    if (!menuOpen) return
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [menuOpen])

  return (
    <div className="w-full overflow-hidden rounded-lg border-[1.29px] border-primary-container bg-surface shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div
        className={`flex items-center justify-between border-[1.29px] border-primary-container px-3 py-1 ${headerBg}`}
      >
        <h3 className="font-display text-base font-semibold text-on-primary-container">
          {template.name}
        </h3>
        <div ref={menuRef} className="relative">
          <IconButton
            label={`Opciones de la plantilla ${template.name}`}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <MdIconR>more_vert</MdIconR>
          </IconButton>
          {menuOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-lg border border-primary-container bg-surface shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <button
                type="button"
                className="block w-full px-4 py-2.5 text-left font-display text-sm text-on-primary-container hover:bg-tonal"
                onClick={() => {
                  setMenuOpen(false)
                  onEdit(template)
                }}
              >
                Editar
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2.5 text-left font-display text-sm text-on-primary-container hover:bg-tonal"
                onClick={() => {
                  setMenuOpen(false)
                  onDelete(template)
                }}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-140 flex-col font-display text-base leading-none">
          <div className="flex items-start gap-6 border-b border-primary-container bg-primary-container/40 px-3 py-2.5">
            <span className="w-80 shrink-0 font-semibold text-on-primary-container">
              Actividad
            </span>
            <span className="w-60 shrink-0 font-semibold text-on-primary-container">
              Tiempo
            </span>
            <span className="flex-1 font-semibold text-on-primary-container">
              Mensaje
            </span>
          </div>
          {template.activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center gap-6 px-3 py-2.5 ${
                index < template.activities.length - 1
                  ? 'border-b border-primary-container'
                  : ''
              }`}
            >
              <span className="w-80 py-[2.6px] shrink-0 text-on-primary-container">
                {activity.activity}
              </span>
              <span className="w-60 py-[2.6px] shrink-0 text-on-primary-container">
                {activity.time}
              </span>
              <span className="flex-1 py-[2.6px] text-on-primary-container">
                {activity.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
