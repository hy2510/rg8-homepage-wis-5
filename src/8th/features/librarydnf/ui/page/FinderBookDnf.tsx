'use client'

import { useCustomerConfiguration } from '@/8th/application/context/CustomerContext'
import { useLevelBooks } from '@/8th/features/achieve/service/achieve-query'
import ContinueViewedDnf from '@/8th/features/librarydnf/ui/component/ContinueViewedDnf'
import LevelSectionContainerDnf from '@/8th/features/librarydnf/ui/component/LevelSectionContainerDnf'
import LibraryTabBarDnf from '@/8th/features/librarydnf/ui/component/LibraryTabBarDnf'
import SearchBarDnf from '@/8th/features/librarydnf/ui/component/SearchBarDnf'
import {
  LevelSectionType,
  makeLevelSectionType,
} from '@/8th/features/librarydnf/ui/levelSectionDataDnf'
import { useStudent } from '@/8th/features/student/service/student-query'
import { useTodoList } from '@/8th/features/todo/service/todo-query'
import SITE_PATH from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useMemo, useState } from 'react'
import TodoBookInfoModalDnf from '../modal/TodoBookInfoModalDnf'

const TODO_BOOK_LIMIT = 8

export default function FinderBookDnf({ booktype }: { booktype: 'eb' | 'pb' }) {
  const maketingEventTracker = useTrack()
  useEffect(() => {
    maketingEventTracker.eventAction('도서 섹션 탭 클릭', {
      version: '8th',
      section_name: 'Library',
      book_type: booktype === 'eb' ? 'eBook' : 'p Book Quiz',
    })
  }, [maketingEventTracker, booktype])

  // @Language 'common'
  const { t } = useTranslation()

  const { menu } = useCustomerConfiguration()

  const student = useStudent()
  const levels = useLevelBooks()
  const todo = useTodoList()

  const isOpenLevel = menu[booktype].readingLevel.level.open
  const findBookData: { sectionData: LevelSectionType[] } = useMemo(() => {
    if (!booktype || !levels.data) {
      return { sectionData: [] }
    }

    const bookLevels =
      booktype === 'eb' ? levels.data.eb || [] : levels.data.pb || []
    const lvKTo1Data = makeLevelSectionType('Kto1', booktype, bookLevels)

    if (!lvKTo1Data || !isOpenLevel) {
      return { sectionData: [] }
    }

    return {
      sectionData: [lvKTo1Data],
    }
  }, [booktype, levels.data, isOpenLevel])

  const [bookInfo, setBookInfo] = useState<
    | {
        levelRoundId: string
        surfaceImagePath: string
        title: string
        bookCode: string
        studentHistoryId: string
        studyId: string
      }
    | undefined
  >(undefined)

  if (levels.isLoading) {
    return <div />
  }
  const libraryTabBarItems: React.ComponentProps<
    typeof LibraryTabBarDnf
  >['items'] = []
  if (menu.eb.open) {
    libraryTabBarItems.push({
      href: SITE_PATH.DODON_FRIENDS.EB,
      active: booktype === 'eb',
      label: t('t8th325'),
    })
  }
  if (menu.pb.open) {
    libraryTabBarItems.push({
      href: SITE_PATH.DODON_FRIENDS.PB,
      active: booktype === 'pb',
      label: t('t8th326'),
    })
  }
  const todos =
    todo.data?.todo?.filter((todo) =>
      todo.levelName.startsWith(booktype === 'eb' ? 'EB' : 'PB'),
    ) ?? []
  const isTodoMore = todos.length > TODO_BOOK_LIMIT

  const onTodoBookClick = (studyId: string) => {
    const book = todos.find((book) => book.studyId === studyId)
    if (!book) {
      return
    }

    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }

    setBookInfo({
      levelRoundId: book.levelRoundId,
      surfaceImagePath: book.surfaceImagePath,
      title: book.title,
      bookCode: book.levelName,
      studentHistoryId: book.studentHistoryId,
      studyId: book.studyId,
    })
  }

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }

  return (
    <>
      {libraryTabBarItems.length > 0 && (
        <LibraryTabBarDnf items={libraryTabBarItems} />
      )}
      {menu[booktype].search.open && <SearchBarDnf booktype={booktype} />}
      {menu[booktype].continue.open && todos.length > 0 && (
        <ContinueViewedDnf
          todos={todos.filter((_, idx) => idx < TODO_BOOK_LIMIT)}
          moreTodo={isTodoMore}
          onClickBook={onTodoBookClick}
        />
      )}
      {menu[booktype].readingLevel.open && (
        <LevelSectionContainerDnf levelSection={findBookData.sectionData} />
      )}
      {bookInfo && (
        <TodoBookInfoModalDnf
          onClickClose={() => {
            setBookInfo(undefined)
          }}
          title={bookInfo.title}
          bookCode={bookInfo.bookCode}
          imgSrc={bookInfo.surfaceImagePath}
          levelRoundId={bookInfo.levelRoundId}
          studentHistoryId={bookInfo.studentHistoryId}
          studyId={bookInfo.studyId}
        />
      )}
    </>
  )
}
