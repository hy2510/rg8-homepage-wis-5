'use client'

import LibraryTabBarDnf from '@/8th/features/librarydnf/ui/component/LibraryTabBarDnf'
import SITE_PATH from '@/app/site-path'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <LibraryTabBarDnf
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
