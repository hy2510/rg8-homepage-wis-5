'use client'

import { useIsPhone } from '@/8th/application/context/ScreenModeContext'
import { Assets } from '@/8th/assets/asset-library'
import { getTodoBookDisplayDate } from '@/8th/features/librarydnf/utils/todo-book-date'
import { TodoBook } from '@/8th/features/todo/model/todo-book'
import {
  BookListEmptyStateStyle,
  BookListStyle,
  RecentlyViewedStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { RoundedFullButton } from '@/8th/shared/ui/Buttons'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import BookItemDnf from './BookItemDnf'

/**
 * Recently Viewed 메뉴 (My To-Do)
 */
export default function ContinueViewedDnf({
  todos,
  moreTodo,
  onClickBook,
}: {
  todos?: TodoBook[]
  moreTodo?: boolean
  onClickBook?: (studyId: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  return (
    <RecentlyViewedStyle>
      <BoxStyle display="flex" gap={isPhone ? 5 : 10} alignItems="center">
        <TextStyle fontSize="large" fontColor="primary">
          {`· Assignments`}
        </TextStyle>
      </BoxStyle>

      {!!todos && (
        <ContinueTodoBookList
          todos={todos}
          moreTodo={!!moreTodo}
          onClickBook={onClickBook}
        />
      )}
    </RecentlyViewedStyle>
  )
}

function ContinueTodoBookList({
  todos,
  moreTodo,
  onClickBook,
}: {
  todos: TodoBook[]
  moreTodo: boolean
  onClickBook?: (studyId: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  if (todos.length === 0) {
    return (
      <BookListEmptyStateStyle>
        <p>{t('t8th009')}</p>
      </BookListEmptyStateStyle>
    )
  }

  return (
    <>
      {isPhone && (
        <BoxStyle
          className="list mobile-slider todo-books-slider"
          display="flex"
          gap={10}>
          {todos.map((book) => (
            <div key={book.studyId} className="slider-item">
              {renderBookItem(book, onClickBook)}
            </div>
          ))}
        </BoxStyle>
      )}
      {!isPhone && (
        <BookListStyle>
          {todos.map((book) => renderBookItem(book, onClickBook))}
        </BookListStyle>
      )}
      {moreTodo && (
        <Link href={SITE_PATH.DODON_FRIENDS.ASSIGNMENTS}>
          <RoundedFullButton
            onClick={undefined}
            fontColor="var(--font-color-primary)">
            <BoxStyle
              display="flex"
              alignItems="center"
              flexDirection="row"
              gap={5}>
              <TextStyle
                fontSize="medium"
                fontWeight="bolder"
                fontFamily="sans">
                {t('t8th333')}
              </TextStyle>
              <Image
                src={Assets.Icon.arrowRightBlack}
                alt="right-arrow"
                width={14}
                height={14}
              />
            </BoxStyle>
          </RoundedFullButton>
        </Link>
      )}
    </>
  )
}

function renderBookItem(
  book: TodoBook,
  onClickBook?: (studyId: string) => void,
) {
  const isInProgressInTodo = book.levelName.startsWith('EB-PK')
    ? !book.deleteYn
    : book.answerCount > 0
  return (
    <BookItemDnf
      key={book.studyId}
      title={book.title}
      passCount={0}
      addYn={!book.deleteYn}
      movieYn={!!book.animationPath}
      point={book.getableRgPoint}
      src={book.surfaceImagePath}
      levelName={book.levelName}
      displayDate={getTodoBookDisplayDate(book)}
      assignmentsYn={book.assignmentsYn}
      recommendedAge={book.recommendedAge}
      isCheckable={false}
      isDisabled={false}
      isChecked={false}
      isInProgressInTodo={isInProgressInTodo}
      onClick={() => {
        if (onClickBook) {
          onClickBook(book.studyId)
        }
      }}
    />
  )
}
