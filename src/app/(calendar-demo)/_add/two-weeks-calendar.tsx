'use client'

import { useCallback, useEffect } from 'react'

import { getData } from './data'
import {
  CalendarProvider,
  CalendarRender,
  useCalendar,
} from '@/components/calendar'

function Calendar() {
  const { selectedDate, view, setEvents, setCelendarHeader, startTransition } =
    useCalendar()

  const navigate = useCallback(async (date: Date) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const data = await getData(view, 5, date)
      setEvents(data)
    })
  }, [])

  useEffect(() => {
    navigate(selectedDate)
  }, [selectedDate])

  return <CalendarRender />
}

export default function TwoWeeksCalendar() {
  return (
    <CalendarProvider
      initialView='twoWeeks'
      initialVisibleEventCount={3}
      initialHasCalendarHeader={false}
    >
      <Calendar />
    </CalendarProvider>
  )
}
