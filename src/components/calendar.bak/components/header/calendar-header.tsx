type CalendarHeaderProps = {
  leftChildren?: React.ReactNode
  centerChildren?: React.ReactNode
  rightChildren?: React.ReactNode
}

export function CalendarHeader({ leftChildren, centerChildren, rightChildren }: CalendarHeaderProps) {
  return (
    <div className='border-b p-4'>
      <div className='flex'>
        <div className='flex-none'>{leftChildren}</div>
        <div className='grow text-center'>{centerChildren}</div>
        <div className='flex-none'>{rightChildren}</div>
      </div>
    </div>
  )
}
