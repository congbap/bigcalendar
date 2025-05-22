import {
  addDays,
  addMonths,
  addWeeks,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns'

import { CalendarCell, CalendarEvent, CalendarView } from './types'

// ================ Header helper functions ================ //

// todo: extend
export function rangeText(view: CalendarView, date: Date) {
  switch (view) {
    case 'month':
      return `${format(date, 'MMM, yyyy')}`
    case 'twoWeeks':
      return `${format(date, 'MMM, yyyy')}`
    default:
      return 'Error while formatting '
  }
}

// todo: extend
export function navigateDate(
  date: Date,
  view: CalendarView,
  direction: 'previous' | 'next',
): Date {
  const operations = {
    month:
      direction === 'next'
        ? addMonths.bind(null, date, 1)
        : subMonths.bind(null, date, 1),
    twoWeeks:
      direction === 'next'
        ? addWeeks.bind(null, date, 2)
        : subWeeks.bind(null, date, 2),
  }

  return operations[view]()
}

// ================ TwoWeeks view helper functions ================ //

export function getTwoWeeksCells(selectedDate: Date): CalendarCell[] {
  const currentMonth = selectedDate.getMonth()

  const startDate = startOfWeek(selectedDate)

  return Array.from({ length: 14 }, (_, i) => {
    const date = addDays(startDate, i)

    return {
      day: date.getDate(),
      currentMonth: date.getMonth() === currentMonth,
      date: date,
    }
  })
}

// ================ Month view helper functions ================ //

export function getCalendarCells(selectedDate: Date): CalendarCell[] {
  const currentYear = selectedDate.getFullYear()
  const currentMonth = selectedDate.getMonth()

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay()

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1)
  const totalDays = firstDayOfMonth + daysInMonth

  const prevMonthCells = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    currentMonth: false,
    date: new Date(
      currentYear,
      currentMonth - 1,
      daysInPrevMonth - firstDayOfMonth + i + 1,
    ),
  }))

  const currentMonthCells = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
    date: new Date(currentYear, currentMonth, i + 1),
  }))

  const nextMonthCells = Array.from(
    { length: (7 - (totalDays % 7)) % 7 },
    (_, i) => ({
      day: i + 1,
      currentMonth: false,
      date: new Date(currentYear, currentMonth + 1, i + 1),
    }),
  )

  return [...prevMonthCells, ...currentMonthCells, ...nextMonthCells]
}

export function calculateMonthEventPositions(
  multiDayEvents: CalendarEvent[],
  singleDayEvents: CalendarEvent[],
  selectedDate: Date,
  visibleEventCount: number,
) {
  // todo: watching, month, 월에서 캘린더 범위로 수정, 월 범위 외 더 보기로 만 표시, 이벤트로 표시되도록 수정
  const monthStart = startOfWeek(startOfMonth(selectedDate))
  const monthEnd = endOfWeek(endOfMonth(selectedDate))
  // const monthStart = startOfMonth(selectedDate)
  // const monthEnd = endOfMonth(selectedDate)

  const eventPositions: { [key: string]: number } = {}
  const occupiedPositions: { [key: string]: boolean[] } = {}

  eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach((day) => {
    occupiedPositions[day.toISOString()] = Array.from(
      { length: visibleEventCount },
      () => false,
    )
  })

  const sortedEvents = [
    ...multiDayEvents.sort((a, b) => {
      const aDuration = differenceInDays(
        parseISO(a.endDate),
        parseISO(a.startDate),
      )
      const bDuration = differenceInDays(
        parseISO(b.endDate),
        parseISO(b.startDate),
      )
      return (
        bDuration - aDuration ||
        parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()
      )
    }),
    ...singleDayEvents.sort(
      (a, b) =>
        parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime(),
    ),
  ]

  sortedEvents.forEach((event) => {
    const eventStart = parseISO(event.startDate)
    const eventEnd = parseISO(event.endDate)
    const eventDays = eachDayOfInterval({
      start: eventStart < monthStart ? monthStart : eventStart,
      end: eventEnd > monthEnd ? monthEnd : eventEnd,
    })

    let position = -1

    for (let i = 0; i < visibleEventCount; i++) {
      if (
        eventDays.every((day) => {
          const dayPositions = occupiedPositions[startOfDay(day).toISOString()]
          return dayPositions && !dayPositions[i]
        })
      ) {
        position = i
        break
      }
    }

    if (position !== -1) {
      eventDays.forEach((day) => {
        const dayKey = startOfDay(day).toISOString()
        occupiedPositions[dayKey][position] = true
      })
      eventPositions[event.id] = position
    }
  })

  return eventPositions
}

export function getMonthCellEvents(
  date: Date,
  events: CalendarEvent[],
  eventPositions: Record<string, number>,
) {
  const eventsForDate = events.filter((event) => {
    const eventStart = parseISO(event.startDate)
    const eventEnd = parseISO(event.endDate)
    return (
      (date >= eventStart && date <= eventEnd) ||
      isSameDay(date, eventStart) ||
      isSameDay(date, eventEnd)
    )
  })

  return eventsForDate
    .map((event) => ({
      ...event,
      position: eventPositions[event.id] ?? -1,
      isMultiDay: event.startDate !== event.endDate,
    }))
    .sort((a, b) => {
      if (a.isMultiDay && !b.isMultiDay) return -1
      if (!a.isMultiDay && b.isMultiDay) return 1
      return a.position - b.position
    })
}
