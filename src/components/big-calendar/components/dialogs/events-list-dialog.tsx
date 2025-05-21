import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import { ReactNode } from 'react'
import { format } from 'date-fns'
import { CalendarEvent } from '../../types'
import { EventBullet } from '../month-view/event-bullet'
import { eventBadgeColorVariants } from '../month-view/month-event-badge'

interface EventListDialogProps {
  children: ReactNode
  date: Date
  events: CalendarEvent[]
}

export function EventListDialog({
  children,
  date,
  events,
}: EventListDialogProps) {
  const cellEvents = events

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center gap-2'>
              <div>
                <span className='text-2xl'>{format(date, 'd')}</span>
                <span className='text-xs font-normal'>
                  {' '}
                  {format(date, 'MMMM, yyyy')}
                </span>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='max-h-[60vh] space-y-2 overflow-y-auto'>
          {cellEvents.map((event) => (
            <div
              key={event.id}
              className={cn(
                'flex items-center gap-2 rounded-md border p-2 hover:bg-muted',
                eventBadgeColorVariants({ color: event.color }),
              )}
            >
              <EventBullet className={''} color={event.color} />
              <div className='flex-1 truncate'>
                <p className='truncate text-xs font-semibold'>{event.title}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
