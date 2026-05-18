'use client'

import { Assets } from '@/8th/assets/asset-library'
import type { ClassItem } from '@/8th/features/myclass/model/class-list'
import { ClassCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'
import { useState } from 'react'

const BOOK_COVER_BASE_URL =
  'https://wcfresource.a1edu.com/newsystem/image/br/covernew1/'

const CHARACTER_IMAGE_BASE_URL =
  'https://wcfresource.a1edu.com/newsystem/image/character/dodofriends/'

function BookCoverLayer({
  variant,
  src,
  alt,
}: {
  variant: 'back' | 'front'
  src: string
  alt: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [aspectRatio, setAspectRatio] = useState('5 / 7')

  const coverWidthPx = variant === 'back' ? 88 : 98

  return (
    <div className={`book-card book-card--${variant}`}>
      <div className="book-cover-wrap" style={{ aspectRatio }}>
        <div
          className={`book-cover-skeleton-slot${loaded ? ' is-done' : ''}`}
          aria-hidden
        />
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${coverWidthPx}px`}
          className={`book-cover-img${loaded ? ' is-loaded' : ''}`}
          onLoadingComplete={(img) => {
            setLoaded(true)
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
              setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`)
            }
          }}
        />
      </div>
    </div>
  )
}

type ClassCardProps = {
  classItem: ClassItem
  onClick?: () => void
}

export default function ClassCard({ classItem, onClick }: ClassCardProps) {
  const {
    title,
    characterImage,
    completedCount,
    totalCount,
    description,
    bookCover,
  } = classItem
  const isCompleted = totalCount > 0 && completedCount === totalCount

  return (
    <ClassCardStyle
      isCompleted={isCompleted}
      $interactive={Boolean(onClick)}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}>
      {isCompleted && (
        <Image
          className="completed-check"
          src={Assets.Icon.Study.checkMarkGold}
          alt=""
          width={40}
          height={40}
        />
      )}
      <div className="class-info">
        <div className="character-image">
          <Image
            src={`${CHARACTER_IMAGE_BASE_URL}${characterImage}`}
            alt=""
            width={100}
            height={100}
          />
        </div>
        <div className="content">
          <div className="title">{title}</div>
          <div className="count">
            {completedCount}/{totalCount}
          </div>
          <div className="description">{description}</div>
        </div>
      </div>
      <div className="book-image">
        <div className="book-stack">
          <div className="book-stack-spacer" aria-hidden />
          <BookCoverLayer
            variant="back"
            src={`${BOOK_COVER_BASE_URL}${bookCover.back}`}
            alt=""
          />
          <BookCoverLayer
            variant="front"
            src={`${BOOK_COVER_BASE_URL}${bookCover.front}`}
            alt=""
          />
        </div>
      </div>
    </ClassCardStyle>
  )
}
