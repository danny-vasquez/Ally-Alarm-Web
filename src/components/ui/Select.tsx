import { MdOutlinedSelectR, MdSelectOptionR } from '../../lib/material'
import type { MdOutlinedSelect } from '@material/web/select/outlined-select.js'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label: string
  options: SelectOption[]
  value?: string
  required?: boolean
  onChange?: (value: string) => void
  className?: string
}

/**
 * Desplegable MD3 real (md-outlined-select) reskineado con la paleta del
 * diseño vía tokens --md-sys-color-* / --md-sys-shape-* (ver theme.css).
 */
export default function Select({
  label,
  options,
  value,
  required,
  onChange,
  className,
}: SelectProps) {
  return (
    <MdOutlinedSelectR
      label={label}
      value={value}
      required={required}
      className={`w-full ${className ?? ''}`}
      onchange={(event) => {
        const target = event.target as MdOutlinedSelect
        onChange?.(target.value)
      }}
    >
      {options.map((option) => (
        <MdSelectOptionR key={option.value} value={option.value}>
          <div slot="headline">{option.label}</div>
        </MdSelectOptionR>
      ))}
    </MdOutlinedSelectR>
  )
}
