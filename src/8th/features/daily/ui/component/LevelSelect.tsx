'use client'

import { useIsPhone } from '@/8th/application/context/ScreenModeContext'
import { LevelSelectStyle } from '@/8th/shared/styled/FeaturesStyled'
import AccountPageFooter from '@/8th/shared/ui/AccountPageFooter'
import AccountPageHeader from '@/8th/shared/ui/AccountPageHeader'
import { TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import LevelSelectCard from './LevelSelectCard'

export default function LevelSelect() {
  // @language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  return (
    <LevelSelectStyle>
      <AccountPageHeader />

      <div className="container">
        <div className="group">
          <TextStyle
            fontFamily="sans"
            fontWeight={700}
            fontColor="primary"
            fontSize={isPhone ? '1.75em' : '2em'}>
            {t('t8th340')}
          </TextStyle>
          <div className="description">
            <TextStyle fontFamily="sans" fontWeight={500} fontSize="medium">
              {t('t8th341')}
            </TextStyle>
          </div>

          <LevelSelectCard />

          <div className="level-test-section">
            <TextStyle
              fontFamily="sans"
              fontWeight={500}
              fontColor="secondary"
              fontSize="medium">
              {t('t8th342')}
            </TextStyle>
            <button type="button" className="level-test-link">
              {t('t8th343')}
            </button>
          </div>
        </div>

        <AccountPageFooter />
      </div>
    </LevelSelectStyle>
  )
}
