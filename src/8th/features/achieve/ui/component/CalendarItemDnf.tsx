import { CalendarItemDnfStyle } from '@/8th/shared/styled/FeaturesStyled'

interface CalendarItemDnfProps {
  dayNumber: number
  isToday: boolean
  isSuccess: boolean
  isAttendance: boolean
  isCurrentMonth: boolean
  goalType: 'Points' | 'Books'
  earnedPoints?: number
  booksRead?: number
  onClick?: () => void
}

export default function CalendarItemDnf({
  dayNumber,
  isToday,
  isSuccess,
  isCurrentMonth,
  goalType,
  earnedPoints,
  booksRead,
  isAttendance,
  onClick,
}: CalendarItemDnfProps) {
  const isTypePoint = goalType === 'Points'
  const isTypeBooks = goalType === 'Books'
  const point = earnedPoints || 0
  const books = booksRead || 0
  const isClickable = point > 0 || books > 0

  return (
    <CalendarItemDnfStyle
      className={`calendar-item ${!isCurrentMonth ? 'other-month' : ''} ${isSuccess ? 'completed-bg' : ''} ${isAttendance ? 'assigned-bg' : ''}`}
      onClick={isClickable ? onClick : undefined}>
      <div
        className={`day-number ${isToday ? 'today' : ''} ${
          !isCurrentMonth ? 'other-month' : ''
        } ${isSuccess ? 'completed' : ''} ${isAttendance ? 'assigned' : ''}`}>
        {dayNumber > 0 ? dayNumber : ''}
      </div>
      {point > 0 && books > 0 && (
        <div className="content">
          <div className={`lesson-title ${isSuccess ? 'completed' : ''}`}>
            Day1
          </div>
          <div className={`lesson-progress ${isSuccess ? 'completed' : ''}`}>
            1/2
          </div>
        </div>
      )}
    </CalendarItemDnfStyle>
  )
}
