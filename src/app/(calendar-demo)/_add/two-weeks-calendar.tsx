import { useCallback, useEffect, useState } from 'react'

import BigCalendar from '@/components/big-calendar'
import { CalendarEvent, CalendarView } from '@/components/big-calendar/types'

import { getData } from './data'

export default function TwoWeeksCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view] = useState<CalendarView>('twoWeeks')
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const onNavigate = useCallback(async (date: Date, view: CalendarView) => {
    const data = await getData(view, 5, date)
    setSelectedDate(date)
    setEvents(data)
  }, [])

  useEffect(() => {
    onNavigate(selectedDate, view)
  }, [onNavigate, selectedDate, view])

  return (
    <BigCalendar
      selectedDate={selectedDate}
      view={view}
      events={events}
      visibleEventCount={3}
      hasCalendarHeader={false}
      onNavigate={onNavigate}
    />
  )
}
