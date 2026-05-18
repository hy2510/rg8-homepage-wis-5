'use client'

import LibraryTabBar from '@/8th/features/library/ui/component/LibraryTabBar'
import SITE_PATH from '@/app/site-path'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <LibraryTabBar
        items={[
          {
            href: SITE_PATH.DODON_FRIENDS.MY_LESSON,
            active: pathname.includes(SITE_PATH.DODON_FRIENDS.MY_LESSON),
            label: 'My Lesson',
          },
          {
            href: SITE_PATH.DODON_FRIENDS.CLASSES,
            active: pathname.includes(SITE_PATH.DODON_FRIENDS.CLASSES),
            label: 'Classes',
          },
        ]}
      />
      {children}
    </>
  )
}
