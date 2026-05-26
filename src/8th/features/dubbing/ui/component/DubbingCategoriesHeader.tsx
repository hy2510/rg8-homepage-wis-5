import { Assets } from '@/8th/assets/asset-library'
import { DubbingCategoriesHeaderStyle } from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'

export default function DubbingCategoriesHeader() {
  return (
    <DubbingCategoriesHeaderStyle>
      <div className="dubbing-categories-header-text">
        <p className="dubbing-categories-header-title">
          Dodo&apos;s Dubbing Room
        </p>
        <p className="dubbing-categories-header-subtitle">
          Speak up like a star in the video!
        </p>
      </div>
      <div className="dubbing-categories-header-image">
        <Image
          src={Assets.Image.DubbingDodo}
          alt="더빙 스튜디오"
          width={140}
          height={140}
          priority
        />
      </div>
    </DubbingCategoriesHeaderStyle>
  )
}
