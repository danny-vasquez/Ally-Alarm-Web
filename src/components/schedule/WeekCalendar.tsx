import { Fragment } from 'react'
import EventChip from './EventChip'
import type { ScheduleEvent } from '../../types/schedule'

const DAYS = [
  { id: 'lunes', label: 'Lunes' },
  { id: 'martes', label: 'Martes' },
  { id: 'miercoles', label: 'Miércoles' },
  { id: 'jueves', label: 'Jueves' },
  { id: 'viernes', label: 'Viernes' },
  { id: 'sabado', label: 'Sábado' },
  { id: 'domingo', label: 'Domingo' },
]

const HOURS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
]

interface WeekCalendarProps {
  events: ScheduleEvent[]
}

// Ancho de columna compartido por TODAS las filas: una sola definición de
// grid en vez de un <div flex> por fila, que es lo que causaba que las
// filas con evento (contenido más ancho) desalinearan sus columnas del
// resto de la tabla. Debajo de ~720px (columnas en su piso mínimo) la
// tabla completa scrollea horizontal dentro de sí misma, no la página.
const GRID_COLS =
  'grid-cols-[56px_repeat(7,minmax(70px,1fr))] xl:grid-cols-[64px_repeat(7,minmax(80px,1fr))] xlm:grid-cols-[76px_repeat(7,minmax(100px,1fr))] 2xl:grid-cols-[90px_repeat(7,minmax(0,1fr))]'

/**
 * Calendario semanal de la vista Inicio: la cuadrícula (90x50 encabezado,
 * 90px la columna de hora, 11 filas de ~59.9px) mide exactamente lo del
 * diseño de Figma a partir de 1920px (2xl); por debajo se achica en pasos
 * (xl/xlm).
 */
export default function WeekCalendar({ events }: WeekCalendarProps) {
  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-lg border-[1.29px] border-primary-container bg-surface shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className={`grid ${GRID_COLS}`}>
        <div className="flex h-10 items-center justify-center border-b-[1.29px] border-r border-b-secondary border-r-primary-container xl:h-10.5 xlm:h-11 2xl:h-12.5">
          <span className="font-display text-[16px] font-bold text-on-primary-container">
            Hora
          </span>
        </div>
        {DAYS.map((day, index) => (
          <div
            key={day.id}
            className={`flex h-10 items-center justify-center border-b-[1.29px] border-b-secondary xl:h-10.5 xlm:h-11 2xl:h-12.5 ${
              index < DAYS.length - 1 ? 'border-r border-r-primary-container' : ''
            }`}
          >
            <span className="px-1 text-center font-display text-[13px] font-bold whitespace-nowrap text-on-primary-container xlm:text-[15px] 2xl:text-base">
              {day.label}
            </span>
          </div>
        ))}

        {HOURS.map((hour, rowIndex) => {
          const isLastRow = rowIndex === HOURS.length - 1
          return (
            <Fragment key={hour}>
              <div
                className={`flex min-h-12 items-center justify-center border-r border-primary-container xlm:min-h-14 2xl:h-14.975 ${
                  isLastRow ? '' : 'border-b'
                }`}
              >
                <span className="font-display text-sm font-semibold text-on-primary-container 2xl:text-base">
                  {hour}
                </span>
              </div>
              {DAYS.map((day, index) => {
                const event = events.find((e) => e.day === day.id && e.hour === hour)
                return (
                  <div
                    key={`${hour}-${day.id}`}
                    className={`flex min-h-12 items-stretch justify-center overflow-hidden p-1.5 xlm:min-h-14 xlm:p-2 2xl:h-14.975 2xl:p-1.5 ${
                      isLastRow ? '' : 'border-b border-primary-container'
                    } ${index < DAYS.length - 1 ? 'border-r border-primary-container' : ''}`}
                  >
                    {event && <EventChip event={event} />}
                  </div>
                )
              })}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
