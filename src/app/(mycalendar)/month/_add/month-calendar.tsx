'use client'

import { addDays, format, startOfMonth, startOfWeek } from 'date-fns'
import { CalendarEvent, CalendarView, eventColors } from '@/components/big-calendar/types'
import BigCalendar from '@/components/big-calendar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'

const events: CalendarEvent[] = [
  {
    id: '0kp74e5w6jcdt',
    startDate: new Date().toISOString(),
    endDate: addDays(new Date(), 2).toISOString(),
    title: '데브인데브인데브인데브인데브인데브인데브인',
    color: 'blue',
  },
  {
    id: '0kp74e5w6jcdu',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    title: '홍길동',
    color: 'green',
  },
  {
    id: '0kp74e5w6jcdv',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    title: '김길동',
    color: 'yellow',
  },
  {
    id: '0kp74e5w6jcdw',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    title: '이길동',
    color: 'purple',
  },
  {
    id: '0kp74e5w6jcdx',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    title: '박길동',
    color: 'orange',
  },
  {
    id: '0kp74e5w6jcdy',
    startDate: addDays(new Date(), -1).toISOString(),
    endDate: addDays(new Date(), -1).toISOString(),
    title: '최길동최길동최길동최길동',
    color: 'gray',
  },
  {
    id: '0kp74e5w6jcev',
    startDate: addDays(new Date(), 7).toISOString(),
    endDate: addDays(new Date(), 7).toISOString(),
    title: '김씨네',
    color: 'yellow',
  },
  {
    id: '0kp74e5w6jddw',
    startDate: addDays(new Date(), 7).toISOString(),
    endDate: addDays(new Date(), 7).toISOString(),
    title: '이씨네',
    color: 'purple',
  },
  {
    id: '0kp74e5w7jcev',
    startDate: addDays(new Date(), -14).toISOString(),
    endDate: addDays(new Date(), -14).toISOString(),
    title: '원가네',
    color: 'red',
  },
  {
    id: '0kp74e5w9jcev',
    // startDate: new Date(2025, 4, 3).toISOString(),
    startDate: new Date(2025, 3, 30).toISOString(),
    endDate: new Date(2025, 4, 9).toISOString(),
    title: '가나다라마바사아자차카타파하0123456789',
    color: 'red',
  },
]

export const getData = (view: CalendarView = 'month', count: number = 10) => {
  const now = new Date()
  const start = {
    // month: startOfMonth(now),
    month: startOfWeek(startOfMonth(now)),
    twoWeeks: startOfWeek(now),
  }[view]
  const range = {
    month: 35,
    twoWeeks: 14,
  }[view]

  const events: CalendarEvent[] = []

  for (let i = 0; i < count; i++) {
    const startAdd = Math.floor(Math.random() * range)
    const endAdd = Math.floor(Math.random() * (range - startAdd))
    const startDate = addDays(start, startAdd)
    const endDate = addDays(startDate, endAdd)

    events.push({
      id: i.toString(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      title: `E${format(now, 'yyMM')}-${Math.floor(Math.random() * (9 - 1) + 1)
        .toString()
        .padStart(3, '0')}${Math.floor(Math.random() * 2) > 0 ? '+1' : ''}/`,
      color: eventColors[Math.floor(Math.random() * eventColors.length)],
    })
  }

  return events
}

export default function MonthCalendar() {
  const router = useRouter()

  const goTwoWeeks = () => {
    router.push('/two-weeks')
  }

  const headerRight = (
    <Button variant={'ghost'} onClick={goTwoWeeks}>
      <Menu />
    </Button>
  )

  // return <BigCalendar view='month' events={events} calendarHeader={{ headerRight: headerRight }} />
  return <BigCalendar view='month' events={getData()} calendarHeader={{ headerRight: headerRight }} />
}
