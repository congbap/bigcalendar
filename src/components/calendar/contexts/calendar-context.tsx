'use client'

import { addDays, isSameDay, parseISO, startOfWeek } from 'date-fns'
import {
  createContext,
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'

import { useReinitState } from '../hooks/use-reinit-state'
import { CalendarEvent, CalendarView } from '../types'
import { maxVisibleEvent } from '../constants'
import { CalendarHeaderProps } from '../components/header/calendar-header'

type CalendarContextProps = {
  selectedDate: Date
  // setSelectedDate: (date: Date) => void
  setSelectedDate: Dispatch<SetStateAction<Date>>
  // setSelectedDate: (date: Date) => Promise<void>
  view: CalendarView
  // setView: (view: CalendarView) => void
  setView: Dispatch<SetStateAction<CalendarView>>
  events: CalendarEvent[]
  // setEvents: (events: CalendarEvent[]) => void
  setEvents: Dispatch<SetStateAction<CalendarEvent[]>>
  filteredEvents: CalendarEvent[]
  singleDayEvents: CalendarEvent[]
  multiDayEvents: CalendarEvent[]
  visibleEventCount: number
  // setVisibleEventCount: (visibleEventCount: number) => void
  setVisibleEventCount: Dispatch<SetStateAction<number>>
  hasCalendarHeader: boolean
  // setHasCalendarHeader: (hasCalendarHeader: boolean) => void
  setHasCalendarHeader: Dispatch<SetStateAction<boolean>>
  calendarHeader: CalendarHeaderProps
  // setCelendarHeader: (calendarHeader: CalendarHeaderProps) => void
  setCelendarHeader: Dispatch<SetStateAction<CalendarHeaderProps>>
  onNavigate: (date: Date) => Promise<void>
  // setOnNavigate: (onNavigate: (date: Date) => Promise<void>) => void
  setOnNavigate: Dispatch<SetStateAction<(date: Date) => Promise<void>>>
  // onNavigate?: (date: Date, view: CalendarView) => Promise<void>
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
  // // onNavigate?: (date: Date) => void
  // // onNavigate?: ({ date, view }: { date: Date; view: CalendarView }) => void
  // // onNavigate?: (date: Date, view: CalendarView) => void
  // onNavigate?: (date: Date, view: CalendarView) => Promise<void>
}

export function CalendarProvider({
  children,
  initialSelectedDate = new Date(),
  initialView = 'month',
  initialEvents = [],
  initialVisibleEventCount = maxVisibleEvent,
  initialHasCalendarHeader = true,
  initialCalendarHeader = {},
  // onNavigate,
}: CalendarProviderProps) {
  // const [selectedDate, setSelectedDate] = useState(new Date())
  // const [selectedDate, setSelectedDate] = useReinitState(initialSelectedDate)

  // const handleSelectedDate = async (date: Date) => {
  //   setSelectedDate(date)
  //   await onNavigate?.call(null, date, view)
  // }

  // const [view, setView] = useReinitState(initialView)
  // const [events, setEvents] = useReinitState(initialEvents)
  // const [visibleEventCount, setVisibleEventCount] = useReinitState(
  //   initialVisibleEventCount,
  // )

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
  const [onNavigate, setOnNavigate] = useState(() => async (date: Date) => {})

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      await onNavigate(selectedDate)
    })
  }, [selectedDate])

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
        // setSelectedDate: handleSelectedDate,
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
        onNavigate,
        setOnNavigate,
        // onNavigate,

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
