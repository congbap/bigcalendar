import { addDays } from 'date-fns'
import { CalendarEvent } from '@/components/big-calendar/types'
import BigCalendar from '@/components/big-calendar'
import { Button } from '@/components/ui/button'

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
]

export default async function Page() {
  // todo: move client
  // const headerRight = (<Button onClick={() => console.log(1)}>TwoWeeks</Button>)

  // return <BigCalendar view='month' events={events} calendarHeader={{ headerRight: headerRight}} />
  return <BigCalendar view='month' events={events} calendarHeader={{ headerRight: (<div>Right</div>)}} />
}
