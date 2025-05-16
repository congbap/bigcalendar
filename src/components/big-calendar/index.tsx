import { CalendarHeader } from './components/header/calendar-header'
import { CalendarMonthView } from './components/month-view/calendar-month-view'
import { CalendarProvider } from './contexts/calendar-context'
import { CalendarEvent, CalendarView } from './types'

type BigCalendarProps = {
  view?: CalendarView
  events?: CalendarEvent[]
  maxVisibleEvents?: number
}

export default function BigCalendar({ view, events, maxVisibleEvents }: BigCalendarProps) {
  view ??= 'month'
  events ??= []
  maxVisibleEvents ??= 3

  return (
    <CalendarProvider initialView={view} initialEvents={events} initialMaxVisibleEvents={maxVisibleEvents}>
      <div className='mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4'>
        <div className='overflow-hidden rounded-xl border'>
          <CalendarHeader />
          {
            {
              month: <CalendarMonthView />,
            }[view]
          }
        </div>
      </div>
    </CalendarProvider>
  )
}
