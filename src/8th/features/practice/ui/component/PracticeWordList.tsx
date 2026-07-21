import { useIsPhone } from '@/8th/application/context/ScreenModeContext'
import { Assets } from '@/8th/assets/asset-library'
import {
  PRACTICE_FILTER_OPTIONS,
  PRACTICE_STATUS_COLOR,
  type PracticeWordItem,
} from '@/8th/features/practice/model/practice-demo'
import { PracticeWordListSectionStyle } from '@/8th/shared/styled/FeaturesStyled'
import { Dropdown } from '@/8th/shared/ui/Misc'
import Image from 'next/image'

export default function PracticeWordList({
  words,
  totalWords,
  filterValue,
  onFilterChange,
  onPlayWord,
}: {
  /** TO-DO: API — 현재 페이지 단어 목록 */
  words: PracticeWordItem[]
  totalWords: number
  filterValue: string
  /** TO-DO: API — 필터 변경 시 목록 재조회 */
  onFilterChange: (value: { key: string; label: string }) => void
  /** TO-DO: API — 단어 발음 재생 */
  onPlayWord?: (word: PracticeWordItem) => void
}) {
  const isPhone = useIsPhone()
  const selectedFilter =
    PRACTICE_FILTER_OPTIONS.find((option) => option.key === filterValue)
      ?.label ?? PRACTICE_FILTER_OPTIONS[0].label

  return (
    <PracticeWordListSectionStyle>
      <div className="list-header">
        <span className="word-count-label">{totalWords} 단어</span>
        <Dropdown
          className="practice-filter-dropdown"
          selectedValue={selectedFilter}
          options={PRACTICE_FILTER_OPTIONS.map((option) => ({
            key: option.key,
            label: option.label,
          }))}
          onChange={onFilterChange}
          menuPosition={isPhone ? 'right' : 'left'}
        />
      </div>
      <div className="word-list">
        {words.map((word) => (
          <div key={word.id} className="word-row">
            <button
              type="button"
              className="play-button"
              aria-label={`Play ${word.word}`}
              onClick={() => onPlayWord?.(word)}>
              <Image src={Assets.Icon.playRed} alt="" width={28} height={28} />
            </button>
            <span className="word-label">{word.word}</span>
            <span
              className="status-dot"
              style={{ backgroundColor: PRACTICE_STATUS_COLOR[word.status] }}
            />
          </div>
        ))}
      </div>
    </PracticeWordListSectionStyle>
  )
}
