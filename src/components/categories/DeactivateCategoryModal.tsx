import { useEffect } from 'react'
import Button from '../ui/Button'
import iconoAdvertencia from '../../assets/icono-advertencia.svg'

interface DeactivateCategoryModalProps {
  open: boolean
  categoryName: string
  onCancel: () => void
  onConfirm: () => void
}

/**
 * Modal "¿Desactivar alarmas de...?" (recursos-figma/modal-activar-
 * desactivar-categoria.html): caja fija 600x400 a 1920 (igual que el
 * modal de Nueva Plantilla), pero acá todo centrado en vez de alineado a
 * la izquierda.
 */
export default function DeactivateCategoryModal({
  open,
  categoryName,
  onCancel,
  onConfirm,
}: DeactivateCategoryModalProps) {
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
          src={iconoAdvertencia}
          alt=""
          className="h-14 w-14 shrink-0 2xl:h-20 2xl:w-20"
        />
        <h2 className="max-w-97.5 font-display text-base font-bold text-on-primary-container">
          ¿Desactivar alarmas de &quot;{categoryName}&quot;?
        </h2>
        <p className="max-w-97.5 font-display text-base font-bold text-on-primary-container">
          Todas las alarmas de esta categoría quedarán desactivadas
        </p>
        <p className="max-w-97.5 font-display text-base font-bold text-on-primary-container">
          Podrás activarlas nuevamente cuando quieras
        </p>
        <div className="flex gap-2.5">
          <Button variant="tonal-muted" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="filled" onClick={onConfirm}>
            Desactivar
          </Button>
        </div>
      </div>
    </div>
  )
}
