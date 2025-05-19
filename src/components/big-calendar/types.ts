// todo: recolor
// export type EventColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'gray'

// todo: redefine
// export type CalendarView = "day" | "week" | "month" | "year" | "agenda";
export type CalendarView = 'month' | 'twoWeeks'

export type CalendarCell = {
  day: number
  currentMonth: boolean
  date: Date
}

export type CalendarEvent = {
  id: string
  startDate: string
  endDate: string
  title: string
  color: string
}
