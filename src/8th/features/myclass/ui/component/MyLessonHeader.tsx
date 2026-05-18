import { Assets } from '@/8th/assets/asset-library'
import { MyLessonHeaderStyle } from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'

export default function MyLessonCalendar() {
  return (
    <MyLessonHeaderStyle>
      <div className="calendar-button">
        {/* <Image
          src={Assets.Icon.calendarSymbol}
          alt="calendar"
          width={32}
          height={32}
        /> */}
        <div className="calendar-button-text">
          <span>March</span>
          <span>2026</span>
          {/* <Image
            src={Assets.Icon.chevronDownGray}
            alt="arrow down"
            width={16}
            height={16}
          /> */}
        </div>
      </div>
    </MyLessonHeaderStyle>
  )
}
