import {
  AlarmClock,
  LayoutTemplate,
  House,
  Shapes,
  Settings,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { MdDividerR, MdIconButtonR, MdListItemR, MdListR } from '../../lib/material'
import userData from '../../data/user.json'
import type { AppUser } from '../../types/user'

interface NavItem {
  label: string
  icon: LucideIcon
  active?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', icon: House },
  { label: 'Plantillas', icon: LayoutTemplate, active: true },
  { label: 'Categorías', icon: Shapes },
  { label: 'Configuración', icon: Settings },
]

const user = userData as AppUser

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] max-w-[85vw] -translate-x-full flex-col items-center gap-6 overflow-y-auto border-r-[1.29px] border-primary bg-surface p-6 transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:w-sidebar lg:max-w-none lg:translate-x-0 ${
          open ? 'translate-x-0' : ''
        }`}
      >
        <MdIconButtonR
          onClick={onClose}
          aria-label="Cerrar menú"
          className="self-end lg:hidden"
        >
          <X size={22} />
        </MdIconButtonR>

        <div className="flex w-full items-center justify-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-container lg:h-20 lg:w-20">
            <AlarmClock
              size={32}
              strokeWidth={2}
              className="text-secondary lg:h-10 lg:w-10"
            />
          </div>
          <span className="font-display text-2xl font-bold text-on-primary-container lg:text-[32px]">
            Ally Alarm
          </span>
        </div>

        <MdListR
          className="w-full rounded-xl"
          aria-label="Navegación principal"
        >
          {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
            <MdListItemR
              key={label}
              type="button"
              aria-current={active ? 'page' : undefined}
              className={`mb-1 rounded-lg last:mb-0 ${
                active ? 'bg-primary-container' : 'hover:bg-primary-container/40'
              }`}
              style={
                {
                  '--md-list-item-label-text-font': 'var(--font-display)',
                  '--md-list-item-label-text-weight': active ? '600' : '500',
                } as CSSProperties
              }
            >
              <span slot="start" className="inline-flex text-secondary">
                <Icon size={20} strokeWidth={2} />
              </span>
              {label}
            </MdListItemR>
          ))}
        </MdListR>

        <div className="flex-1" />

        <MdDividerR />

        <div className="flex w-full items-center justify-center gap-4 py-2">
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-primary-container">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="font-display text-xl font-bold text-secondary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="font-display text-xl font-bold text-on-primary-container lg:text-[28px]">
            {user.name}
          </span>
        </div>
      </aside>
    </>
  )
}
