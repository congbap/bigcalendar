import { useEffect, useState } from 'react'

import BigCalendar from '@/components/big-calendar'
import { CalendarEvent } from '@/components/big-calendar/types'

import { getData } from './data'

export default function TwoWeeksCalendar() {
  const [data, setData] = useState<CalendarEvent[]>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('twoWeeks', 4)
      setData(data)
    }

    fetchData()
  }, [])

  return (
    <BigCalendar
      view='twoWeeks'
      events={data}
      // maxVisibleEvents={1}
      visibleEventCount={3}
      hasCalendarHeader={false}
    />
  )
}
