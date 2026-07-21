'use client'

import LibraryTabBar from '@/8th/features/library/ui/component/LibraryTabBar'
import {
  PRACTICE_BOOK_TYPE_TABS,
  PRACTICE_PAGE_INFO,
  PRACTICE_STAGES,
  PRACTICE_STATUS_SUMMARY,
  PRACTICE_WORDS,
  type PracticeBookType,
  type PracticeWordStatus,
  getPracticeTotalWordCount,
} from '@/8th/features/practice/model/practice-demo'
import PracticeHeader from '@/8th/features/practice/ui/component/PracticeHeader'
import PracticeLevelTabs from '@/8th/features/practice/ui/component/PracticeLevelTabs'
import PracticeWordChart from '@/8th/features/practice/ui/component/PracticeWordChart'
import PracticeWordList from '@/8th/features/practice/ui/component/PracticeWordList'
import { PracticeHomeStyle } from '@/8th/shared/styled/FeaturesStyled'
import { Gap } from '@/8th/shared/ui/Misc'
import Pagenation from '@/8th/shared/ui/Pagenation'
import SITE_PATH from '@/app/site-path'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const WORDS_PER_PAGE = PRACTICE_WORDS.length

export default function PracticeHome() {
  const searchParams = useSearchParams()

  // TO-DO: API — React Query 등으로 서버 상태 관리로 교체
  const bookType = useMemo<PracticeBookType>(() => {
    const bookTypeParam = searchParams.get('booktype')?.toLowerCase()
    if (bookTypeParam === 'pb') {
      return 'pb'
    }
    return 'eb'
  }, [searchParams])

  const bookTypeTabItems = useMemo(
    () =>
      PRACTICE_BOOK_TYPE_TABS.map((tab) => ({
        label: tab.label,
        href:
          tab.key === 'eb'
            ? SITE_PATH.STUDENT_8TH.PRACTICE
            : `${SITE_PATH.STUDENT_8TH.PRACTICE}?booktype=${tab.key}`,
        active: bookType === tab.key,
      })),
    [bookType],
  )

  const [stageId, setStageId] = useState(PRACTICE_STAGES[0].stageId)
  const [level, setLevel] = useState(PRACTICE_STAGES[0].levels[0].level)
  const [filterKey, setFilterKey] = useState('all')
  const [currentPage, setCurrentPage] = useState(PRACTICE_PAGE_INFO.currentPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [bookType])

  const totalWords = getPracticeTotalWordCount(PRACTICE_STATUS_SUMMARY)

  const filteredWords = useMemo(() => {
    // TO-DO: API — bookType, level, filterKey, page 파라미터로 서버 조회
    if (filterKey === 'all') {
      return PRACTICE_WORDS
    }
    return PRACTICE_WORDS.filter(
      (word) => word.status === (filterKey as PracticeWordStatus),
    )
  }, [filterKey])

  const pagedWords = useMemo(() => {
    // TO-DO: API — 서버 페이지네이션 응답 사용
    const start = (currentPage - 1) * WORDS_PER_PAGE
    return filteredWords.slice(start, start + WORDS_PER_PAGE)
  }, [filteredWords, currentPage])

  const handleStartPractice = () => {
    // TO-DO: API — 복습 세션 시작 API 호출 후 학습 화면으로 이동
  }

  const handlePlayWord = () => {
    // TO-DO: API — word.audioUrl 로 발음 재생
  }

  const handleFilterChange = (value: { key: string; label: string }) => {
    setFilterKey(value.key)
    setCurrentPage(1)
  }

  return (
    <PracticeHomeStyle>
      <PracticeHeader onStartClick={handleStartPractice} />

      {/* <Gap size={10} /> */}

      <LibraryTabBar items={bookTypeTabItems} />

      <PracticeLevelTabs
        activeLevel={level}
        currentStageId={stageId}
        stages={PRACTICE_STAGES}
        onLevelChange={(nextLevel) => {
          setLevel(nextLevel)
          setCurrentPage(1)
          // TO-DO: API — 레벨 변경 시 데이터 refetch
        }}
        onStageChange={(nextStageId) => {
          const nextStage = PRACTICE_STAGES.find(
            (stage) => stage.stageId === nextStageId,
          )
          if (!nextStage) {
            return
          }
          setStageId(nextStageId)
          setLevel(nextStage.levels[0]?.level ?? level)
          setCurrentPage(1)
          // TO-DO: API — 스테이지 변경 시 데이터 refetch
        }}
      />

      <PracticeWordChart
        level={level}
        bookType={bookType}
        summaries={PRACTICE_STATUS_SUMMARY}
        totalWords={totalWords}
      />

      <PracticeWordList
        words={pagedWords}
        totalWords={totalWords}
        filterValue={filterKey}
        onFilterChange={handleFilterChange}
        onPlayWord={handlePlayWord}
      />

      <Pagenation
        maxPage={PRACTICE_PAGE_INFO.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </PracticeHomeStyle>
  )
}
