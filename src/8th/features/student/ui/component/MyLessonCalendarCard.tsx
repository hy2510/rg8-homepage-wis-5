'use client'

import { MyLessonCalendarCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import {
  CommonTitleStyle,
  WidgetBoxStyle,
} from '@/8th/shared/styled/SharedStyled'
import { useMemo } from 'react'

export type MyLessonCalendarDayState = 'completed' | 'prepared' | 'selected'

export interface MyLessonCalendarCardProps {
  /** 연도 (미지정 시 오늘 기준 연도) */
  year?: number
  /** 월 1–12 (미지정 시 오늘 기준 월) */
  month?: number
  /** 완료 레슨이 있는 일 */
  completedDays?: number[]
  /** 준비된 레슨이 있는 일 */
  preparedDays?: number[]
  /** 강조(테두리)할 일. 미지정·null이면 선택 테두리 없음. 오늘 표시는 빨간 점만 사용 */
  selectedDay?: number | null
  legendCompletedCount?: number
  legendPreparedCount?: number
  onClickTitle?: () => void
}

const WEEK_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const

function buildMonthGrid(year: number, month1to12: number) {
  const monthIndex = month1to12 - 1
  const firstDow = new Date(year, monthIndex, 1).getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDow; i++) {
    cells.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d)
  }
  while (cells.length < totalCells) {
    cells.push(null)
  }
  return { cells, daysInMonth }
}

function getTodayParts() {
  const d = new Date()
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
  }
}

function resolveSelectedDay(
  selectedDayProp: number | null | undefined,
): number | null {
  if (selectedDayProp === null || selectedDayProp === undefined) {
    return null
  }
  return selectedDayProp
}

export default function MyLessonCalendarCard({
  year: yearProp,
  month: monthProp,
  completedDays = [1, 4, 6, 13, 15],
  preparedDays = [1, 4, 6, 8, 11, 13, 15, 18, 20, 22, 25, 27, 29],
  selectedDay: selectedDayProp,
  legendCompletedCount = 2,
  legendPreparedCount = 12,
  onClickTitle,
}: MyLessonCalendarCardProps) {
  const today = useMemo(() => getTodayParts(), [])
  const year = yearProp ?? today.year
  const month = monthProp ?? today.month
  const selectedDay = resolveSelectedDay(selectedDayProp)

  const monthLabel = useMemo(
    () =>
      new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long' }),
    [year, month],
  )

  const { cells } = useMemo(() => buildMonthGrid(year, month), [year, month])

  const completedSet = useMemo(() => new Set(completedDays), [completedDays])
  const preparedSet = useMemo(() => new Set(preparedDays), [preparedDays])

  return (
    <WidgetBoxStyle height="fit-content" todayGoal={false} getAward={false}>
      <MyLessonCalendarCardStyle>
        <CommonTitleStyle onClick={onClickTitle}>
          {monthLabel} {year}
        </CommonTitleStyle>

        <div className="calendar-header" role="row">
          {WEEK_LABELS.map((label, i) => (
            <span key={`${label}-${i}`}>{label}</span>
          ))}
        </div>

        <div className="calendar-grid" role="grid">
          {cells.map((day, idx) => {
            if (day === null) {
              return (
                <div
                  key={`e-${idx}`}
                  className="calendar-day-cell calendar-day-cell--empty"
                  aria-hidden
                />
              )
            }

            const dow = new Date(year, month - 1, day).getDay()
            const isSunday = dow === 0
            const isCompleted = completedSet.has(day)
            const isPrepared = preparedSet.has(day) && !isCompleted
            const isSelected = selectedDay != null && selectedDay === day
            const isToday =
              day === today.day && month === today.month && year === today.year

            const dayClasses = [
              'calendar-day',
              isToday && 'calendar-day--today',
              isSunday && 'calendar-day--sunday',
              isCompleted && 'calendar-day--completed',
              isPrepared && 'calendar-day--prepared',
              isSelected && 'calendar-day--selected',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <div key={day} className="calendar-day-cell">
                <div
                  className={dayClasses}
                  role="gridcell"
                  aria-current={isToday ? 'date' : undefined}>
                  {day}
                </div>
              </div>
            )
          })}
        </div>

        <hr />

        <div className="calendar-legend">
          <div className="calendar-legend-row">
            <div className="left">
              <span
                className="calendar-legend-swatch calendar-legend-swatch--ready"
                aria-hidden
              />
              <div className="text">Assigned Lessons</div>
            </div>
            <div className="text-count">{legendPreparedCount}</div>
          </div>

          <div className="calendar-legend-row">
            <div className="left">
              <span
                className="calendar-legend-swatch calendar-legend-swatch--done"
                aria-hidden
              />
              <div className="text">Completed Lessons</div>
            </div>
            <div className="text-count">{legendCompletedCount}</div>
          </div>
        </div>
      </MyLessonCalendarCardStyle>
    </WidgetBoxStyle>
  )
}
