'use client'

import { useCalendar } from '../../contexts/calendar-context'
import { DateNavigator } from './date-navigator'

type CalendarHeaderProps = {
  headerLeft?: React.ReactNode
  headerCenter?: React.ReactNode
  headerRight?: React.ReactNode
}

export function CalendarHeader({ headerLeft, headerCenter, headerRight }: CalendarHeaderProps) {
  // todo:
  const { view, events } = useCalendar()

  return (
    <div className='border-b p-4'>
      <div className='flex'>
        <div className='flex-none'>{headerLeft}</div>
        {/* <div className='grow text-center'>{headerCenter}</div> */}
        <div className='grow text-center'>
          <DateNavigator view={view} events={events} />
        </div>
        <div className='flex-none'>{headerRight}</div>
      </div>
    </div>
  )
}
