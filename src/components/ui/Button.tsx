import type { CSSProperties, ReactNode } from 'react'
import {
  MdFilledButtonR,
  MdFilledTonalButtonR,
  MdOutlinedButtonR,
  MdTextButtonR,
} from '../../lib/material'

type ButtonVariant = 'filled' | 'tonal' | 'tonal-muted' | 'outlined' | 'text'

interface ButtonProps {
  variant?: ButtonVariant
  icon?: ReactNode
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

// "Cancelar" en el diseño usa un tonal mucho más claro que el resto de
// botones tonales (#F5EFF7 en vez del primary-container #BCBFFF).
const mutedTonalStyle = {
  '--md-filled-tonal-button-container-color': 'var(--color-tonal)',
  '--md-filled-tonal-button-label-text-color': 'var(--color-on-primary-container)',
  '--md-filled-tonal-button-hover-label-text-color': 'var(--color-on-primary-container)',
  '--md-filled-tonal-button-hover-state-layer-color': 'var(--color-on-primary-container)',
  '--md-filled-tonal-button-pressed-label-text-color': 'var(--color-on-primary-container)',
} as CSSProperties

export default function Button({
  variant = 'filled',
  icon,
  children,
  onClick,
  type = 'button',
  disabled,
  className,
}: ButtonProps) {
  const iconSlot = icon ? <span slot="icon">{icon}</span> : null

  const commonProps = {
    type,
    disabled,
    onClick,
    className: `min-w-[160px] justify-center ${className ?? ''}`,
  }

  switch (variant) {
    case 'tonal':
      return (
        <MdFilledTonalButtonR {...commonProps}>
          {iconSlot}
          {children}
        </MdFilledTonalButtonR>
      )
    case 'tonal-muted':
      return (
        <MdFilledTonalButtonR {...commonProps} style={mutedTonalStyle}>
          {iconSlot}
          {children}
        </MdFilledTonalButtonR>
      )
    case 'outlined':
      return (
        <MdOutlinedButtonR {...commonProps}>
          {iconSlot}
          {children}
        </MdOutlinedButtonR>
      )
    case 'text':
      return (
        <MdTextButtonR {...commonProps}>
          {iconSlot}
          {children}
        </MdTextButtonR>
      )
    case 'filled':
    default:
      return (
        <MdFilledButtonR {...commonProps}>
          {iconSlot}
          {children}
        </MdFilledButtonR>
      )
  }
}
