import { BookOpen, Dumbbell, Pill, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { MdSwitchR } from '../../lib/material'
import type { Category } from '../../types/category'

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  users: Users,
  pill: Pill,
  'book-open': BookOpen,
}

const CATEGORY_BG_MAP: Record<string, string> = {
  'category-a': 'bg-category-a',
  'category-c': 'bg-category-c',
  'category-d': 'bg-category-d',
  'category-e': 'bg-category-e',
}

interface CategoryToggleCardProps {
  category: Category
  onToggle: (id: string) => void
}

export default function CategoryToggleCard({
  category,
  onToggle,
}: CategoryToggleCardProps) {
  const Icon = CATEGORY_ICON_MAP[category.icon] ?? BookOpen
  const background = CATEGORY_BG_MAP[category.color] ?? 'bg-category-a'

  return (
    <div
      className={`flex w-full items-center justify-between gap-4 rounded-lg border border-primary-container px-5 py-4 ${background}`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface text-secondary">
          <Icon size={24} aria-hidden="true" />
        </span>
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
