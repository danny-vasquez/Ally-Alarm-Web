export interface Category {
  id: string
  name: string
  color: string
  icon: string
  /** Tamaño del ícono en px para la vista Categorías (por defecto 40). */
  iconSize?: number
  alarmCount: number
  active: boolean
}
