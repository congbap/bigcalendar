import { CalendarProvider } from '../contexts/calendar-context'
import { CalendarMonthView } from './month-view/calendar-month-view'
import { Event } from '../types'
import { CalendarHeader } from './header/calendar-header'

type CalendarMonthProps = {
  events?: Event[]
}

export default function CalendarMonth({ events }: CalendarMonthProps) {
  return (
    <CalendarProvider events={events}>
      <div className='mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4'>
        <div className='overflow-hidden rounded-xl border'>
          <CalendarHeader />
          <CalendarMonthView />
        </div>
      </div>
    </CalendarProvider>
  )
}
