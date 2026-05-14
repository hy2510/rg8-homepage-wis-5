'use client'

import SITE_PATH from '@/app/site-path'
import { get8thUseStatus, isGoTo8th } from '@/external/site-7-8-bridge'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useStudentInfo } from '../_client/store/student/info/selector'
import { useCustomerInfo } from '../_context/CustomerContext'

// 7차에서 학습 관련된 기능을 접근할 때, 8차로 Redirect 하는 컴포넌트
export default function RedirectGoTo8thWatcher() {
  const path = usePathname()
  const { studentId } = useStudentInfo()
  const { customerId, customerUse, countryCode } = useCustomerInfo()

  useEffect(() => {
    const _window = window
    if (!_window) return

    const _8thStatus = get8thUseStatus()
    if (_8thStatus !== 'only_8th') {
      return
    }
    if (
      !studentId ||
      !customerId ||
      !customerUse ||
      !countryCode ||
      !isGoTo8th()
    ) {
      return
    }

    const targetUris = [
      { from: '/library', to: '/8th/forwarder' },
      { from: '/basic', to: SITE_PATH.STUDENT_8TH.EB },
      { from: '/review', to: SITE_PATH.STUDENT_8TH.ACTIVITY },
      { from: '/ranking', to: SITE_PATH.STUDENT_8TH.RANKING },
    ]
    const targetUri = targetUris.find((uri) => path.includes(uri.from))
    if (targetUri && targetUri.to) {
      _window.location.replace(targetUri.to)
    }
  }, [path, studentId, customerId, customerUse, countryCode])

  return null
}
