import iconoPesa from '../assets/icono-pesa.svg'
import iconoReunion from '../assets/icono-reunion.svg'
import iconoMedicamento from '../assets/icono-medicamento.svg'
import iconoEstudio from '../assets/icono-estudio.svg'

/**
 * Mapa compartido ícono/color por categoría (usado en CategoryToggleCard y
 * en los eventos del calendario de Inicio) para no duplicar la asociación
 * ícono SVG <-> color de categoría en cada pantalla.
 */
export const CATEGORY_ICON_MAP: Record<string, string> = {
  dumbbell: iconoPesa,
  users: iconoReunion,
  pill: iconoMedicamento,
  'book-open': iconoEstudio,
}

export const CATEGORY_BG_MAP: Record<string, string> = {
  'category-a': 'bg-category-a',
  'category-b': 'bg-category-b',
  'category-c': 'bg-category-c',
  'category-d': 'bg-category-d',
  'category-e': 'bg-category-e',
}
