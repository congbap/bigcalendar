import { cva, VariantProps } from 'class-variance-authority'
import { CalendarEvent } from '../../types'
import { endOfDay, isSameDay, parseISO, startOfDay } from 'date-fns'
import { cn } from '@/lib/utils'
import { adjustShade } from '../../lib/utils'

const eventBadgeVariants = cva(
  'mx-1 flex size-auto h-6.5 select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
  {
    variants: {
      multiDayPosition: {
        first: 'relative z-10 mr-0 w-[calc(100%_-_3px)] rounded-r-none border-r-0 [&>span]:mr-2.5',
        middle: 'relative z-10 mx-0 w-[calc(100%_+_1px)] rounded-none border-x-0',
        last: 'ml-0 rounded-l-none border-l-0',
        none: '',
      },
    },
  },
)

interface MonthEventBadgeProps extends Omit<VariantProps<typeof eventBadgeVariants>, 'color' | 'multiDayPosition'> {
  event: CalendarEvent
  cellDate: Date
  eventCurrentDay?: number
  eventTotalDays?: number
  className?: string
  position?: 'first' | 'middle' | 'last' | 'none'
}

export function MonthEventBadge({ event, cellDate, eventCurrentDay, eventTotalDays, className, position: propPosition }: MonthEventBadgeProps) {
  const itemStart = startOfDay(parseISO(event.startDate))
  const itemEnd = endOfDay(parseISO(event.endDate))

  let position: 'first' | 'middle' | 'last' | 'none' | undefined

  if (propPosition) {
    position = propPosition
  } else if (eventCurrentDay && eventTotalDays) {
    position = 'none'
  } else if (isSameDay(itemStart, itemEnd)) {
    position = 'none'
  } else if (isSameDay(cellDate, itemStart)) {
    position = 'first'
  } else if (isSameDay(cellDate, itemEnd)) {
    position = 'last'
  } else {
    position = 'middle'
  }

  const renderBadgeText = ['first', 'none'].includes(position)

  // todo: recolor
  // blue: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 [&_.event-dot]:fill-blue-600',
  // 'blue-dot': 'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-blue-600',
  // color: 'blue-dot',
  const colorClasses = [
    `bg-neutral-50`,
    `dark:bg-neutral-900`,
    `[&_.event-dot]:fill-blue-600`,
    `border-[${adjustShade(event.color, 200)}]`,
    `bg-[${adjustShade(event.color, 50)}]`,
    `text-[${adjustShade(event.color, 700)}]`,
    `dark:border-[${adjustShade(event.color, 800)}]`,
    `dark:bg-[${adjustShade(event.color, 950)}]`,
    `dark:text-[${adjustShade(event.color, 300)}]`,
    `[&_.event-dot]:fill-[${adjustShade(event.color, 600)}]`,
  ]

  const eventBadgeClasses = cn(eventBadgeVariants({ multiDayPosition: position, className }), ...colorClasses)

  return (
    <div className={eventBadgeClasses} title={event.title}>
      <div className='flex items-center gap-1.5 truncate'>
        {renderBadgeText && (
          <p className='flex-1 truncate font-semibold'>
            {eventCurrentDay && (
              <span className='text-xs'>
                Day {eventCurrentDay} of {eventTotalDays} •{' '}
              </span>
            )}
            {event.title}
          </p>
        )}
      </div>
    </div>
  )
}
