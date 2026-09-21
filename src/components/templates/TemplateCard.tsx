import { ChevronDown, Trash2 } from 'lucide-react'
import { useState } from 'react'
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
  onDelete: (template: TemplateCategory) => void
}

export default function TemplateCard({
  template,
  onDelete,
}: TemplateCardProps) {
  const [open, setOpen] = useState(true)
  const headerBg = CATEGORY_HEADER_BG[template.color] ?? 'bg-category-a'

  return (
    <div className="w-full overflow-hidden rounded-lg border-[1.29px] border-primary-container bg-surface shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div
        className={`flex items-center justify-between border-[1.29px] border-primary-container px-4 py-3 ${headerBg}`}
      >
        <h3 className="font-display text-base font-semibold text-on-primary-container">
          {template.name}
        </h3>
        <div className="flex items-center gap-1">
          <IconButton
            label={`Eliminar plantilla ${template.name}`}
            onClick={() => onDelete(template)}
          >
            <Trash2 size={18} />
          </IconButton>
          <IconButton
            label={open ? 'Contraer plantilla' : 'Expandir plantilla'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </IconButton>
        </div>
      </div>

      {open && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse font-display text-base">
            <thead>
              <tr className="border-b border-primary-container bg-surface-tint text-left">
                <th className="w-[320px] px-4 py-2.5 font-semibold text-on-primary-container">
                  Actividad
                </th>
                <th className="w-[240px] px-4 py-2.5 font-semibold text-on-primary-container">
                  Tiempo
                </th>
                <th className="px-4 py-2.5 font-semibold text-on-primary-container">
                  Mensaje
                </th>
              </tr>
            </thead>
            <tbody>
              {template.activities.map((activity, index) => (
                <tr
                  key={activity.id}
                  className={
                    index < template.activities.length - 1
                      ? 'border-b border-primary-container'
                      : ''
                  }
                >
                  <td className="px-4 py-3 text-on-primary-container">
                    {activity.activity}
                  </td>
                  <td className="px-4 py-3 text-on-primary-container">
                    {activity.time}
                  </td>
                  <td className="px-4 py-3 text-on-primary-container">
                    {activity.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
