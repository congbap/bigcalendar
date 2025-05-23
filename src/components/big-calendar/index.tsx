'use client'

import {
  CalendarHeader,
  CalendarHeaderProps,
} from './components/header/calendar-header'
import { CalendarMonthView } from './components/month-view/calendar-month-view'
import { CalendarTwoWeeksView } from './components/two-weeks-view/calendar-weeks-view'
import { maxVisibleEvent } from './constants'
import { CalendarProvider } from './contexts/calendar-context'
import { CalendarEvent, CalendarView } from './types'

type BigCalendarProps = {
  selectedDate: Date
  view: CalendarView
  events: CalendarEvent[]
  visibleEventCount?: number
  hasCalendarHeader?: boolean
  calendarHeader?: CalendarHeaderProps
  onNavigate?: (date: Date, view: CalendarView) => Promise<void>
}

export default function BigCalendar({
  selectedDate,
  view,
  events,
  visibleEventCount = maxVisibleEvent,
  hasCalendarHeader = true,
  calendarHeader,
  onNavigate,
}: BigCalendarProps) {
  return (
    <CalendarProvider
      initialSelectedDate={selectedDate}
      initialView={view}
      initialEvents={events}
      initialVisibleEventCount={visibleEventCount}
      onNavigate={onNavigate}
    >
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
