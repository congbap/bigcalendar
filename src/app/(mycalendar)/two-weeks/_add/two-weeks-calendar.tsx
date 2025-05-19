'use client'

import { addDays } from 'date-fns'
import { CalendarEvent, eventColors } from '@/components/big-calendar/types'
import BigCalendar from '@/components/big-calendar'
import { useEffect, useState } from 'react'

// const events: CalendarEvent[] = [
//   // {
//   //   id: '0kp74e5w6jcdt',
//   //   startDate: new Date().toISOString(),
//   //   endDate: addDays(new Date(), 2).toISOString(),
//   //   title: '데브인데브인데브인데브인데브인데브인데브인',

//   //   color: 'blue',
//   // },
//   // {
//   //   id: '0kp74e5w6jcdu',
//   //   startDate: new Date().toISOString(),
//   //   endDate: new Date().toISOString(),
//   //   title: '홍길동',

//   //   color: 'green',
//   // },
//   // {
//   //   id: '0kp74e5w6jcdv',
//   //   startDate: new Date().toISOString(),
//   //   endDate: new Date().toISOString(),
//   //   title: '김길동',

//   //   color: 'yellow',
//   // },
//   // {
//   //   id: '0kp74e5w6jcdw',
//   //   startDate: new Date().toISOString(),
//   //   endDate: new Date().toISOString(),
//   //   title: '이길동',

//   //   color: 'purple',
//   // },
//   // {
//   //   id: '0kp74e5w6jcdx',
//   //   startDate: new Date().toISOString(),
//   //   endDate: new Date().toISOString(),
//   //   title: '박길동',

//   //   color: 'orange',
//   // },
//   // {
//   //   id: '0kp74e5w6jcdy',
//   //   startDate: addDays(new Date(), -1).toISOString(),
//   //   endDate: addDays(new Date(), -1).toISOString(),
//   //   title: '최길동최길동최길동최길동',

//   //   color: 'gray',
//   // },
//   // {
//   //   id: '0kp74e5w6jcev',
//   //   startDate: addDays(new Date(), 7).toISOString(),
//   //   endDate: addDays(new Date(), 7).toISOString(),
//   //   title: '김씨네',

//   //   color: 'yellow',
//   // },
//   // {
//   //   id: '0kp74e5w6jddw',
//   //   startDate: addDays(new Date(), 7).toISOString(),
//   //   endDate: addDays(new Date(), 7).toISOString(),
//   //   title: '이씨네',

//   //   color: 'purple',
//   // },
//   // {
//   //   id: '0kp74e5w7jcev',
//   //   startDate: addDays(new Date(), -14).toISOString(),
//   //   endDate: addDays(new Date(), -14).toISOString(),
//   //   title: '원가네',

//   //   color: 'red',
//   // },
//   {
//     id: '0kp74e5w8jcev',

//     startDate: new Date(2025, 4, 23).toISOString(),
//     endDate: new Date(2025, 4, 26).toISOString(),
//     // title: '가나다라마바사아자차카타파하0123456789',
//     title: 'E2402-001+2/K뷰티 컴퍼니/김시험,이시험/V2',

//     // color: 'red',

//     // backgroundColor: getRandomContrastingColor('#000000')
//     color: '#2b7fff'
//   },
// ]

const getEvents = () => {
  return [
    {
      id: '0kp74e5w6jcdt',
      startDate: new Date().toISOString(),
      endDate: addDays(new Date(), 2).toISOString(),
      title: '데브인데브인데브인데브인데브인데브인데브인',
      color: 'red',
    },
    // {
    //   id: '0kp74e5w6jcdu',
    //   startDate: new Date().toISOString(),
    //   endDate: new Date().toISOString(),
    //   title: '홍길동',

    //   color: 'green',
    // },
    // {
    //   id: '0kp74e5w6jcdv',
    //   startDate: new Date().toISOString(),
    //   endDate: new Date().toISOString(),
    //   title: '김길동',

    //   color: 'yellow',
    // },
    // {
    //   id: '0kp74e5w6jcdw',
    //   startDate: new Date().toISOString(),
    //   endDate: new Date().toISOString(),
    //   title: '이길동',

    //   color: 'purple',
    // },
    // {
    //   id: '0kp74e5w6jcdx',
    //   startDate: new Date().toISOString(),
    //   endDate: new Date().toISOString(),
    //   title: '박길동',

    //   color: 'orange',
    // },
    // {
    //   id: '0kp74e5w6jcdy',
    //   startDate: addDays(new Date(), -1).toISOString(),
    //   endDate: addDays(new Date(), -1).toISOString(),
    //   title: '최길동최길동최길동최길동',

    //   color: 'gray',
    // },
    // {
    //   id: '0kp74e5w6jcev',
    //   startDate: addDays(new Date(), 7).toISOString(),
    //   endDate: addDays(new Date(), 7).toISOString(),
    //   title: '김씨네',

    //   color: 'yellow',
    // },
    // {
    //   id: '0kp74e5w6jddw',
    //   startDate: addDays(new Date(), 7).toISOString(),
    //   endDate: addDays(new Date(), 7).toISOString(),
    //   title: '이씨네',

    //   color: 'purple',
    // },
    // {
    //   id: '0kp74e5w7jcev',
    //   startDate: addDays(new Date(), -14).toISOString(),
    //   endDate: addDays(new Date(), -14).toISOString(),
    //   title: '원가네',
    //   color: '#6b7280',
    // },
    // {
    //   id: '0kp74e5w8jcev',
    //   startDate: new Date(2025, 4, 23).toISOString(),
    //   endDate: new Date(2025, 4, 26).toISOString(),
    //   // title: '가나다라마바사아자차카타파하0123456789',
    //   title: 'E2402-001+2/K뷰티 컴퍼니/김시험,이시험/V2',
    //   // color: '#2b7fff',
    //   color: 'blue',
    // },
    // {
    //   id: '0kp74e5w8jcev',
    //   startDate: new Date(2025, 4, 30).toISOString(),
    //   endDate: new Date(2025, 5, 2).toISOString(),
    //   // title: '가나다라마바사아자차카타파하0123456789',
    //   title: 'E2405-001+2/더케이컴퍼니/박시험/V1',
    //   // color: 'blue',
    //   color: eventColors[Math.floor(Math.random() * eventColors.length)],
    // },
  ] as CalendarEvent[]
}

export default function TwoWeeksCalendar() {
  const [result, setResult] = useState<CalendarEvent[]>()

  useEffect(() => {
    const newEvents = [...getEvents()]
    setResult(newEvents)
  }, [])

  // return <BigCalendar view='twoWeeks' events={events} maxVisibleEvents={1} calendarHeader={null} />
  // return <BigCalendar view='twoWeeks' events={getEvents()} maxVisibleEvents={1} hasCalendarHeader={false} />
  return <BigCalendar view='twoWeeks' events={result} maxVisibleEvents={1} hasCalendarHeader={false} />
}
