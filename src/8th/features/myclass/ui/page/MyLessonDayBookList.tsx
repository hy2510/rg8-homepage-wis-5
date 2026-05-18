'use client'

import { DailyRgResultActionBar } from '@/8th/features/daily/ui/component/DailyRGActionBar'
import {
  getMyLessonDaySection,
  getMyLessonGroupsForDay,
} from '@/8th/features/myclass/model/my-lesson-demo'
import MyLessonBookItem from '@/8th/features/myclass/ui/component/MyLessonBookItem'
import { DailyRGCourseListStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, Divide, Gap } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

type Props = {
  dayId: string
}

export default function MyLessonDayBookList({ dayId }: Props) {
  const router = useRouter()
  const section = getMyLessonDaySection(dayId)
  const groups = getMyLessonGroupsForDay(dayId)

  useLayoutEffect(() => {
    window?.scrollTo(0, 0)
  }, [dayId])

  useEffect(() => {
    if (!section) {
      router.replace(SITE_PATH.DODON_FRIENDS.MY_LESSON)
    }
  }, [section, router])

  if (!section) {
    return null
  }

  return (
    <BoxStyle display="flex" flexDirection="column" gap={5}>
      <SubPageNavHeader parentPath={SITE_PATH.DODON_FRIENDS.MY_LESSON} />
      <Gap size={15} />
      <DailyRgResultActionBar
        title={section.title}
        bookCount={section.completedCount}
        totalCount={section.totalCount}
      />
      <DailyRGCourseListStyle>
        {groups.map((group) => (
          <div key={group.title}>
            <Gap size={15} />
            <Divide
              title={
                group.classes ? `${group.classes} ${group.title}` : group.title
              }
            />
            <div>
              {group.lessons.map((book) => (
                <MyLessonBookItem
                  key={`${group.title}-${book.no}`}
                  no={book.no}
                  title={book.title}
                  imgUrl={book.imgUrl}
                  passCount={book.passCount}
                  point={book.point}
                  color={section.accentColor}
                  isCurrent={book.isCurrent}
                  isPreK={book.isPreK ?? true}
                  preKCharacter={book.preKCharacter}
                  isMovieAvailable={book.isMovieAvailable}
                />
              ))}
            </div>
          </div>
        ))}
      </DailyRGCourseListStyle>
    </BoxStyle>
  )
}
