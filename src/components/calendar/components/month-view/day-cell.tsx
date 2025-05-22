import { isToday, startOfDay } from 'date-fns'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

import { getMonthCellEvents } from '../../helpers'
import { CalendarCell, CalendarEvent } from '../../types'
import { EventBullet } from './event-bullet'
import { MonthEventBadge } from './month-event-badge'
import { EventListDialog } from '../dialogs/events-list-dialog'

type DayCellProps = {
  cell: CalendarCell
  events: CalendarEvent[]
  eventPositions: Record<string, number>
  visibleEventCount: number
}

export function DayCell({
  cell,
  events,
  eventPositions,
  visibleEventCount,
}: DayCellProps) {
  const { day, currentMonth, date } = cell

  const cellEvents = useMemo(
    () => getMonthCellEvents(date, events, eventPositions),
    [date, events, eventPositions],
  )
  const isSunday = date.getDay() === 0

  const cellHeight = 2 * visibleEventCount

  const positions = Array.from({ length: visibleEventCount }, (_, i) => i)

  const positionEvents = cellEvents.filter((element) => element.position >= 0)
  const unpositionCount = cellEvents.length - positionEvents.length

  return (
    <div>
      <div
        className={cn(
          'flex h-full flex-col gap-1 border-l border-t py-1.5 md:py-2',
          isSunday && 'border-l-0',
        )}
      >
        <span
          className={cn(
            'h-6 px-1 text-xs font-semibold md:px-2',
            !currentMonth && 'opacity-20',
            isToday(date) &&
              'flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary px-0 font-bold text-primary-foreground',
          )}
        >
          {day}
        </span>

        <div
          style={{ '--cell-height': `${cellHeight}rem` } as React.CSSProperties}
          className={cn(
            `flex h-6 gap-1 px-2 md:h-[var(--cell-height)] md:flex-col md:gap-2 md:px-0`,
            !currentMonth && 'opacity-50',
          )}
        >
          {positions.map((position) => {
            const event = cellEvents.find((e) => e.position === position)
            const eventKey = event
              ? `event-${event.id}-${position}`
              : `empty-${position}`

            return (
              <div key={eventKey} className='md:flex-1'>
                {event && (
                  <>
                    <EventBullet className='md:hidden' color={event.color} />
                    <MonthEventBadge
                      className='hidden md:flex'
                      event={event}
                      cellDate={startOfDay(date)}
                    />
                  </>
                )}
              </div>
            )
          })}
        </div>

        {unpositionCount > 0 && (
          <EventListDialog date={date} events={cellEvents}>
            <span className='cursor-pointer'>
              <p
                className={cn(
                  'h-4.5 px-1.5 text-xs font-semibold text-muted-foreground',
                  !currentMonth && 'opacity-50',
                )}
              >
                <span className='md:hidden'>+{unpositionCount}</span>
                <span className='hidden md:inline'>
                  +{unpositionCount} more
                </span>
              </p>
            </span>
          </EventListDialog>
        )}
      </div>
    </div>
  )
}
