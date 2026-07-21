import {
  getPracticeChartCenterText,
  type PracticeBookType,
  type PracticeLevel,
  type PracticeStatusSummary,
} from '@/8th/features/practice/model/practice-demo'
import { PracticeChartSectionStyle } from '@/8th/shared/styled/FeaturesStyled'
import { useMemo } from 'react'

function MultiSegmentDonut({
  segments,
  size = 220,
  strokeWidth = 28,
}: {
  segments: { value: number; color: string }[]
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  let accumulatedAngle = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#E9EDF3"
        strokeWidth={strokeWidth}
      />
      {segments.map((segment, index) => {
        if (segment.value <= 0 || total <= 0) {
          return null
        }

        const ratio = segment.value / total
        const dash = ratio * circumference
        const rotation = -90 + accumulatedAngle
        accumulatedAngle += ratio * 360

        return (
          <circle
            key={`${segment.color}-${index}`}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            strokeDasharray={`${dash} ${circumference}`}
            transform={`rotate(${rotation} ${center} ${center})`}
          />
        )
      })}
      <circle cx={center} cy={center} r={radius - strokeWidth / 2 - 4} fill="#fff" />
    </svg>
  )
}

export default function PracticeWordChart({
  level,
  bookType,
  summaries,
  totalWords,
}: {
  level: PracticeLevel
  bookType: PracticeBookType
  /** TO-DO: API — 숙련도별 집계 데이터 */
  summaries: PracticeStatusSummary[]
  totalWords: number
}) {
  const centerText = useMemo(
    () => getPracticeChartCenterText(level, bookType, totalWords),
    [level, bookType, totalWords],
  )

  const segments = summaries.map((item) => ({
    value: item.count,
    color: item.color,
  }))

  return (
    <PracticeChartSectionStyle>
      <div className="donut-wrap">
        <MultiSegmentDonut segments={segments} />
        <div className="donut-center">
          <span className="level">{centerText.level}</span>
          <span className="book-type">{centerText.bookTypeLabel}</span>
          <span className="word-count">+ {centerText.totalWords} 단어</span>
        </div>
      </div>
      <div className="legend">
        {summaries.map((item) => (
          <div key={item.status} className="legend-item">
            <span className="dot" style={{ backgroundColor: item.color }} />
            <span className="label">
              {item.label} ({item.count})
            </span>
          </div>
        ))}
      </div>
    </PracticeChartSectionStyle>
  )
}
