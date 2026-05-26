import activityCategoryIconAlphabet from '@/8th/assets/images/sample/activity_category_icon_alphabet.png'
import { MovieContentsListHeaderStyle } from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'

export default function MovieContentsListHeader() {
  return (
    <MovieContentsListHeaderStyle>
      <div className="movie-contents-list-header-left">
        <Image
          src={activityCategoryIconAlphabet}
          alt="Movie Thumbnail"
          width={150}
          height={100}
        />
      </div>
      <div className="movie-contents-list-header-right">
        <div className="movie-contents-list-header-right-title">Dodo Dance</div>
        <div className="movie-contents-list-header-right-subtitle">
          도도와 친구들이 신나는 영어 동요에 맞춰 춤을 춰요. 함께 노래를 부르고
          율동하면 영어에 더 친숙해질 수 있어요.
        </div>
      </div>
    </MovieContentsListHeaderStyle>
  )
}
