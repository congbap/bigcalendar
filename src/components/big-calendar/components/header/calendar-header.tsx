'use client'

import { useCalendar } from '../../contexts/calendar-context'
import { DateNavigator } from './date-navigator'

export type CalendarHeaderProps = {
  headerLeft?: React.ReactNode
  headerCenter?: React.ReactNode
  headerRight?: React.ReactNode
}

// todo: refine
export function CalendarHeader({ headerLeft, headerCenter, headerRight }: CalendarHeaderProps) {
  const { view, events } = useCalendar()

  headerCenter ??= <DateNavigator view={view} events={events} />

  return (
    <div className='border-b p-4'>
      <div className='flex items-center'>
        <div className='flex-none'>{headerLeft}</div>
        <div className='grow text-center'>{headerCenter}</div>
        <div className='flex-none'>{headerRight}</div>
      </div>
    </div>
  )
}
