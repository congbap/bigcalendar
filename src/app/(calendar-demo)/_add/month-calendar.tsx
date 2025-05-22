'use client'

import { Menu } from 'lucide-react'
import { useCallback, useEffect } from 'react'

import { Button } from '@/components/ui/button'

import { getData } from './data'
import {
  CalendarProvider,
  CalendarRender,
  useCalendar,
} from '@/components/calendar'

function Calendar() {
  const {
    selectedDate,
    view,
    events,
    setEvents,
    setCelendarHeader,
    isPending,
    startTransition,
  } = useCalendar()

  useEffect(() => {
    setCelendarHeader({
      headerRight: (
        <Button
          variant={'ghost'}
          onClick={() => {
            navigate(selectedDate)
          }}
          disabled={isPending}
        >
          <Menu />
        </Button>
      ),
    })
  }, [selectedDate, isPending])

  const navigate = useCallback(async (date: Date) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const data = await getData(view, 10, date)
      setEvents(data)
    })
  }, [])

  useEffect(() => {
    navigate(selectedDate)
  }, [selectedDate])

  return <CalendarRender />
}

export default function MonthCalendar() {
  return (
    <CalendarProvider initialVisibleEventCount={3}>
      <Calendar />
    </CalendarProvider>
  )
}
