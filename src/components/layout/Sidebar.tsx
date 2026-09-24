import { LayoutTemplate, House, CircleX, Settings, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  MdDividerR,
  MdIconR,
  MdIconButtonR,
  MdListItemR,
  MdListR,
} from '../../lib/material'
import allyAlarmLogo from '../../assets/logo_ally_alarm.png'
import sidebarPhoto from '../../assets/sidebar-photo.png'
import userData from '../../data/user.json'
import type { AppUser } from '../../types/user'

interface NavItem {
  label: string
  icon: LucideIcon
  path: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', icon: House, path: '/' },
  { label: 'Plantillas', icon: LayoutTemplate, path: '/plantillas' },
  { label: 'Categorías', icon: CircleX, path: '/categorias' },
  { label: 'Configuración', icon: Settings, path: '/configuracion' },
]

const user = userData as AppUser

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

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
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] max-w-[85vw] -translate-x-full flex-col items-center gap-6 overflow-y-auto border-r-[1.29px] border-primary bg-surface bg-cover bg-center bg-no-repeat p-6 transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:w-sidebar lg:max-w-none lg:translate-x-0 ${
          open ? 'translate-x-0' : ''
        }`}
        style={{ backgroundImage: `url(${sidebarPhoto})` }}
      >
        <MdIconButtonR
          onClick={onClose}
          aria-label="Cerrar menú"
          className="self-end lg:hidden"
        >
          <X size={22} />
        </MdIconButtonR>

        <div className="py-[10px] flex w-full items-center justify-center gap-3 bg-amber-200">
          <img
            src={allyAlarmLogo}
            alt="Logo de Ally Alarm"
            className="h-14 w-14 shrink-0 object-contain lg:h-20 lg:w-20"
          />

          <span className="leading-none hrink-0 bg-red-100 font-display text-2xl font-bold text-on-primary-container lg:text-[32px] text-center">
            Ally<br />Alarm
          </span>
        </div>

        <MdListR
          className="w-full rounded-xl"
          aria-label="Navegación principal"
          style={
            { '--md-list-container-color': 'transparent' } as CSSProperties
          }
        >
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
            const active =
              location.pathname === path ||
              (path !== '/' && location.pathname.startsWith(`${path}/`))
            return (
              <MdListItemR
                key={label}
                type="link"
                href={path}
                aria-current={active ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  onClose()
                  navigate(path)
                }}
                className={`mb-1 rounded-lg last:mb-0 ${
                  active
                    ? 'bg-primary-container'
                    : 'hover:bg-primary-container/40'
                }`}
                style={
                  {
                    '--md-list-item-label-text-font': 'var(--font-display)',
                    '--md-list-item-label-text-size': '16px',
                    '--md-list-item-label-text-weight': active ? '600' : '500',
                  } as CSSProperties
                }
              >
                <span slot="start" className="inline-flex text-secondary">
                  <Icon size={20} strokeWidth={2} />
                </span>
                {label}
              </MdListItemR>
            )
          })}
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
              <MdIconR
                className="text-secondary"
                style={{ '--md-icon-size': '28px' } as CSSProperties}
              >
                person
              </MdIconR>
            )}
          </div>
          <span className="font-display text-xl font-bold text-white lg:text-[28px]">
            {user.name}
          </span>
        </div>
      </aside>
    </>
  )
}
