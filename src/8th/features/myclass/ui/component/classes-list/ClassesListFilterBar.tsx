'use client'

import { useIsPhone } from '@/8th/application/context/ScreenModeContext'
import type { ClassesListFilter } from '@/8th/features/myclass/ui/component/classes-list/types'
import ActionBar, {
  ActionBarDropdown,
  type ActionBarDropdownProps,
} from '@/8th/shared/ui/ActionBar'
import useTranslation from '@/localization/client/useTranslations'
import { useMemo, useState } from 'react'

const LESSON_FILTER_OPTIONS: { value: ClassesListFilter; label: string }[] = [
  { value: 'lesson', label: 'Lesson' },
  { value: 'booksOnly', label: 'Books Only' },
]

const BUILTIN_STATUS_OPTIONS = [
  { key: 'classes-status-all', label: 'All Lessons' },
  { key: 'classes-status-ip', label: 'In Progress' },
  { key: 'classes-status-complete', label: 'Done' },
] as const

type Props = {
  value: ClassesListFilter
  onChange: (value: ClassesListFilter) => void
  totalCount: number
  /** `footerDropdowns`를 넘기면 왼쪽 요약에 사용 (기본 Status UI는 내부 옵션 + 선택 라벨) */
  summaryTitle?: string
  footerDropdowns?: ActionBarDropdownProps[]
}

export default function ClassesListFilterBar({
  value,
  onChange,
  totalCount,
  summaryTitle = 'ALL',
  footerDropdowns: footerDropdownsProp,
}: Props) {
  const isPhone = useIsPhone()
  // @Language 'common'
  const { t } = useTranslation()

  const [selectedStatusKey, setSelectedStatusKey] = useState<string>(
    BUILTIN_STATUS_OPTIONS[0].key,
  )

  const builtinItems = useMemo(
    () =>
      BUILTIN_STATUS_OPTIONS.map(({ key, label }) => ({
        key,
        label,
        isActive: key === selectedStatusKey,
      })),
    [selectedStatusKey],
  )

  const footerDropdowns = useMemo<ActionBarDropdownProps[]>(() => {
    if (footerDropdownsProp) {
      return footerDropdownsProp
    }
    return [
      {
        title: t('t8th012'),
        isActiveMakerVisible: true,
        items: builtinItems,
        onItemClick: (item) => {
          if (item.key === '--' || !item.key) return
          setSelectedStatusKey(item.key)
        },
      },
    ]
  }, [footerDropdownsProp, t, builtinItems])

  const summaryBoldText = useMemo(() => {
    if (footerDropdownsProp) {
      return summaryTitle
    }
    return builtinItems.find((i) => i.isActive)?.label ?? summaryTitle
  }, [footerDropdownsProp, summaryTitle, builtinItems])

  const showFooter = value !== 'booksOnly'

  return (
    <ActionBar
      body={
        <div
          className="cl-filter-options"
          role="radiogroup"
          aria-label="Lesson filter">
          {LESSON_FILTER_OPTIONS.map(({ value: optionValue, label }) => {
            const active = value === optionValue
            return (
              <label
                key={optionValue}
                className="cl-filter-option"
                data-active={active}
                role="radio"
                aria-checked={active}>
                <input
                  type="radio"
                  className="cl-filter-radio"
                  name="classes-list-filter"
                  checked={active}
                  onChange={() => onChange(optionValue)}
                />
                <span className="cl-filter-dot" aria-hidden />
                <span className="cl-filter-label">{label}</span>
              </label>
            )
          })}
        </div>
      }
      footer={
        showFooter ? (
          <div className="cl-filter-footer">
            <div className="cl-filter-summary">
              <span className="cl-filter-summary-title">{summaryBoldText}</span>
              {totalCount >= 0 && (
                <span className="cl-filter-summary-count">({totalCount})</span>
              )}
            </div>
            <div className="cl-filter-dropdowns">
              {footerDropdowns.map((dropdown, i) => (
                <ActionBarDropdown
                  key={`${dropdown.title}-${i}`}
                  title={dropdown.title}
                  position={isPhone ? (i > 1 ? 'right' : 'left') : undefined}
                  items={dropdown.items}
                  isActiveMakerVisible={dropdown.isActiveMakerVisible}
                  onItemClick={dropdown.onItemClick}
                />
              ))}
            </div>
          </div>
        ) : undefined
      }
    />
  )
}
