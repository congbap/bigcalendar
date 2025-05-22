import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'

import { useCalendar } from '../../contexts/calendar-context'
import { navigateDate, rangeText } from '../../helpers'
import { CalendarView } from '../../types'

type DateNavigatorProps = {
  view: CalendarView
}

export function DateNavigator({ view }: DateNavigatorProps) {
  // const { selectedDate, setSelectedDate } = useCalendar()

  // const { selectedDate, setSelectedDate, onNavigate } = useCalendar()
  // const [loading, startTransition] = useTransition()

  const { selectedDate, setSelectedDate, isPending } = useCalendar()

  const handlePrevious = () =>
    setSelectedDate(navigateDate(selectedDate, view, 'previous'))

  const handleNext = () =>
    setSelectedDate(navigateDate(selectedDate, view, 'next'))

  // const handlePrevious = () => {
  //   startTransition(async () => {
  //     await setSelectedDate(navigateDate(selectedDate, view, 'previous'))
  //   })
  // }

  // const handleNext = () => {
  //   startTransition(async () => {
  //     await setSelectedDate(navigateDate(selectedDate, view, 'next'))
  //   })
  // }

  // const handlePrevious = () => {
  //   startTransition(async () => {
  //     const date = navigateDate(selectedDate, view, 'previous')
  //     setSelectedDate(date)
  //     await onNavigate?.call(null, date, view)
  //   })
  // }

  // const handleNext = () => {
  //   startTransition(async () => {
  //     const date = navigateDate(selectedDate, view, 'next')
  //     setSelectedDate(date)
  //     await onNavigate?.call(null, date, view)
  //   })
  // }

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
