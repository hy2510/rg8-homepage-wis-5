export type ClassesListBookCoverLabel = 'Movie Activity' | 'Song' | 'eBook'

export type ClassesListBookTile = {
  id: string
  title: string
  /** 표지 오버레이 — Movie Activity / Song / eBook */
  label: ClassesListBookCoverLabel
  /** 포인트 — 소수(예: 1.0) */
  point: number
  /** 왼쪽 알약 — 유닛 레슨 완료 */
  unitDone: boolean
  /** 오른쪽 알약 — 유닛 리뷰 완료 */
  unitReviewDone: boolean
}

/** `Phonics` 행 vs `Review` 행 — UI 구분용 */
export type ClassesListRowKind = 'lesson' | 'review'

export type ClassesListLessonGroup = {
  id: string
  /** 제목 `1.1:` / `1.2:` 기준 — Phonics=lesson, Review=review */
  rowKind: ClassesListRowKind
  /** 예: `1.1: Phonics - ace / age` (앞자리 숫자로 탭 구분) */
  title: string
  books: ClassesListBookTile[]
}

export type ClassesListUnitProgress = {
  done: number
  total: number
}

export type ClassesListUnitGroupStats = {
  unit: ClassesListUnitProgress
  unitReview: ClassesListUnitProgress
}

/**
 * 유닛(차시) 헤더 Unit / Unit Review
 * - Unit: 소속 도서가 모두 `unitDone`이면 1 (유닛 리뷰 미포함)
 * - Unit Review: 소속 도서가 모두 `unitReviewDone`이면 1
 */
export function classesListUnitGroupStats(
  books: ClassesListBookTile[],
): ClassesListUnitGroupStats {
  if (books.length === 0) {
    return {
      unit: { done: 0, total: 1 },
      unitReview: { done: 0, total: 1 },
    }
  }
  const unitComplete = books.every((book) => book.unitDone)
  const unitReviewComplete = books.every((book) => book.unitReviewDone)
  return {
    unit: { done: unitComplete ? 1 : 0, total: 1 },
    unitReview: { done: unitReviewComplete ? 1 : 0, total: 1 },
  }
}

export type ClassesListFilter = 'lesson' | 'booksOnly'
