'use client'

import { useCallback, useEffect } from 'react'

import {
  CalendarProvider,
  CalendarRender,
  useCalendar,
} from '@/components/calendar'

import { getData } from './data'

function Calendar() {
  const { selectedDate, view, setEvents, startTransition } = useCalendar()

  const navigate = useCallback(
    async (date: Date) => {
      startTransition(async () => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const data = await getData(view, 5, date)
        setEvents(data)
      })
    },
    [view, setEvents, startTransition],
  )

  useEffect(() => {
    navigate(selectedDate)
  }, [selectedDate, navigate])

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
