import StudentInfoProvider from '@/8th/application/student/StudentInfoLoadingProvider'
import { GuardStudent } from '@/8th/shared/auth/GuardAuth'
import SITE_PATH from '@/app/site-path'
import React from 'react'

export const metadata = {
  title: 'Reading Gate',
  description: 'English Library',
}

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <GuardStudent redirectTo={SITE_PATH.ACCOUNT.MAIN}>
      <StudentInfoProvider>{children}</StudentInfoProvider>
    </GuardStudent>
  )
}
