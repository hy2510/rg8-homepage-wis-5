'use client'

import { useCustomerInfo } from '@/8th/application/context/CustomerContext'
import { useIsPhone } from '@/8th/application/context/ScreenModeContext'
import { useUpdateStudentLocalConfig } from '@/8th/features/student/service/setting-query'
import { useStudent } from '@/8th/features/student/service/student-query'
import {
  ModalBodyStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useRef } from 'react'
import { BoxStyle, TextStyle } from '../../Misc'
import { ModalContainer } from '../../Modal'

export default function AppUserGuideModal({
  isInitialPopup,
  onCloseModal,
}: {
  isInitialPopup?: boolean
  onCloseModal: () => void
}) {
  // @Language 'common'
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const iframeRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const iframe = iframeRef.current

    if (iframe) {
      iframe.onload = () => {
        const doc = iframe.contentWindow?.document
        if (!doc) return
      }
    }
  }, [])

  const isPhone = useIsPhone()
  const { customerId } = useCustomerInfo()
  const student = useStudent()
  const studentId = student.data?.student?.studentId || ''
  const updateUserConfig = useUpdateStudentLocalConfig()

  const onClickDoNotAutoShow = (isDoNotAutoShow: boolean) => {
    updateUserConfig({
      customerId: customerId,
      studentId: studentId,
      appUserGuideAutoShow: !isDoNotAutoShow,
    })
    onCloseModal()
  }

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">{t('t8th318')}</div>
        <div className="btn-close" onClick={onCloseModal} />
      </ModalHeaderStyle>
      <ModalBodyStyle style={{ padding: 0 }}>
        <iframe
          ref={iframeRef}
          src={`/src/html/8th-user-guide/index.html?lang=${language}`}
          width="100%"
          height="auto"
          style={{
            height: isInitialPopup
              ? `calc(100vh - ${isPhone ? 141 : 250}px)`
              : 'calc(100vh - 81px)',
            border: 'none',
          }}
        />
      </ModalBodyStyle>
      {isInitialPopup && (
        <>
          <BoxStyle
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'60px'}
            onClick={() => {
              onClickDoNotAutoShow(true)
            }}>
            <TextStyle
              fontFamily="sans"
              fontSize="medium"
              fontWeight={500}
              fontColor="var(--font-color-secondary)"
              padding="0 0 10px 0">
              {t('t8th319')}
            </TextStyle>
          </BoxStyle>
        </>
      )}
    </ModalContainer>
  )
}
