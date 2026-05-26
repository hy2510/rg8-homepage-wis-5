'use client'

import { Assets } from '@/8th/assets/asset-library'
import movieThumbnailSample from '@/8th/assets/images/sample/movies_item_sample.png'
import type { MovieItem } from '@/8th/features/movies/model/movie-item'
import MovieVideoModal from '@/8th/features/movies/ui/modal/MovieVideoModal'
import Image from 'next/image'
import { useState } from 'react'

const DEMO_MOVIE_VIDEO_URL =
  'https://wcfresource.a1edu.com/newsystem/moviebook/dodoabc/alphabet_intro.mp4'

export default function MovieCard({ item }: { item: MovieItem }) {
  const [isVideoOpen, setVideoOpen] = useState(false)
  const passCount = item.castRows.filter((row) => !!row.completedDate).length

  const openVideo = () => setVideoOpen(true)

  return (
    <>
      <div
        className="movie-card"
        role="button"
        tabIndex={0}
        aria-label={item.title}
        onClick={openVideo}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openVideo()
          }
        }}>
        <div className="movie-card-thumbnail">
          <Image src={movieThumbnailSample} alt="" width={200} height={120} />
          <div className="badges">
            {passCount === 1 && (
              <Image
                src={Assets.Icon.Study.checkMarkGold}
                alt="badge"
                width={40}
                height={40}
              />
            )}
            {passCount >= 2 && (
              <Image
                src={Assets.Icon.Study.checkMarkGoldTwin}
                alt="badge"
                width={70}
                height={40}
              />
            )}
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <MovieVideoModal
          videoUrl={item.videoUrl ?? DEMO_MOVIE_VIDEO_URL}
          poster={movieThumbnailSample.src}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </>
  )
}
