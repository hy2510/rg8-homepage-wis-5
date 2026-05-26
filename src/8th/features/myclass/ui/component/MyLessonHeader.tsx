import { Assets } from '@/8th/assets/asset-library'
import { MyLessonHeaderStyle } from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'

export interface MyLessonHeaderProps {
  onCalendarButtonClick?: () => void
}

export default function MyLessonHeader({
  onCalendarButtonClick,
}: MyLessonHeaderProps) {
  const now = new Date()
  const monthLabel = now.toLocaleString('en-US', { month: 'long' })
  const year = now.getFullYear()

  return (
    <MyLessonHeaderStyle>
      <div
        className="calendar-button"
        role={onCalendarButtonClick ? 'button' : undefined}
        tabIndex={onCalendarButtonClick ? 0 : undefined}
        aria-haspopup={onCalendarButtonClick ? 'dialog' : undefined}
        onClick={onCalendarButtonClick}
        onKeyDown={(e) => {
          if (
            !onCalendarButtonClick ||
            (e.key !== 'Enter' && e.key !== ' ')
          ) {
            return
          }
          e.preventDefault()
          onCalendarButtonClick()
        }}>
        {/* <Image
          src={Assets.Icon.calendarSymbol}
          alt="calendar"
          width={32}
          height={32}
        /> */}
        <div className="calendar-button-text">
          <span>Lessons in</span>
          <span>{monthLabel}</span>
          <span>{year}</span>
          <Image
            src={Assets.Icon.chevronDownGray}
            alt=""
            width={16}
            height={16}
          />
        </div>
      </div>
    </MyLessonHeaderStyle>
  )
}
