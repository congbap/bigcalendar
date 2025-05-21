'use client'

import { CalendarHeader, CalendarHeaderProps } from './components/header/calendar-header'
import { CalendarMonthView } from './components/month-view/calendar-month-view'
import { CalendarTwoWeeksView } from './components/two-weeks-view/calendar-weeks-view'
import { CalendarProvider } from './contexts/calendar-context'
import { CalendarEvent, CalendarView } from './types'

type BigCalendarProps = {
  view?: CalendarView
  events?: CalendarEvent[]
  maxVisibleEvents?: number
  hasCalendarHeader?: boolean
  calendarHeader?: CalendarHeaderProps
}

// todo: refine
export default function BigCalendar({ view = 'month', events = [], maxVisibleEvents, hasCalendarHeader = true, calendarHeader }: BigCalendarProps) {
  return (
    <CalendarProvider initialView={view} initialEvents={events} initialMaxVisibleEvents={maxVisibleEvents}>
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
    </CalendarProvider>
  )
}
