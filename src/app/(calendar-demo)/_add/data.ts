import { addDays, format, startOfMonth, startOfWeek } from 'date-fns'

import {
  CalendarEvent,
  CalendarView,
  eventColors,
} from '@/components/big-calendar/types'
// import { tsid } from '@/lib/utils'

const companys = [
  '더케이피부과학연구소',
  '(주)아모레퍼시픽',
  'K뷰티컴퍼니',
  '(주)코스메틱코리아',
  '비싸요화장품',
  '잘발려코스메틱',
  '다있소화장품',
  'ABC컴퍼니',
]

const usernames = ['김시험', '이시험', '박시험', '최시험']

const tsid = () => {
  // 1747786336653
  const now = new Date()
  return `${now.getTime()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
}

export const getData = async (
  view: CalendarView = 'month',
  count: number = 8,
  date: Date = new Date(),
) => {
  // const now = new Date()
  const now = date
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
      id: tsid(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      title:
        `E${format(now, 'yyMM')}-${Math.floor(Math.random() * (9 - 1) + 1)
          .toString()
          .padStart(3, '0')}${Math.floor(Math.random() * 2) > 0 ? '+1' : ''}` +
        `/${companys[Math.floor(Math.random() * companys.length)]}` +
        `/${usernames[Math.floor(Math.random() * usernames.length)]}` +
        `/V${Math.floor(Math.random() * 5)}`,
      color: eventColors[Math.floor(Math.random() * eventColors.length)],
    })
  }

  // todo: test
  // todo: fixing, 일정 표시 빠른 일정 순으로
  events.splice(0, events.length)

  events.push({
    id: tsid(),
    startDate: now.toISOString(),
    endDate: addDays(now, 7).toISOString(),
    title:
      `E${format(now, 'yyMM')}-${Math.floor(Math.random() * (9 - 1) + 1)
        .toString()
        .padStart(3, '0')}${Math.floor(Math.random() * 2) > 0 ? '+1' : ''}` +
      `/${companys[Math.floor(Math.random() * companys.length)]}` +
      `/${usernames[Math.floor(Math.random() * usernames.length)]}` +
      `/V${Math.floor(Math.random() * 5)}`,
    color: eventColors[Math.floor(Math.random() * eventColors.length)],
  })
  events.push({
    id: tsid(),
    startDate: now.toISOString(),
    endDate: addDays(now, 7).toISOString(),
    title:
      `E${format(now, 'yyMM')}-${Math.floor(Math.random() * (9 - 1) + 1)
        .toString()
        .padStart(3, '0')}${Math.floor(Math.random() * 2) > 0 ? '+1' : ''}` +
      `/${companys[Math.floor(Math.random() * companys.length)]}` +
      `/${usernames[Math.floor(Math.random() * usernames.length)]}` +
      `/V${Math.floor(Math.random() * 5)}`,
    color: eventColors[Math.floor(Math.random() * eventColors.length)],
  })

  events.push({
    id: tsid(),
    startDate: now.toISOString(),
    endDate: addDays(now, 10).toISOString(),
    title:
      `E${format(now, 'yyMM')}-${Math.floor(Math.random() * (9 - 1) + 1)
        .toString()
        .padStart(3, '0')}${Math.floor(Math.random() * 2) > 0 ? '+1' : ''}` +
      `/${companys[Math.floor(Math.random() * companys.length)]}` +
      `/${usernames[Math.floor(Math.random() * usernames.length)]}` +
      `/V${Math.floor(Math.random() * 5)}`,
    color: eventColors[Math.floor(Math.random() * eventColors.length)],
  })

  events.push({
    id: tsid(),
    startDate: addDays(now, -5).toISOString(),
    endDate: addDays(now, 2).toISOString(),
    title:
      `E${format(now, 'yyMM')}-${Math.floor(Math.random() * (9 - 1) + 1)
        .toString()
        .padStart(3, '0')}${Math.floor(Math.random() * 2) > 0 ? '+1' : ''}` +
      `/${companys[Math.floor(Math.random() * companys.length)]}` +
      `/${usernames[Math.floor(Math.random() * usernames.length)]}` +
      `/V${Math.floor(Math.random() * 5)}`,
    color: eventColors[Math.floor(Math.random() * eventColors.length)],
  })

  for (let i = 0; i < 6; i++) {
    events.push({
      id: tsid(),
      startDate: addDays(now, -14).toISOString(),
      endDate: addDays(now, -14).toISOString(),
      title:
        `E${format(now, 'yyMM')}-${Math.floor(Math.random() * (9 - 1) + 1)
          .toString()
          .padStart(3, '0')}${Math.floor(Math.random() * 2) > 0 ? '+1' : ''}` +
        `/${companys[Math.floor(Math.random() * companys.length)]}` +
        `/${usernames[Math.floor(Math.random() * usernames.length)]}` +
        `/V${Math.floor(Math.random() * 5)}`,
      color: eventColors[Math.floor(Math.random() * eventColors.length)],
    })
  }

  events.push({
    id: tsid(),
    startDate: addDays(now, 7).toISOString(),
    endDate: addDays(now, 7).toISOString(),
    title:
      `E${format(now, 'yyMM')}-${Math.floor(Math.random() * (9 - 1) + 1)
        .toString()
        .padStart(3, '0')}${Math.floor(Math.random() * 2) > 0 ? '+1' : ''}` +
      `/${companys[Math.floor(Math.random() * companys.length)]}` +
      `/${usernames[Math.floor(Math.random() * usernames.length)]}` +
      `/V${Math.floor(Math.random() * 5)}`,
    color: eventColors[Math.floor(Math.random() * eventColors.length)],
  })

  return events
}
