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
    rangedEvents,
    setCalendarHeader,
    isPending,
    startTransition,
  } = useCalendar()

  // example, hide random event toggle
  const toggleRandomEvent = useCallback(() => {
    const target = rangedEvents[Math.floor(Math.random() * rangedEvents.length)]
    if (target) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === target.id ? { ...event, isHide: !event.isHide } : event,
        ),
      )
    }
  }, [setEvents, rangedEvents])

  const headerRight = useMemo(
    () => (
      <div>
        <div className='space-x-2'>
          <Button
            variant={'ghost'}
            onClick={toggleRandomEvent}
            disabled={isPending}
          >
            <Menu />
          </Button>
        </div>
      </div>
    ),
    [isPending, toggleRandomEvent],
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
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  )
}
