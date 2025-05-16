import { CalendarMonthView } from '@/components/calendar/components/month-view/calendar-month-view'
import { CalendarProvider } from '@/components/calendar/contexts/calendar-context'

export default async function Page() {
  return (
    <CalendarProvider>
      <div className='overflow-hidden rounded-xl border'>
        <CalendarMonthView />
      </div>
    </CalendarProvider>
  )
}
