'use client'

import { Menu } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import { getData } from './data'
import {
  CalendarProvider,
  CalendarRender,
  useCalendar,
} from '@/components/calendar'

function Calendar() {
  const {
    selectedDate,
    view,
    setEvents,
    setCelendarHeader,
    setOnNavigate,
    startTransition,
  } = useCalendar()

  const navigate = useCallback(async (date: Date) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    const data = await getData(view, 10, date)
    setEvents(data)
  }, [])

  useEffect(() => {
    setCelendarHeader({
      headerRight: (
        <Button variant={'ghost'} onClick={() => {}}>
          <Menu />
        </Button>
      ),
    })

    // setOnNavigate(() => async (date: Date) => {
    //   console.log('1')
    // })
    // setOnNavigate(() => navigate)

    // navigate(selectedDate)
    // startTransition(async () => {
    //   await navigate(selectedDate)
    // })

    // async function fetchData() {
    //   const data = await getData(view, 10, selectedDate)
    //   setEvents(data)
    // }

    // fetchData()
  }, [])

  useEffect(() => {
    startTransition(async () => {
      await navigate(selectedDate)
    })
  }, [selectedDate])

  return <CalendarRender />
}

export default function MonthCalendar() {
  return (
    <CalendarProvider initialVisibleEventCount={3}>
      <Calendar />
    </CalendarProvider>
  )
}
