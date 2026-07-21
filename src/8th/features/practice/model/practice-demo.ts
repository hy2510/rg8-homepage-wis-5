/**
 * Practice 페이지 더미 데이터
 *
 * TO-DO: 서버 연동 시 이 파일의 더미 데이터를 API 응답으로 교체하세요.
 *       - practice-query.ts (React Query hook) 생성
 *       - 아래 타입을 API response schema 와 맞춰 조정
 */

export type PracticeBookType = 'eb' | 'pb'

export type PracticeLevel = string

export type PracticeWordStatus = 'weak' | 'normal' | 'strong' | 'perfect'

export type PracticeWordItem = {
  id: string
  word: string
  status: PracticeWordStatus
  /** TO-DO: API 연동 후 발음 재생 URL */
  audioUrl?: string
}

export type PracticeStatusSummary = {
  status: PracticeWordStatus
  label: string
  count: number
  color: string
}

export type PracticeBookTypeTab = {
  key: PracticeBookType
  label: string
}

export type PracticeLevelTab = {
  level: PracticeLevel
  label?: string
}

export type PracticeStage = {
  stageId: string
  stageName: string
  levelKey: string
  subText: string
  levels: PracticeLevelTab[]
}

export type PracticeFilterOption = {
  key: string
  label: string
}

/** TO-DO: API — E-Book / P-Book Quiz 탭 목록 */
export const PRACTICE_BOOK_TYPE_TABS: PracticeBookTypeTab[] = [
  { key: 'eb', label: 'E-Book' },
  { key: 'pb', label: 'P-Book Quiz' },
]

/** TO-DO: API — 스테이지(큰 레벨) 및 하위 레벨 탭 목록 */
export const PRACTICE_STAGES: PracticeStage[] = [
  {
    stageId: 'stage-k',
    stageName: 'Kindergarten',
    levelKey: 'K',
    subText: '초등 저레벨',
    levels: [{ level: 'KA' }, { level: 'KB' }, { level: 'KC' }],
  },
  {
    stageId: 'stage-1',
    stageName: 'Level 1',
    levelKey: '1',
    subText: '초등 고레벨',
    levels: [{ level: '1A' }, { level: '1B' }, { level: '1C' }],
  },
  {
    stageId: 'stage-2',
    stageName: 'Level 2',
    levelKey: '2',
    subText: '중등',
    levels: [{ level: '2A' }, { level: '2B' }, { level: '2C' }],
  },
  {
    stageId: 'stage-3',
    stageName: 'Level 3',
    levelKey: '3',
    subText: '고등',
    levels: [{ level: '3A' }, { level: '3B' }, { level: '3C' }],
  },
]

/** TO-DO: API — 단어 숙련도별 집계 (도넛 차트 + 범례) */
export const PRACTICE_STATUS_SUMMARY: PracticeStatusSummary[] = [
  { status: 'weak', label: '약함', count: 300, color: '#FF6B8A' },
  { status: 'normal', label: '보통', count: 100, color: '#FFC62F' },
  { status: 'strong', label: '강함', count: 150, color: '#00B4D8' },
  { status: 'perfect', label: '완벽', count: 70, color: '#4CD964' },
]

/** TO-DO: API — 단어 목록 (페이지네이션·필터·레벨·북타입 파라미터 적용) */
export const PRACTICE_WORDS: PracticeWordItem[] = [
  { id: '1', word: 'ant', status: 'weak' },
  { id: '2', word: 'alligator', status: 'normal' },
  { id: '3', word: 'ax', status: 'weak' },
  { id: '4', word: 'apple', status: 'strong' },
  { id: '5', word: 'airplane', status: 'perfect' },
  { id: '6', word: 'ant', status: 'weak' },
  { id: '7', word: 'alligator', status: 'normal' },
  { id: '8', word: 'ax', status: 'weak' },
  { id: '9', word: 'apple', status: 'strong' },
  { id: '10', word: 'airplane', status: 'perfect' },
  { id: '11', word: 'ant', status: 'weak' },
  { id: '12', word: 'alligator', status: 'normal' },
  { id: '13', word: 'ax', status: 'weak' },
  { id: '14', word: 'apple', status: 'strong' },
  { id: '15', word: 'airplane', status: 'perfect' },
]

/** TO-DO: API — 단어 목록 필터 옵션 */
export const PRACTICE_FILTER_OPTIONS: PracticeFilterOption[] = [
  { key: 'all', label: '전체 보기' },
  { key: 'weak', label: '약함' },
  { key: 'normal', label: '보통' },
  { key: 'strong', label: '강함' },
  { key: 'perfect', label: '완벽' },
]

/** TO-DO: API — 페이지네이션 메타 */
export const PRACTICE_PAGE_INFO = {
  totalWords: 800,
  totalPages: 5,
  currentPage: 1,
}

/** TO-DO: API — 헤더 영역 (제목, 부제, 복습 시작 가능 여부) */
export const PRACTICE_HEADER = {
  title: 'Word Practice',
  subtitle: '최근 학습한 단어를 복습해 보세요.',
  startButtonLabel: '복습 시작하기!',
}

/** TO-DO: API — 차트 중앙 텍스트 (선택 레벨·북타입·총 단어 수) */
export function getPracticeChartCenterText(
  level: PracticeLevel,
  bookType: PracticeBookType,
  totalWords: number,
) {
  const bookTypeLabel = bookType === 'eb' ? 'E-Book' : 'P-Book Quiz'
  return {
    level,
    bookTypeLabel,
    totalWords,
  }
}

export const PRACTICE_STATUS_COLOR: Record<PracticeWordStatus, string> = {
  weak: '#FF6B8A',
  normal: '#FFC62F',
  strong: '#00B4D8',
  perfect: '#4CD964',
}

export function getPracticeTotalWordCount(
  summaries: PracticeStatusSummary[] = PRACTICE_STATUS_SUMMARY,
) {
  return summaries.reduce((sum, item) => sum + item.count, 0)
}
