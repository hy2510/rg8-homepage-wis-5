'use client'

import { Assets } from '@/8th/assets/asset-library'
import { PLACEHOLDER_BOOK_COVER_URL } from '@/8th/features/myclass/constants/placeholder-book-cover'
import type { ClassesListBookTile } from '@/8th/features/myclass/ui/component/classes-list/types'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'

const LESSON_CHECK_SIZE = { width: 14, height: 11 } as const

type Props = {
  book: ClassesListBookTile
}

export default function ClassesListLessonBookTile({ book }: Props) {
  const ariaLabel =
    book.point > 0
      ? `${book.title} ${NumberUtils.toRgDecimalPoint(book.point)}P`
      : book.title
  const unitComplete = book.unitDone
  const unitReviewComplete = book.unitReviewDone

  const unitCheckSrc = unitComplete
    ? Assets.Icon.Study.lessonCheckWhite
    : Assets.Icon.Study.lessonCheckGray

  const unitReviewCheckSrc = unitReviewComplete
    ? Assets.Icon.Study.lessonCheckWhite
    : Assets.Icon.Study.lessonCheckGray

  return (
    <div className="cl-book-tile">
      <div className="cl-book-cover-block">
        <div className="cl-book-cover-wrap">
          <Image
            src={PLACEHOLDER_BOOK_COVER_URL}
            alt=""
            width={120}
            height={180}
            className="cl-book-cover-img"
          />
        </div>
        <span className="cl-book-cover-label">{book.label}</span>
      </div>
      <div className="cl-book-footer">
        <div
          className="cl-book-actions"
          role="group"
          aria-label={`${ariaLabel} progress`}>
          <span
            className="cl-book-action cl-book-action--left"
            data-complete={unitComplete}
            aria-hidden>
            <Image src={unitCheckSrc} alt="" {...LESSON_CHECK_SIZE} />
          </span>
          <span
            className="cl-book-action cl-book-action--right"
            data-complete={unitReviewComplete}
            aria-hidden>
            <Image src={unitReviewCheckSrc} alt="" {...LESSON_CHECK_SIZE} />
          </span>
        </div>
        <div className="cl-book-info" title={book.title}>
          <div className="wrapper">
            <div className="title">{book.title}</div>
            {book.point > 0 && (
              <div className="point">
                {NumberUtils.toRgDecimalPoint(book.point)}P
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
