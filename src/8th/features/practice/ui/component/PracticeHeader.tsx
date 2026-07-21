import { Assets } from '@/8th/assets/asset-library'
import { PRACTICE_HEADER } from '@/8th/features/practice/model/practice-demo'
import { PracticeHeaderStyle } from '@/8th/shared/styled/FeaturesStyled'
import { StartButton } from '@/8th/shared/ui/Buttons'
import Image from 'next/image'

export default function PracticeHeader({
  onStartClick,
}: {
  /** TO-DO: API — 복습 세션 시작 핸들러 연동 */
  onStartClick?: () => void
}) {
  return (
    <PracticeHeaderStyle>
      <div className="practice-header-text">
        <p className="practice-header-title">{PRACTICE_HEADER.title}</p>
        <p className="practice-header-subtitle">{PRACTICE_HEADER.subtitle}</p>
        <StartButton
          label={PRACTICE_HEADER.startButtonLabel}
          onClick={onStartClick}
          className="animated practice-start-button"
        />
      </div>
      <div className="practice-header-image">
        <Image
          src={Assets.Image.PracticeDodo}
          alt=""
          width={140}
          height={140}
          priority
        />
      </div>
    </PracticeHeaderStyle>
  )
}
