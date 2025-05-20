'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { TestValue } from './types'

type TestContextProps = {
  values: TestValue[]
  count: number
}

const TestContext = createContext({} as TestContextProps)

type TestProviderProps = {
  children: React.ReactNode
  initialValues: TestValue[]
  initialCount: number
}

export function TestProvider({ children, initialValues, initialCount }: TestProviderProps) {
  const [values, setValues] = useState(initialValues)
  // console.log(values, initialValues)

  const [count, setCount] = useState(initialCount)

  // // 1
  // useEffect(() => {
  //   setValues(initialValues)
  //   setCount(initialCount)
  // }, [initialValues, initialCount])
  // 1-1
  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  useEffect(() => {
    setCount(initialCount)
  }, [initialCount])
  // // 2
  // const reinitial = useCallback(() => {
  //   setValues(initialValues)
  //   setCount(initialCount)
  // }, [initialValues, initialCount])
  // // reinitial()
  // setTimeout(reinitial, 0)

  return (
    <TestContext.Provider
      value={{
        values,
        count,
      }}
    >
      {children}
    </TestContext.Provider>
  )
}

export function useTest(): TestContextProps {
  const context = useContext(TestContext)
  if (!context) throw new Error('useCalendar must be used within a CalendarProvider.')
  return context
}
