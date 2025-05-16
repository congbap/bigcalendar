'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { CalendarView, CalendarEvent } from '../types'
import { isSameDay, parseISO } from 'date-fns'

type CalendarContextProps = {
  selectedDate: Date
  // setSelectedDate: (date: Date | undefined) => void
  setSelectedDate: (date: Date) => void
  view: CalendarView
  setView: (view: CalendarView) => void
  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  filteredEvents: CalendarEvent[]
  singleDayEvents: CalendarEvent[]
  multiDayEvents: CalendarEvent[]
  maxVisibleEvents?: number
}

const CalendarContext = createContext({} as CalendarContextProps)

type CalendarProviderProps = {
  children: React.ReactNode
  initialView: CalendarView
  initialEvents: CalendarEvent[]
  initialMaxVisibleEvents?: number
}

export function CalendarProvider({ children, initialView, initialEvents, initialMaxVisibleEvents }: CalendarProviderProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // todo:
  const [view, setView] = useState(initialView)
  const [events, setEvents] = useState(initialEvents)
  const [maxVisibleEvents] = useState(initialMaxVisibleEvents)

  // todo: extend
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventStartDate = parseISO(event.startDate)
      const eventEndDate = parseISO(event.endDate)

      if (view === 'month') {
        const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
        const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59, 999)
        const isInSelectedMonth = eventStartDate <= monthEnd && eventEndDate >= monthStart
        return isInSelectedMonth
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

  // const handleSelectDate = (date: Date | undefined) => {
  //   if (!date) return
  //   setSelectedDate(date)
  // }

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        // setSelectedDate: handleSelectDate,
        setSelectedDate,
        view,
        setView,
        events,
        setEvents,
        filteredEvents,
        singleDayEvents,
        multiDayEvents,
        maxVisibleEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendar(): CalendarContextProps {
  const context = useContext(CalendarContext)
  if (!context) throw new Error('useCalendar must be used within a CalendarProvider.')
  return context
}
