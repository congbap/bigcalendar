'use client'

import MonthCalendar from "./_add/month-calendar"
import TwoWeeksCalendar from "./_add/two-weeks-calendar"

export default function CalendarDemo() {
  return (
    <div>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <div>Month View</div>
          <div>
            <MonthCalendar />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div>TwoWeeks View</div>
          <div>
            <TwoWeeksCalendar />
          </div>
        </div>
      </div>
    </div>
  )
}
