'use client'

import { useEffect, useState } from 'react'
import { Test } from './test'
import { TestValue } from './types'

const getResult = () => {
  return [{ id: '1' }]
}

const getCount = (max: number = 10) => {
  return Math.floor(Math.random() * max)
}

export default function Container() {
  const [result, setResult] = useState<TestValue[]>()

  useEffect(() => {
    const newResult = getResult()
    setResult([...newResult])
  }, [])

  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(getCount())
  }, [])

  return <Test values={result} count={count} />
  // return <Test values={getResult()} />
}
