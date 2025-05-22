'use client'

import { Menu } from 'lucide-react'
import { useCallback, useEffect, useMemo } from 'react'

import {
  CalendarProvider,
  CalendarRender,
  useCalendar,
} from '@/components/calendar'
import { Button } from '@/components/ui/button'

import { getData } from './data'

function Calendar() {
  const {
    selectedDate,
    view,
    setEvents,
    setCalendarHeader,
    isPending,
    startTransition,
  } = useCalendar()

  const headerRight = useMemo(
    () => (
      <Button variant={'ghost'} onClick={() => {}} disabled={isPending}>
        <Menu />
      </Button>
    ),
    [isPending],
  )

  useEffect(() => {
    setCalendarHeader({
      headerRight: headerRight,
    })
  }, [setCalendarHeader, headerRight])

  const navigate = useCallback(
    async (date: Date) => {
      startTransition(async () => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const data = await getData(view, 10, date)
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

export default function MonthCalendar() {
  return (
    <CalendarProvider initialVisibleEventCount={3}>
      <Calendar />
    </CalendarProvider>
  )
}
