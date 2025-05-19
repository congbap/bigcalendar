import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { adjustShade } from '../../lib/utils'

const eventBulletVariants = cva('size-2 rounded-full', {
  variants: {},
})

export function EventBullet({ color, className }: { color: string; className: string }) {
  // todo: recolor
  // bg-blue-600 dark:bg-blue-500
  // color: 'blue',
  const colorClasses = [`bg-blue-600`, `dark:bg-blue-500`, `bg-[${adjustShade(color, 600)}]`, `dark:bg-[${adjustShade(color, 500)}]`]

  // return <div className={cn(eventBulletVariants({ className }), ...colorClasses)} />
  // return <div style={{ '--item-color': `bg-[${adjustShade(color, 600)}]` } as React.CSSProperties} className='bg-[--item-color]' />
  // return (
  //   <div style={{ '--item-color': `${adjustShade(color, 600)}` } as React.CSSProperties}>
  //     <div className='size-2 rounded-full bg-[--item-color]' />
  //     {/* <div className='size-2 rounded-full bg-blue-500' /> */}
  //   </div>
  // )
  return <div style={{ '--item-color': `${adjustShade(color, 600)}` } as React.CSSProperties} className='size-2 rounded-full bg-[--item-color]' />
}
