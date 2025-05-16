'use client'

import { useMemo } from 'react'
import { useCalendar } from '../../contexts/calendar-context'
import { Event } from '../../types'
import { calculateMonthEventPositions, getCalendarCells } from '../../helpers'
import { DayCell } from './day-cell'
import { isSameDay, parseISO } from 'date-fns'

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type CalendarMonthViewProps = {}

export function CalendarMonthView(props?: CalendarMonthViewProps) {
  const { selectedDate, events } = useCalendar()

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate])

  const filteredEvents = useMemo(() => {
    return events?.filter((event) => {
      const eventStartDate = parseISO(event.startDate)
      const eventEndDate = parseISO(event.endDate)

      const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59, 999)
      const isInSelectedMonth = eventStartDate <= monthEnd && eventEndDate >= monthStart
      return isInSelectedMonth
    })
  }, [selectedDate, events])

  const singleDayEvents = filteredEvents?.filter((event) => {
    const startDate = parseISO(event.startDate)
    const endDate = parseISO(event.endDate)
    return isSameDay(startDate, endDate)
  })

  const multiDayEvents = filteredEvents?.filter((event) => {
    const startDate = parseISO(event.startDate)
    const endDate = parseISO(event.endDate)
    return !isSameDay(startDate, endDate)
  })

  const eventPositions = useMemo(
    () => calculateMonthEventPositions(multiDayEvents ?? [], singleDayEvents ?? [], selectedDate),
    [multiDayEvents, singleDayEvents, selectedDate],
  )

  return (
    <div>
      <div className='grid grid-cols-7 divide-x'>
        {WEEK_DAYS.map((day) => (
          <div key={day} className='flex items-center justify-center py-2'>
            <span className='text-xs font-medium text-muted-foreground'>{day}</span>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 overflow-hidden'>
        {cells.map((cell) => (
          <DayCell key={cell.date.toISOString()} cell={cell} events={events} eventPositions={eventPositions} />
        ))}
      </div>
    </div>
  )
}
