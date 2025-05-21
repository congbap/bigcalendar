import { Menu } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import BigCalendar from '@/components/big-calendar'
import { CalendarEvent, CalendarView } from '@/components/big-calendar/types'
import { Button } from '@/components/ui/button'

import { getData } from './data'

export default function MonthCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view] = useState<CalendarView>('month')
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const onNavigate = useCallback(async (date: Date, view: CalendarView) => {
    const data = await getData(view, 10, date)
    setSelectedDate(date)
    setEvents(data)
  }, [])

  useEffect(() => {
    onNavigate(selectedDate, view)
  }, [onNavigate, selectedDate, view])

  const headerRight = (
    <Button variant={'ghost'} onClick={() => {}}>
      <Menu />
    </Button>
  )

  return (
    <BigCalendar
      selectedDate={selectedDate}
      view={view}
      events={events}
      calendarHeader={{ headerRight: headerRight }}
      visibleEventCount={3}
      onNavigate={onNavigate}
    />
  )
}
