import LevelUtils from '@/util/level-utils'

const KEYWORD_SEARCH_MAX_LEVEL_INDEX = LevelUtils.getLevelIndex('1C')

/** levelName(도서 코드)에서 레벨 코드 추출 (예: EB2A001 → 2A) */
export function getBookLevelFromLevelName(levelName: string): string {
  const normalized = levelName.replace(/-/g, '').toUpperCase()
  if (normalized.startsWith('EB') || normalized.startsWith('PB')) {
    return normalized.substring(2, 4)
  }
  return ''
}

/** 키워드 검색 시 2A 미만 레벨(PK~1C)만 허용 */
export function isKeywordSearchLevelAllowed(levelName: string): boolean {
  const level = getBookLevelFromLevelName(levelName)
  const index = LevelUtils.getLevelIndex(level)
  return index >= 0 && index <= KEYWORD_SEARCH_MAX_LEVEL_INDEX
}
