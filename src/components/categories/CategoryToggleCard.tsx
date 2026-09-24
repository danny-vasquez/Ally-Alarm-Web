import type { CSSProperties } from 'react'
import { MdSwitchR } from '../../lib/material'
import type { Category } from '../../types/category'
import iconoEstudio from '../../assets/icono-estudio.svg'
import { CATEGORY_ICON_MAP, CATEGORY_BG_MAP } from '../../data/categoryVisuals'

interface CategoryToggleCardProps {
  category: Category
  onToggle: (id: string) => void
}

export default function CategoryToggleCard({
  category,
  onToggle,
}: CategoryToggleCardProps) {
  const icon = CATEGORY_ICON_MAP[category.icon] ?? iconoEstudio
  const background = CATEGORY_BG_MAP[category.color] ?? 'bg-category-a'

  return (
    <div
      className={`flex w-full items-center justify-between gap-4 rounded-lg px-6.5 py-7 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${background}`}
    >
      <div className="flex min-w-0 items-center gap-5">
        <img
          src={icon}
          alt=""
          className="shrink-0 object-contain"
          style={{ width: category.iconSize ?? 40, height: category.iconSize ?? 40 }}
        />
        <div className="min-w-0 font-display text-on-primary-container">
          <h2 className="truncate text-base font-semibold">{category.name}</h2>
          <p className="text-sm">
            {category.alarmCount} {category.alarmCount === 1 ? 'alarma' : 'alarmas'}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 font-display text-sm text-on-primary-container">
        <span>{category.active ? 'Activado' : 'Desactivado'}</span>
        <MdSwitchR
          selected={category.active}
          aria-label={`${category.active ? 'Desactivar' : 'Activar'} categoría ${category.name}`}
          onchange={() => onToggle(category.id)}
          style={{ '--md-switch-selected-track-color': 'var(--color-secondary)' } as CSSProperties}
        />
      </div>
    </div>
  )
}
