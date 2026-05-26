'use client'

import activityCategoryIconAlphabet from '@/8th/assets/images/sample/activity_category_icon_alphabet.png'
import { MovieCategoriesStyle } from '@/8th/shared/styled/FeaturesStyled'
import { Gap } from '@/8th/shared/ui/Misc'
import SITE_PATH from '@/app/site-path'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import MoviesCategoriesHeader from '../component/MoviesCategoriesHeader'

type MovieCategory = {
  id: string
  title: string
  image: StaticImageData | string
}

const CATEGORY_ITEMS: MovieCategory[] = [
  {
    id: 'dodo-dance',
    title: 'Dodo Dance',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'dodo-the-clumsy-little-girl',
    title: 'DODO, the Clumsy Little Girl',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'nursery-rhyme',
    title: 'Nursery Rhyme',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'alphabet',
    title: 'Alphabet',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'word-song',
    title: 'Word Song',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'phonics',
    title: 'Phonics',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'phonics-time',
    title: 'Phonics Time',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'popcorn-friends',
    title: 'Popcorn Friends',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'halloween',
    title: 'Halloween',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'the-magic-star',
    title: 'The Magic Star',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'stories-with-friends',
    title: 'Stories with Friends',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'adventures-with-friends',
    title: 'Adventures with Friends',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'dodo-and-the-sea-lord',
    title: 'DODO and the Sea Lord',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'fairy-ella-transforms',
    title: 'Fairy Ella Transforms',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'dodo-and-the-missing-stars',
    title: 'DODO and the Missing Stars',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'dodo-to-the-rescue',
    title: 'DODO to the Rescue',
    image: activityCategoryIconAlphabet,
  },
  {
    id: 'theme-movies',
    title: 'Theme Movies',
    image: activityCategoryIconAlphabet,
  },
]

export default function MovieCategories() {
  return (
    <MovieCategoriesStyle>
      <MoviesCategoriesHeader />
      <MovieSection title="· Categories" items={CATEGORY_ITEMS} />
    </MovieCategoriesStyle>
  )
}

function MovieSection({
  title,
  items,
}: {
  title: string
  items: MovieCategory[]
}) {
  return (
    <section className="movie-section">
      <div className="movie-section-title">{title}</div>
      <div className="movie-grid">
        {items.map((item) => (
          <MovieCategoryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function MovieCategoryCard({ item }: { item: MovieCategory }) {
  const router = useRouter()

  return (
    <button
      className="movie-card"
      type="button"
      aria-label={item.title}
      onClick={() =>
        router.push(`${SITE_PATH.DODON_FRIENDS.MOVIES}/${item.id}`)
      }>
      <Image className="movie-card-image" src={item.image} alt="" fill />
    </button>
  )
}
