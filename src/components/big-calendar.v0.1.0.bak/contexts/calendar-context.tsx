'use client'

import { addDays, isSameDay, parseISO, startOfWeek } from 'date-fns'
import { createContext, useContext, useMemo, useState } from 'react'

import { useReinitState } from '../hooks/use-reinit-state'
import { CalendarEvent, CalendarView } from '../types'

type CalendarContextProps = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  view: CalendarView
  setView: (view: CalendarView) => void
  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  filteredEvents: CalendarEvent[]
  singleDayEvents: CalendarEvent[]
  multiDayEvents: CalendarEvent[]
  visibleEventCount: number
  setVisibleEventCount: (visibleEventCount: number) => void
}

const CalendarContext = createContext({} as CalendarContextProps)

type CalendarProviderProps = {
  children: React.ReactNode
  initialView: CalendarView
  initialEvents: CalendarEvent[]
  initialVisibleEventCount: number
}

export function CalendarProvider({
  children,
  initialView,
  initialEvents,
  initialVisibleEventCount,
}: CalendarProviderProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [view, setView] = useReinitState(initialView)
  const [events, setEvents] = useReinitState(initialEvents)
  const [visibleEventCount, setVisibleEventCount] = useReinitState(
    initialVisibleEventCount,
  )

  // todo: extend
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventStartDate = parseISO(event.startDate)
      const eventEndDate = parseISO(event.endDate)

      if (view === 'month') {
        const monthStart = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1,
        )
        const monthEnd = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          0,
          23,
          59,
          59,
          999,
        )
        const isInSelectedMonth =
          eventStartDate <= monthEnd && eventEndDate >= monthStart

        return isInSelectedMonth
      } else if (view === 'twoWeeks') {
        const rangeStart = startOfWeek(selectedDate)
        rangeStart.setHours(0, 0, 0, 0)
        const rangeEnd = addDays(rangeStart, 14)
        rangeEnd.setHours(23, 59, 59, 999)
        const isInSelectedRange =
          eventStartDate <= rangeEnd && eventEndDate >= rangeStart

        return isInSelectedRange
      }
    })
  }, [selectedDate, events, view])

  const singleDayEvents = filteredEvents.filter((event) => {
    const startDate = parseISO(event.startDate)
    const endDate = parseISO(event.endDate)
    return isSameDay(startDate, endDate)
  })

  const multiDayEvents = filteredEvents.filter((event) => {
    const startDate = parseISO(event.startDate)
    const endDate = parseISO(event.endDate)
    return !isSameDay(startDate, endDate)
  })

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        view,
        setView,
        events,
        setEvents,
        filteredEvents,
        singleDayEvents,
        multiDayEvents,
        visibleEventCount,
        setVisibleEventCount,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendar(): CalendarContextProps {
  const context = useContext(CalendarContext)
  if (!context)
    throw new Error('useCalendar must be used within a CalendarProvider.')
  return context
}
