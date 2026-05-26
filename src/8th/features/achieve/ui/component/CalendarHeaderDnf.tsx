import { CalendarHeaderStyle } from '@/8th/shared/styled/FeaturesStyled'
import useTranslation from '@/localization/client/useTranslations'

interface CalendarHeaderDnfProps {}

/**
 * 도도앤프렌즈 전용 캘린더 헤더
 */
export default function CalendarHeaderDnf({}: CalendarHeaderDnfProps) {
  const { t } = useTranslation()

  return (
    <CalendarHeaderStyle>
      <div className="left-group">
        <div className="comment">
          <span className="title">{t('t8th183')}</span>
          <span className="value">1000</span>
        </div>
      </div>
      <div className="right-group">
        <div className="comment">
          <span className="icon blue green" />
          <span className="title">Assigned</span>
          <span className="value black">12</span>
        </div>
        <div className="comment">
          <span className="icon yellow" />
          <span className="title">Completed</span>
          <span className="value black">2</span>
        </div>
      </div>
    </CalendarHeaderStyle>
  )
}
