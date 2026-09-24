import { useNavigate } from 'react-router-dom'
import type { SettingsItem as SettingsItemType } from '../../types/settingsItem'
import iconoDispositivos from '../../assets/icono-dispositivos.svg'

const SETTINGS_ICONS: Record<string, string> = {
  dispositivos: iconoDispositivos,
}

interface SettingsItemProps {
  item: SettingsItemType
}

export default function SettingsItem({ item }: SettingsItemProps) {
  const icon = SETTINGS_ICONS[item.icon] ?? iconoDispositivos
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(`/configuracion/${item.id}`)}
      className="flex w-full items-center gap-4 rounded-lg border border-primary-container bg-surface px-5 py-4 text-left font-display text-base text-on-primary-container shadow-[0_4px_4px_rgba(0,0,0,0.12)] transition-colors hover:bg-surface-tint"
    >
      <img src={icon} alt="" className="h-11 w-11 shrink-0 object-contain" />
      <span className="font-semibold">{item.name}</span>
    </button>
  )
}
