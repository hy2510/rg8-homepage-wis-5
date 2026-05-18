'use client'

import { CLASS_LIST_ITEMS } from '@/8th/features/myclass/model/class-list'
import ClassCard from '@/8th/features/myclass/ui/component/ClassCard'
import { ClassesStyle } from '@/8th/shared/styled/FeaturesStyled'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'

export default function ClassesHome() {
  const router = useRouter()

  return (
    <ClassesStyle>
      {CLASS_LIST_ITEMS.map((classItem) => (
        <ClassCard
          key={classItem.id}
          classItem={classItem}
          onClick={() => {
            router.push(
              `${SITE_PATH.DODON_FRIENDS.CLASSES_LIST}?classId=${classItem.id}`,
            )
          }}
        />
      ))}
    </ClassesStyle>
  )
}
