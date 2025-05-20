'use client'

import { TestConsumer } from './test-consumer'
import { TestProvider } from './test-context'
import { TestValue } from './types'

type TestProps = {
  values?: TestValue[]
  count?: number
}

export function Test({ values = [], count = 0 }: TestProps) {
  return (
    <TestProvider initialValues={values} initialCount={count}>
      <div className='mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4'>
        <div className='overflow-hidden rounded-xl border'>
          <TestConsumer />
        </div>
      </div>
    </TestProvider>
  )
}
