'use client'

import { createContext, useContext, useState } from 'react'
import { CalendarView, Event } from '../types'

type CalendarContextProps = {
  selectedDate: Date
  setSelectedDate: (date: Date | undefined) => void
  events?: Event[]
}

const CalendarContext = createContext({} as CalendarContextProps)

type CalendarProviderProps = {
  children: React.ReactNode
  view?: CalendarView
  events?: Event[]
}

export function CalendarProvider({ children, events }: CalendarProviderProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
  }

  return (
    <CalendarContext.Provider
      value={{
        selectedDate: selectedDate,
        setSelectedDate: handleSelectDate,
        events: events,
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
