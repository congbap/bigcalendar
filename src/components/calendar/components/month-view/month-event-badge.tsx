import { VariantProps, cva } from 'class-variance-authority'
import { endOfDay, isSameDay, parseISO, startOfDay } from 'date-fns'

import { cn } from '@/lib/utils'

import { CalendarEvent } from '../../types'

// todo: extend
export const eventBadgeColorVariants = cva('', {
  variants: {
    color: {
      // Colored and mixed variants
      red: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300 [&_.event-dot]:fill-red-600',
      orange:
        'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300 [&_.event-dot]:fill-orange-600',
      amber:
        'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300 [&_.event-dot]:fill-amber-600',
      yellow:
        'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 [&_.event-dot]:fill-yellow-600',
      lime: 'border-lime-200 bg-lime-50 text-lime-700 dark:border-lime-800 dark:bg-lime-950 dark:text-lime-300 [&_.event-dot]:fill-lime-600',
      green:
        'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300 [&_.event-dot]:fill-green-600',
      emerald:
        'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 [&_.event-dot]:fill-emerald-600',
      teal: 'border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300 [&_.event-dot]:fill-teal-600',
      cyan: 'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 [&_.event-dot]:fill-cyan-600',
      sky: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300 [&_.event-dot]:fill-sky-600',
      blue: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 [&_.event-dot]:fill-blue-600',
      indigo:
        'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 [&_.event-dot]:fill-indigo-600',
      violet:
        'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300 [&_.event-dot]:fill-violet-600',
      purple:
        'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300 [&_.event-dot]:fill-purple-600',
      fuchsia:
        'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300 [&_.event-dot]:fill-fuchsia-600',
      pink: 'border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-800 dark:bg-pink-950 dark:text-pink-300 [&_.event-dot]:fill-pink-600',
      rose: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300 [&_.event-dot]:fill-rose-600',
      slate:
        'border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 [&_.event-dot]:fill-slate-600',
      gray: 'border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 [&_.event-dot]:fill-gray-600',
      zinc: 'border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 [&_.event-dot]:fill-zinc-600',
      neutral:
        'border-neutral-200 bg-neutral-50 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 [&_.event-dot]:fill-neutral-600',
      stone:
        'border-stone-200 bg-stone-50 text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 [&_.event-dot]:fill-stone-600',

      // Dot variants
      'red-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-red-600',
      'orange-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-orange-600',
      'amber-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-amber-600',
      'yellow-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-yellow-600',
      'lime-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-lime-600',
      'green-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-green-600',
      'emerald-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-emerald-600',
      'teal-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-teal-600',
      'cyan-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-cyan-600',
      'sky-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-sky-600',
      'blue-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-blue-600',
      'indigo-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-indigo-600',
      'violet-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-violet-600',
      'purple-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-purple-600',
      'fuchsia-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-fuchsia-600',
      'pink-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-pink-600',
      'rose-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-rose-600',
      'slate-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-slate-600',
      'gray-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-gray-600',
      'zinc-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-zinc-600',
      'neutral-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-neutral-600',
      'stone-dot':
        'bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-stone-600',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
})

const eventBadgeVariants = cva(
  // 'mx-1 flex size-auto h-6.5 select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
  'mx-1 flex size-auto h-[1.625rem] select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
  {
    variants: {
      multiDayPosition: {
        first:
          'relative z-10 mr-0 w-[calc(100%_-_3px)] rounded-r-none border-r-0 [&>span]:mr-2.5',
        middle:
          'relative z-10 mx-0 w-[calc(100%_+_1px)] rounded-none border-x-0',
        last: 'ml-0 rounded-l-none border-l-0',
        none: '',
      },
    },
  },
)

interface MonthEventBadgeProps
  extends Omit<
    VariantProps<typeof eventBadgeVariants>,
    'color' | 'multiDayPosition'
  > {
  event: CalendarEvent
  cellDate: Date
  eventCurrentDay?: number
  eventTotalDays?: number
  className?: string
  position?: 'first' | 'middle' | 'last' | 'none'
}

export function MonthEventBadge({
  event,
  cellDate,
  eventCurrentDay,
  eventTotalDays,
  className,
  position: propPosition,
}: MonthEventBadgeProps) {
  const itemStart = startOfDay(parseISO(event.startDate))
  const itemEnd = endOfDay(parseISO(event.endDate))

  if (cellDate < itemStart || cellDate > itemEnd) return null

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

  const color = event.color as VariantProps<
    typeof eventBadgeColorVariants
  >['color']

  const eventBadgeClasses = cn(
    eventBadgeVariants({ multiDayPosition: position, className }),
    eventBadgeColorVariants({ color }),
  )

  return (
    <div>
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
    </div>
  )
}
