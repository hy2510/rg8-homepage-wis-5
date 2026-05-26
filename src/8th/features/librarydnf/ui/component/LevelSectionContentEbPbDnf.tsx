'use client'

import { useIsPhone } from '@/8th/application/context/ScreenModeContext'
import { Gap } from '@/8th/shared/ui/Misc'
import { LevelSectionType } from '../levelSectionDataDnf'
import LevelItemDnf from './LevelSectionLevelItemDnf'

export default function LevelSectionContentEbPbDnf({
  section,
}: {
  section: LevelSectionType
}) {
  const hasLevels = section.levels.length > 0
  const isPhone = useIsPhone()
  const gapSize = isPhone ? 20 : 25

  if (!hasLevels) {
    return null
  }

  return (
    <>
      {section.levels.map((group, index) => (
        <LevelSectionBody key={`${section.section}-${index}`} gapSize={gapSize}>
          {group.items.map((level) => (
            <LevelItemDnf
              key={`${level.type}${level.level}-${level.title}`}
              type={level.type}
              level={level.level}
              title={level.title}
              bgColor={level.bgColor}
              fontColor={level.fontColor}
              completed={level.completed}
              href={level.href}
              imgSrc={level.imgSrc}
              total={level.total}
            />
          ))}
        </LevelSectionBody>
      ))}
    </>
  )
}

function LevelSectionBody({
  gapSize = 25,
  children,
}: {
  gapSize?: number
  children?: React.ReactNode
}) {
  return (
    <>
      <div className="level-container">{children}</div>
      <Gap size={gapSize} />
    </>
  )
}
