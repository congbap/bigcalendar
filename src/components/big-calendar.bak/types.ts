// todo: recolor
// export type EventColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'gray'
// todo: extend, color
// https://tailwindcss.com/docs/colors
// export type EventColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray'
export const eventColors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
] as const

export type EventColor = (typeof eventColors)[number]

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
  // color: string
  color: EventColor
}
