'use client'

import { addDays, isSameDay, parseISO, startOfWeek } from 'date-fns'
import { createContext, useContext, useMemo } from 'react'

import { useReinitState } from '../hooks/use-reinit-state'
import { CalendarEvent, CalendarView } from '../types'

type CalendarContextProps = {
  selectedDate: Date
  // setSelectedDate: (date: Date) => void
  setSelectedDate: (date: Date) => Promise<void>
  view: CalendarView
  setView: (view: CalendarView) => void
  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  filteredEvents: CalendarEvent[]
  singleDayEvents: CalendarEvent[]
  multiDayEvents: CalendarEvent[]
  visibleEventCount: number
  setVisibleEventCount: (visibleEventCount: number) => void
  onNavigate?: (date: Date, view: CalendarView) => Promise<void>
}

const CalendarContext = createContext({} as CalendarContextProps)

export type CalendarProviderProps = {
  children?: React.ReactNode
  initialSelectedDate: Date
  initialView: CalendarView
  initialEvents: CalendarEvent[]
  initialVisibleEventCount: number
  // onNavigate?: (date: Date) => void
  // onNavigate?: ({ date, view }: { date: Date; view: CalendarView }) => void
  // onNavigate?: (date: Date, view: CalendarView) => void
  onNavigate?: (date: Date, view: CalendarView) => Promise<void>
}

export function CalendarProvider({
  children,
  initialSelectedDate,
  initialView,
  initialEvents,
  initialVisibleEventCount,
  onNavigate,
}: CalendarProviderProps) {
  // const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useReinitState(initialSelectedDate)

  const handleSelectedDate = async (date: Date) => {
    setSelectedDate(date)
    await onNavigate?.call(null, date, view)
  }

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
        // setSelectedDate,
        setSelectedDate: handleSelectedDate,
        view,
        setView,
        events,
        setEvents,
        filteredEvents,
        singleDayEvents,
        multiDayEvents,
        visibleEventCount,
        setVisibleEventCount,
        onNavigate,
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
