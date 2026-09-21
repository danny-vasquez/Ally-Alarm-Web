import type { ReactNode } from 'react'
import { MdIconButtonR } from '../../lib/material'

interface IconButtonProps {
  children: ReactNode
  label: string
  onClick?: () => void
  className?: string
  'aria-expanded'?: boolean
}

export default function IconButton({
  children,
  label,
  className,
  ...props
}: IconButtonProps) {
  return (
    <MdIconButtonR aria-label={label} className={className} {...props}>
      {children}
    </MdIconButtonR>
  )
}
