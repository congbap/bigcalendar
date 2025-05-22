import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useCalendar } from '../../contexts/calendar-context'
import { navigateDate, rangeText } from '../../helpers'
import { CalendarView } from '../../types'

type DateNavigatorProps = {
  view: CalendarView
}

export function DateNavigator({ view }: DateNavigatorProps) {
  const { selectedDate, setSelectedDate, isPending } = useCalendar()

  const handlePrevious = () =>
    setSelectedDate(navigateDate(selectedDate, view, 'previous'))

  const handleNext = () =>
    setSelectedDate(navigateDate(selectedDate, view, 'next'))

  return (
    <div>
      <div className='space-x-2'>
        <Button variant='ghost' onClick={handlePrevious} disabled={isPending}>
          <ChevronLeft />
        </Button>

        <span>{rangeText(view, selectedDate)}</span>

        <Button variant='ghost' onClick={handleNext} disabled={isPending}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
