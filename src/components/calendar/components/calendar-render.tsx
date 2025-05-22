'use client'

import { useCalendar } from '../contexts/calendar-context'
import { CalendarHeader } from './header/calendar-header'
import { CalendarMonthView } from './month-view/calendar-month-view'
import { CalendarTwoWeeksView } from './two-weeks-view/calendar-weeks-view'

export function CalendarRender() {
  const { view, hasCalendarHeader, calendarHeader } = useCalendar()

  return (
    <div className='mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4'>
      <div className='overflow-hidden rounded-xl border'>
        {hasCalendarHeader && <CalendarHeader {...calendarHeader} />}
        {
          {
            month: <CalendarMonthView />,
            twoWeeks: <CalendarTwoWeeksView />,
          }[view]
        }
      </div>
    </div>
  )
}
