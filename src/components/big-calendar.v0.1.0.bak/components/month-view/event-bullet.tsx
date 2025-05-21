import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { EventColor } from '../../types'

// todo: extend
const eventBulletVariants = cva('size-2 rounded-full', {
  variants: {
    color: {
      red: 'bg-red-600 dark:bg-red-500',
      orange: 'bg-orange-600 dark:bg-orange-500',
      amber: 'bg-amber-600 dark:bg-amber-500',
      yellow: 'bg-yellow-600 dark:bg-yellow-500',
      lime: 'bg-lime-600 dark:bg-lime-500',
      green: 'bg-green-600 dark:bg-green-500',
      emerald: 'bg-emerald-600 dark:bg-emerald-500',
      teal: 'bg-teal-600 dark:bg-teal-500',
      cyan: 'bg-cyan-600 dark:bg-cyan-500',
      sky: 'bg-sky-600 dark:bg-sky-500',
      blue: 'bg-blue-600 dark:bg-blue-500',
      indigo: 'bg-indigo-600 dark:bg-indigo-500',
      violet: 'bg-violet-600 dark:bg-violet-500',
      purple: 'bg-purple-600 dark:bg-purple-500',
      fuchsia: 'bg-fuchsia-600 dark:bg-fuchsia-500',
      pink: 'bg-pink-600 dark:bg-pink-500',
      rose: 'bg-rose-600 dark:bg-rose-500',
      slate: 'bg-slate-600 dark:bg-slate-500',
      gray: 'bg-gray-600 dark:bg-gray-500',
      zinc: 'bg-zinc-600 dark:bg-zinc-500',
      neutral: 'bg-neutral-600 dark:bg-neutral-500',
      stone: 'bg-stone-600 dark:bg-stone-500',
    },
  },
  defaultVariants: {
    color: 'gray',
  },
})

export function EventBullet({
  color,
  className,
}: {
  color: EventColor
  className: string
}) {
  return <div className={cn(eventBulletVariants({ color, className }))} />
}
