import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import Select from '../ui/Select'
import categoriesData from '../../data/categories.json'
import type { Category } from '../../types/category'

const categories = categoriesData as Category[]

interface CreateTemplateModalProps {
  open: boolean
  onClose: () => void
  onContinue: (categoryId: string) => void
}

/**
 * Modal "Nueva plantilla" (recursos-figma/plantillasModal.html): caja fija
 * 600x400 a 1920 (padding 48px, gap 20px entre elementos, todo alineado a
 * la izquierda), con achique responsivo hacia abajo de ese base.
 */
export default function CreateTemplateModal({
  open,
  onClose,
  onContinue,
}: CreateTemplateModalProps) {
  const [categoryId, setCategoryId] = useState('')

  const handleClose = () => {
    setCategoryId('')
    onClose()
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}
    >
      <div
        className="flex w-[calc(100vw-32px)] max-w-125 flex-col items-start justify-center gap-4 rounded-lg border border-primary-container bg-surface p-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] xl:max-w-137.5 xl:p-8 2xl:h-100 2xl:w-150 2xl:max-w-150 2xl:gap-5 2xl:p-12"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="font-display text-2xl font-bold text-on-primary-container 2xl:text-[28px]">
          Nueva plantilla
        </h2>
        <p className="max-w-97.5 font-display text-base text-on-primary-container">
          ¿En qué categoría quieres crear esta plantilla?
        </p>
        <p className="self-stretch font-display text-base text-on-primary-container">
          Estás creando una plantilla nueva. Luego podrás agregar todos los
          pasos que ocurren antes o después de que suene la alarma
        </p>
        <Select
          label=""
          options={categoryOptions}
          value={categoryId}
          onChange={setCategoryId}
          className="w-full max-w-74.25"
        />
        <div className="flex w-full justify-end gap-2.5">
          <Button variant="tonal-muted" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="filled"
            disabled={!categoryId}
            onClick={() => categoryId && onContinue(categoryId)}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
