import { Menu } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { MdIconButtonR } from '../../lib/material'
import Sidebar from './Sidebar'

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full lg:flex-row">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen w-full flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-primary-container bg-surface px-4 py-3 lg:hidden">
          <MdIconButtonR
            aria-label="Abrir menú"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </MdIconButtonR>
          <span className="font-display text-xl font-bold text-on-primary-container">
            Ally Alarm
          </span>
        </header>

        <main className="flex flex-1 flex-col gap-10 px-4 py-6 sm:px-8 sm:py-8 md:px-10 lg:px-content-x lg:py-content-y">
          {children}
        </main>
      </div>
    </div>
  )
}
