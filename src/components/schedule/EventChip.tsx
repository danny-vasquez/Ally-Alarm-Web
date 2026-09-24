import categoriesData from '../../data/categories.json'
import { CATEGORY_ICON_MAP, CATEGORY_BG_MAP } from '../../data/categoryVisuals'
import type { Category } from '../../types/category'
import type { ScheduleEvent } from '../../types/schedule'

const categories = categoriesData as Category[]

interface EventChipProps {
  event: ScheduleEvent
}

export default function EventChip({ event }: EventChipProps) {
  const category = categories.find((c) => c.id === event.categoryId)
  if (!category) return null

  const icon = CATEGORY_ICON_MAP[category.icon]
  const bg = CATEGORY_BG_MAP[category.color]
  const iconSize = 'h-4 w-4 xlm:h-4.5 xlm:w-4.5 2xl:h-6.25 2xl:w-6.25'

  return (
    <div
      className={`flex h-full w-full items-center gap-1.5 rounded-md px-2 shadow-[0_4px_4px_rgba(0,0,0,0.25)] xlm:gap-2 ${bg}`}
    >
      <img src={icon} alt="" className={`shrink-0 object-contain ${iconSize}`} />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 2xl:max-w-35.5">
        <span className="truncate font-display text-[11px] font-semibold leading-tight text-on-primary-container xlm:text-[13px] 2xl:text-base">
          {event.title}
        </span>
        <span className="w-fit max-w-full truncate rounded-full bg-primary-container px-2 font-display text-[8px] font-semibold text-on-primary-container xlm:text-[9px] 2xl:px-2.5 2xl:text-[10px]">
          {event.timeLabel}
        </span>
      </div>
    </div>
  )
}
