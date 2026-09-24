import type { ReactNode } from 'react'
import type { TemplateSection } from '../../types/templateSection'

type EditableField = 'title' | 'minutesBefore' | 'message'

interface TemplateSectionCardProps {
  section: TemplateSection
  onChange: (field: EditableField, value: string) => void
}

const inputBase =
  'h-8 rounded-lg border border-primary-container bg-primary-container/20 px-4 font-display text-base text-on-primary-container placeholder:text-outline-neutral'

function FieldRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="shrink-0 font-display text-sm font-medium text-on-primary-container">
        {label}
      </span>
      {children}
    </div>
  )
}

/**
 * Una "sección" (paso) de la plantilla, recursos-figma/plantilla-
 * categoria(con|sin)plantilla.html: título, tiempo antes/después de la
 * alarma y mensaje personalizado. "Tiempo después" queda siempre
 * deshabilitado (así está en las dos variantes del diseño).
 */
export default function TemplateSectionCard({
  section,
  onChange,
}: TemplateSectionCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-2.5 rounded-lg border border-primary-container bg-surface px-2 py-4.5 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <FieldRow label="Título sección:">
        <input
          type="text"
          value={section.title}
          placeholder="Servir Café"
          onChange={(event) => onChange('title', event.target.value)}
          className={`${inputBase} w-full 2xl:w-151`}
        />
      </FieldRow>
      <FieldRow label="Tiempo antes de la alarma:">
        <input
          type="text"
          inputMode="numeric"
          value={section.minutesBefore}
          placeholder="45"
          onChange={(event) => onChange('minutesBefore', event.target.value)}
          className={`${inputBase} w-15.25`}
        />
        <span className="font-display text-sm font-medium text-on-primary-container">
          minutos
        </span>
      </FieldRow>
      <FieldRow label="Tiempo después de la alarma:">
        <input
          type="text"
          value=""
          disabled
          placeholder="15"
          className="h-8 w-15.25 rounded-lg border border-primary-container bg-[#dddddd] px-4 font-display text-base text-outline-neutral placeholder:text-outline-neutral"
        />
        <span className="font-display text-sm font-medium text-on-primary-container">
          minutos
        </span>
      </FieldRow>
      <FieldRow label="Mensaje personalizado:">
        <input
          type="text"
          value={section.message}
          placeholder="¡Ve con toda la energía!"
          onChange={(event) => onChange('message', event.target.value)}
          className={`${inputBase} w-full 2xl:w-135.5`}
        />
      </FieldRow>
    </div>
  )
}
