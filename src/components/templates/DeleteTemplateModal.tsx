import { useEffect } from 'react'
import Button from '../ui/Button'
import iconoEliminar from '../../assets/icono-eliminar.svg'

interface DeleteTemplateModalProps {
  open: boolean
  templateName: string
  onCancel: () => void
  onConfirm: () => void
}

/**
 * Modal "¿Deseas eliminar la plantilla...?" (recursos-figma/modal-borrar-
 * plantilla.html): misma caja fija 600x400 centrada que el modal de
 * desactivar categoría, con el ícono de eliminar.
 */
export default function DeleteTemplateModal({
  open,
  templateName,
  onCancel,
  onConfirm,
}: DeleteTemplateModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="flex w-[calc(100vw-32px)] max-w-125 flex-col items-center justify-center gap-4 rounded-lg border border-primary-container bg-surface px-6 py-8 text-center shadow-[0_4px_4px_rgba(0,0,0,0.25)] xl:max-w-137.5 2xl:h-100 2xl:w-150 2xl:max-w-150 2xl:gap-5 2xl:py-2.5"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={iconoEliminar}
          alt=""
          className="h-14 w-14 shrink-0 2xl:h-20 2xl:w-20"
        />
        <h2 className="max-w-97.5 font-display text-base font-bold text-on-primary-container">
          ¿Deseas eliminar la plantilla para &quot;{templateName}&quot;?
        </h2>
        <p className="max-w-97.5 font-display text-base text-on-primary-container">
          Tu configuración de alarmas previas o posteriores para esta
          categoría dejarán de funcionar
        </p>
        <div className="flex gap-2.5">
          <Button variant="tonal-muted" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="filled" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}
