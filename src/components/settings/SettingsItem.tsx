import { Smartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { SettingsItem as SettingsItemType } from '../../types/settingsItem'

const SETTINGS_ICONS: Record<string, LucideIcon> = {
  smartphone: Smartphone,
}

interface SettingsItemProps {
  item: SettingsItemType
}

export default function SettingsItem({ item }: SettingsItemProps) {
  const Icon = SETTINGS_ICONS[item.icon] ?? Smartphone
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(`/configuracion/${item.id}`)}
      className="flex w-full items-center gap-4 rounded-lg border border-primary-container bg-surface px-5 py-4 text-left font-display text-base text-on-primary-container shadow-[0_4px_4px_rgba(0,0,0,0.12)] transition-colors hover:bg-surface-tint"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-container text-secondary">
        <Icon size={22} aria-hidden="true" />
      </span>
      <span className="font-semibold">{item.name}</span>
    </button>
  )
}
