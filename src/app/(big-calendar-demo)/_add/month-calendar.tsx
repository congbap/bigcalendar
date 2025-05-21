import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'

import BigCalendar from '@/components/big-calendar'
import { CalendarEvent } from '@/components/big-calendar/types'
import { Button } from '@/components/ui/button'

import { getData } from './data'

export default function MonthCalendar() {
  const [data, setData] = useState<CalendarEvent[]>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData()
      setData(data)
    }

    fetchData()
  }, [])

  const headerRight = (
    <Button variant={'ghost'} onClick={() => {}}>
      <Menu />
    </Button>
  )

  return (
    <BigCalendar
      view='month'
      events={data}
      calendarHeader={{ headerRight: headerRight }}
      visibleEventCount={3}
    />
  )
}
