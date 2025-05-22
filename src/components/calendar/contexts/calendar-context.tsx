'use client'

import { addDays, isSameDay, parseISO, startOfWeek } from 'date-fns'
import {
  createContext,
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useContext,
  useMemo,
  useState,
  useTransition,
} from 'react'

import { CalendarEvent, CalendarView } from '../types'
import { maxVisibleEvent } from '../constants'
import { CalendarHeaderProps } from '../components/header/calendar-header'

type CalendarContextProps = {
  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
  view: CalendarView
  setView: Dispatch<SetStateAction<CalendarView>>
  events: CalendarEvent[]
  setEvents: Dispatch<SetStateAction<CalendarEvent[]>>
  filteredEvents: CalendarEvent[]
  singleDayEvents: CalendarEvent[]
  multiDayEvents: CalendarEvent[]
  visibleEventCount: number
  setVisibleEventCount: Dispatch<SetStateAction<number>>
  hasCalendarHeader: boolean
  setHasCalendarHeader: Dispatch<SetStateAction<boolean>>
  calendarHeader: CalendarHeaderProps
  setCelendarHeader: Dispatch<SetStateAction<CalendarHeaderProps>>
  isPending: boolean
  startTransition: TransitionStartFunction
}

const CalendarContext = createContext({} as CalendarContextProps)

export type CalendarProviderProps = {
  children: React.ReactNode
  initialSelectedDate?: Date
  initialView?: CalendarView
  initialEvents?: CalendarEvent[]
  initialVisibleEventCount?: number
  initialHasCalendarHeader?: boolean
  initialCalendarHeader?: CalendarHeaderProps
}

export function CalendarProvider({
  children,
  initialSelectedDate = new Date(),
  initialView = 'month',
  initialEvents = [],
  initialVisibleEventCount = maxVisibleEvent,
  initialHasCalendarHeader = true,
  initialCalendarHeader = {},
}: CalendarProviderProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialSelectedDate)
  const [view, setView] = useState<CalendarView>(initialView)
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [visibleEventCount, setVisibleEventCount] = useState<number>(
    initialVisibleEventCount,
  )
  const [hasCalendarHeader, setHasCalendarHeader] = useState<boolean>(
    initialHasCalendarHeader,
  )
  const [calendarHeader, setCelendarHeader] = useState<CalendarHeaderProps>(
    initialCalendarHeader,
  )
  const [isPending, startTransition] = useTransition()

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
        hasCalendarHeader,
        setHasCalendarHeader,
        calendarHeader,
        setCelendarHeader,
        isPending,
        startTransition,
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
