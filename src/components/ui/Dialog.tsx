import type { CSSProperties, ReactNode } from 'react'
import { MdDialogR } from '../../lib/material'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  icon?: ReactNode
  headline: ReactNode
  children: ReactNode
  actions: ReactNode
}

/**
 * Wrapper sobre md-dialog (MD3 real): maneja scrim, animaciones de
 * apertura/cierre, foco atrapado y cierre con Escape de forma nativa.
 */
export default function Dialog({
  open,
  onOpenChange,
  icon,
  headline,
  children,
  actions,
}: DialogProps) {
  return (
    <MdDialogR
      open={open}
      onclose={() => onOpenChange(false)}
      oncancel={() => onOpenChange(false)}
      style={
        {
          '--md-dialog-container-color': 'var(--color-surface)',
        } as CSSProperties
      }
    >
      {icon && (
        <div slot="icon" className="text-primary">
          {icon}
        </div>
      )}
      <div slot="headline" className="text-center">
        {headline}
      </div>
      <div
        slot="content"
        className="flex flex-col items-center gap-4 text-center"
      >
        {children}
      </div>
      <div slot="actions" className="flex w-full justify-center gap-2.5">
        {actions}
      </div>
    </MdDialogR>
  )
}
