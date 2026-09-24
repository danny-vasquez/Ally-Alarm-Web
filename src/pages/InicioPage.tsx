import { useMemo, useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Select from '../components/ui/Select'
import WeekCalendar from '../components/schedule/WeekCalendar'
import categoriesData from '../data/categories.json'
import scheduleData from '../data/schedule.json'
import userData from '../data/user.json'
import type { Category } from '../types/category'
import type { ScheduleEvent } from '../types/schedule'
import type { AppUser } from '../types/user'

const user = userData as AppUser
const categories = categoriesData as Category[]
const schedule = scheduleData as ScheduleEvent[]
const ALL_CATEGORIES = 'all'

export default function InicioPage() {
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES)

  const categoryOptions = [
    { value: ALL_CATEGORIES, label: 'Categoría' },
    ...categories.map((category) => ({ value: category.id, label: category.name })),
  ]

  const visibleEvents = useMemo(
    () =>
      categoryFilter === ALL_CATEGORIES
        ? schedule
        : schedule.filter((event) => event.categoryId === categoryFilter),
    [categoryFilter],
  )

  return (
    <>
      <PageHeader
        title={`¡Buenos días, ${user.name}!`}
        subtitle="Aquí tienes tus alarmas de esta semana"
      />

      <div className="flex items-center justify-end gap-2.5">
        <span className="font-display text-base text-on-primary-container">
          Filtrar por categoría:
        </span>
        <Select
          label=""
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
      </div>

      <WeekCalendar events={visibleEvents} />
    </>
  )
}
