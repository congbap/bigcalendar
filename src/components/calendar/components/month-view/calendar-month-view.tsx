import { useMemo } from 'react'

import { weekDays } from '../../constants'
import { useCalendar } from '../../contexts/calendar-context'
import { calculateMonthEventPositions, getCalendarCells } from '../../helpers'
import { DayCell } from './day-cell'

export function CalendarMonthView() {
  const {
    selectedDate,
    filteredEvents,
    singleDayEvents,
    multiDayEvents,
    visibleEventCount,
  } = useCalendar()

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate])

  const eventPositions = useMemo(
    () =>
      calculateMonthEventPositions(
        multiDayEvents,
        singleDayEvents,
        selectedDate,
        visibleEventCount,
        'month',
      ),
    [multiDayEvents, singleDayEvents, selectedDate, visibleEventCount],
  )

  return (
    <div>
      <div className='grid grid-cols-7 divide-x'>
        {weekDays.map((day) => (
          <div key={day} className='flex items-center justify-center py-2'>
            <span className='text-xs font-medium text-muted-foreground'>
              {day}
            </span>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 overflow-hidden'>
        {cells.map((cell) => (
          <DayCell
            key={cell.date.toISOString()}
            cell={cell}
            events={filteredEvents}
            eventPositions={eventPositions}
            visibleEventCount={visibleEventCount}
          />
        ))}
      </div>
    </div>
  )
}
