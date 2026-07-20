'use client'

import { Assets } from '@/8th/assets/asset-library'
import { LevelSelectCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import { StartButton } from '@/8th/shared/ui/Buttons'
import { TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'
import LevelSelectVideo from './LevelSelectVideo'
import {
  LEVEL_SELECT_LEVELS,
  type LevelSelectItem,
} from './level-select-contents'

export default function LevelSelectCard({
  levels = LEVEL_SELECT_LEVELS,
  onStart,
}: {
  levels?: LevelSelectItem[]
  onStart?: (level: string) => void
}) {
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0)

  const selectedLevel = levels[selectedLevelIndex]
  const prevLevel =
    selectedLevelIndex > 0 ? levels[selectedLevelIndex - 1] : null
  const nextLevel =
    selectedLevelIndex < levels.length - 1
      ? levels[selectedLevelIndex + 1]
      : null

  const selectLevel = (index: number) => {
    if (index < 0 || index >= levels.length) return
    setSelectedLevelIndex(index)
  }

  return (
    <LevelSelectCardStyle>
      <LevelSelectCarousel
        prevLevel={prevLevel}
        selectedLevel={selectedLevel}
        nextLevel={nextLevel}
        onSelectLevel={selectLevel}
        selectedLevelIndex={selectedLevelIndex}
      />

      <LevelSelectNav
        levels={levels}
        selectedLevelIndex={selectedLevelIndex}
        onSelectLevel={selectLevel}
      />

      <LevelSelectInfo level={selectedLevel} />

      <StartButton
        label="Start!"
        className="start-button animated"
        onClick={() => onStart?.(selectedLevel.level)}
      />
    </LevelSelectCardStyle>
  )
}

function LevelSelectCarousel({
  prevLevel,
  selectedLevel,
  nextLevel,
  selectedLevelIndex,
  onSelectLevel,
}: {
  prevLevel: LevelSelectItem | null
  selectedLevel: LevelSelectItem
  nextLevel: LevelSelectItem | null
  selectedLevelIndex: number
  onSelectLevel: (index: number) => void
}) {
  return (
    <div className="carousel">
      <div className="carousel-track">
        <div className="carousel-slot">
          {prevLevel ? (
            <div
              className="carousel-item side"
              onClick={() => onSelectLevel(selectedLevelIndex - 1)}>
              <LevelSelectVideo
                videoSrc={prevLevel.videoSrc}
                isActive={false}
              />
            </div>
          ) : (
            <div className="carousel-item side spacer" aria-hidden />
          )}
        </div>
        <div className="carousel-slot center">
          <div className="carousel-item active">
            <LevelSelectVideo videoSrc={selectedLevel.videoSrc} isActive />
          </div>
        </div>
        <div className="carousel-slot">
          {nextLevel ? (
            <div
              className="carousel-item side"
              onClick={() => onSelectLevel(selectedLevelIndex + 1)}>
              <LevelSelectVideo
                videoSrc={nextLevel.videoSrc}
                isActive={false}
              />
            </div>
          ) : (
            <div className="carousel-item side spacer" aria-hidden />
          )}
        </div>
      </div>
    </div>
  )
}

function LevelSelectNav({
  levels,
  selectedLevelIndex,
  onSelectLevel,
}: {
  levels: LevelSelectItem[]
  selectedLevelIndex: number
  onSelectLevel: (index: number) => void
}) {
  return (
    <div className="level-nav">
      <button
        type="button"
        className="level-nav-arrow"
        onClick={() => onSelectLevel(selectedLevelIndex - 1)}
        disabled={selectedLevelIndex === 0}
        aria-label="이전 레벨">
        <Image
          src={Assets.Icon.chevronLeftGray}
          alt=""
          width={24}
          height={24}
        />
      </button>
      <div className="level-tabs">
        {levels.map((level, index) => (
          <button
            key={level.level}
            type="button"
            className={`level-tab ${index === selectedLevelIndex ? 'active' : ''}`}
            onClick={() => onSelectLevel(index)}>
            {level.label1}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="level-nav-arrow"
        onClick={() => onSelectLevel(selectedLevelIndex + 1)}
        disabled={selectedLevelIndex === levels.length - 1}
        aria-label="다음 레벨">
        <Image
          src={Assets.Icon.chevronRightGray}
          alt=""
          width={24}
          height={24}
        />
      </button>
    </div>
  )
}

function LevelSelectInfo({ level }: { level: LevelSelectItem }) {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className="level-info">
      <TextStyle
        fontFamily="sans"
        fontWeight={700}
        fontColor="primary"
        fontSize="1.75em">
        {level.label2}
      </TextStyle>
      <TextStyle
        fontFamily="sans"
        fontWeight={500}
        fontColor="secondary"
        fontSize="var(--font-size-medium)">
        {t(level.gradeI18nKey)}
      </TextStyle>
      <TextStyle
        fontFamily="sans"
        fontWeight={500}
        fontColor="secondary"
        fontSize="var(--font-size-medium)">
        {t(level.descriptionI18nKey)}
      </TextStyle>
    </div>
  )
}
