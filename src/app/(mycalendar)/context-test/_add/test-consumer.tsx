'use client'

import { useTest } from './test-context'

export function TestConsumer() {
  const { values, count } = useTest()

  return (
    <div>
      <div>{count}</div>
      <div>
        {values.map((value) => {
          return value.id
        })}
      </div>
    </div>
  )
}
