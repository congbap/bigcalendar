import { cn } from '@/lib/utils'
import { CalendarCell, CalendarEvent } from '../../types'
import { isToday, startOfDay } from 'date-fns'
import { useMemo } from 'react'
import { getMonthCellEvents } from '../../helpers'
import { MonthEventBadge } from './month-event-badge'
import { EventBullet } from './event-bullet'

type DayCellProps = {
  cell: CalendarCell
  events: CalendarEvent[]
  eventPositions: Record<string, number>
  maxVisibleEvents?: number
}

export function DayCell({ cell, events, eventPositions, maxVisibleEvents }: DayCellProps) {
  const { day, currentMonth, date } = cell

  const cellEvents = useMemo(() => getMonthCellEvents(date, events, eventPositions), [date, events, eventPositions])
  const isSunday = date.getDay() === 0

  // const cellHeight = 2 * (maxVisibleEvents ? maxVisibleEvents : cellEvents.length)
  const cellHeight = 2 * Math.min(maxVisibleEvents ? maxVisibleEvents : cellEvents.length, cellEvents.length)

  // todo: resize
  return (
    <div className={cn('flex h-full flex-col gap-1 border-l border-t py-1.5 md:py-2', isSunday && 'border-l-0')}>
      <span
        className={cn(
          'h-6 px-1 text-xs font-semibold md:px-2',
          !currentMonth && 'opacity-20',
          isToday(date) && 'flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary px-0 font-bold text-primary-foreground',
        )}
      >
        {day}
      </span>

      <div className={cn(`flex h-6 gap-1 px-2 md:h-[${cellHeight}rem] md:flex-col md:gap-2 md:px-0`, !currentMonth && 'opacity-50')}>
        {cellEvents.slice(0, maxVisibleEvents).map((event) => {
          const position = event.position
          const eventKey = event ? `event-${event.id}-${position}` : `empty-${position}`

          return (
            <div key={eventKey} className='md:flex-1'>
              {event && (
                <>
                  <EventBullet className='md:hidden' color={event.color} />
                  <MonthEventBadge className='hidden md:flex' event={event} cellDate={startOfDay(date)} />
                </>
              )}
            </div>
          )
        })}
      </div>

      {maxVisibleEvents && cellEvents.length > maxVisibleEvents && (
        <p className={cn('h-4.5 px-1.5 text-xs font-semibold text-muted-foreground', !currentMonth && 'opacity-50')}>
          <span className='md:hidden'>+{cellEvents.length - maxVisibleEvents}</span>
          <span className='hidden md:inline'> {cellEvents.length - maxVisibleEvents} more...</span>
        </p>
      )}
    </div>
  )
}
