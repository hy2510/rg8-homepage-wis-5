'use client'

import { useLockBodyScroll } from '@/8th/application/context/ScrollLockContext'
import { Assets } from '@/8th/assets/asset-library'
import { MovieVideoModalStyle } from '@/8th/shared/styled/FeaturesStyled'
import ModalPortal from '@/8th/shared/ui/ModalPortal'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

type MovieVideoModalProps = {
  videoUrl: string
  poster?: string
  onClose: () => void
}

export default function MovieVideoModal({
  videoUrl,
  poster,
  onClose,
}: MovieVideoModalProps) {
  useLockBodyScroll()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }
    void video.play().catch(() => {})

    return () => {
      video.pause()
      video.currentTime = 0
    }
  }, [videoUrl])

  return (
    <ModalPortal>
      <MovieVideoModalStyle role="dialog" aria-modal="true" onClick={onClose}>
        <div
          className="movie-video-modal-content"
          onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="movie-video-modal-close"
            aria-label="Close video"
            onClick={onClose}>
            <Image src={Assets.Icon.deleteWhite} alt="" width={32} height={32} />
          </button>
          <video
            ref={videoRef}
            src={videoUrl}
            poster={poster}
            controls
            playsInline
            disablePictureInPicture
            controlsList="nodownload noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </MovieVideoModalStyle>
    </ModalPortal>
  )
}
