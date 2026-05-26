import { Assets } from '@/8th/assets/asset-library'
import { MoviesCategoriesHeaderStyle } from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'

export default function MoviesCategoriesHeader() {
  return (
    <MoviesCategoriesHeaderStyle>
      <div className="dubbing-categories-header-text">
        <p className="dubbing-categories-header-title">Dodo&apos;s Theater</p>
        <p className="dubbing-categories-header-subtitle">
          Watch and enjoy exciting stories!
        </p>
      </div>
      <div className="dubbing-categories-header-image">
        <Image
          src={Assets.Image.MovieDodo}
          alt="Dodo watching movies"
          width={140}
          height={140}
          priority
        />
      </div>
    </MoviesCategoriesHeaderStyle>
  )
}
