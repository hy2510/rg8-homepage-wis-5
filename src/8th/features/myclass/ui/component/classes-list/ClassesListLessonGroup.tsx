'use client'

import { Assets } from '@/8th/assets/asset-library'
import {
  classesListUnitGroupStats,
  type ClassesListLessonGroup,
} from '@/8th/features/myclass/ui/component/classes-list/types'
import Image from 'next/image'
import ClassesListLessonBookTile from './ClassesListLessonBookTile'

type Props = {
  group: ClassesListLessonGroup
}

export default function ClassesListLessonGroup({ group }: Props) {
  const isUnitComplete = classesListUnitGroupStats(group.books).unit.done === 1

  return (
    <section
      className="cl-lesson-group"
      data-row-kind={group.rowKind}
      data-unit-done={isUnitComplete}
      aria-labelledby={`lesson-head-${group.id}`}>
      <div className="cl-lesson-head">
        {group.rowKind === 'review' ? (
          <span className="cl-lesson-head-icon-spacer" aria-hidden>
            <Image
              src={Assets.Icon.cornerLeftUpGray}
              alt=""
              width={24}
              height={24}
              className="cl-lesson-head-corner-icon"
            />
          </span>
        ) : (
          <Image
            src={Assets.Icon.Study.checkMarkGold}
            alt=""
            width={30}
            height={30}
            className="cl-lesson-head-icon"
          />
        )}
        <div className="cl-lesson-head-body">
          <div className="cl-lesson-title-row">
            <div className="cl-lesson-title" id={`lesson-head-${group.id}`}>
              {group.title}
            </div>
            {/* <div className="cl-lesson-stats">
              <span className="cl-lesson-stat-done">
                Done
                <span className="cl-stat-done">(0)</span>
              </span>
              <span className="cl-lesson-stat-review">
                Review
                <span className="cl-stat-review">(0)</span>
              </span>
            </div> */}
          </div>
        </div>
      </div>
      {group.rowKind !== 'review' && (
        <div className="cl-book-row">
          {group.books.map((book) => (
            <ClassesListLessonBookTile key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}
