'use client'

import { getClassItem } from '@/8th/features/myclass/model/class-list'
import {
  demoLessonGroupsForUnit,
  demoUnitsFromData,
} from '@/8th/features/myclass/model/classes-lessons-list-demo'
import ClassCard from '@/8th/features/myclass/ui/component/ClassCard'
import ClassesListBooksOnlyState from '@/8th/features/myclass/ui/component/classes-list/ClassesListBooksOnlyState'
import ClassesListFilterBar from '@/8th/features/myclass/ui/component/classes-list/ClassesListFilterBar'
import ClassesListLessonGroup from '@/8th/features/myclass/ui/component/classes-list/ClassesListLessonGroup'
import ClassesListUnitTabs from '@/8th/features/myclass/ui/component/classes-list/ClassesListUnitTabs'
import type { ClassesListFilter } from '@/8th/features/myclass/ui/component/classes-list/types'
import { ClassesListStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, Gap } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'

export default function ClassesList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const classId = searchParams.get('classId')
  const classItem = getClassItem(classId)

  const units = useMemo(() => demoUnitsFromData(), [])

  const [filter, setFilter] = useState<ClassesListFilter>('lesson')
  const [activeUnit, setActiveUnit] = useState(() => units[0] ?? 1)

  useLayoutEffect(() => {
    window?.scrollTo(0, 0)
  }, [classId])

  useEffect(() => {
    if (!classItem) {
      router.replace(SITE_PATH.DODON_FRIENDS.CLASSES)
    }
  }, [classItem, router])

  useEffect(() => {
    if (units.length === 0) return
    if (!units.includes(activeUnit)) {
      setActiveUnit(units[0])
    }
  }, [classId, units, activeUnit])

  const lessonGroups = useMemo(
    () => demoLessonGroupsForUnit(activeUnit),
    [activeUnit],
  )

  const isBooksOnly = filter === 'booksOnly'

  if (!classItem) {
    return null
  }

  return (
    <>
      <SubPageNavHeader parentPath={SITE_PATH.DODON_FRIENDS.CLASSES} />
      <ClassesListStyle>
        <ClassCard classItem={classItem} />
        <Gap size={2} />
        <BoxStyle display="flex" flexDirection="column" gap={20}>
          <ClassesListFilterBar
            value={filter}
            onChange={setFilter}
            totalCount={30}
          />
          {isBooksOnly ? (
            <ClassesListBooksOnlyState unit={activeUnit} />
          ) : (
            <>
              <Gap size={2} />
              {units.length > 0 && (
                <ClassesListUnitTabs
                  units={units}
                  activeUnit={activeUnit}
                  onUnitChange={setActiveUnit}
                />
              )}
              {lessonGroups.map((group) => (
                <ClassesListLessonGroup key={group.id} group={group} />
              ))}
            </>
          )}
        </BoxStyle>
      </ClassesListStyle>
    </>
  )
}
