'use client'

import { useEffect, useRef } from 'react'

function configureInlineMutedPlayback(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
  video.setAttribute('x5-playsinline', '')
  video.setAttribute('x5-video-player-type', 'h5')
  video.disablePictureInPicture = true
}

export default function LevelSelectVideo({
  videoSrc,
  isActive,
}: {
  videoSrc: string
  isActive: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    configureInlineMutedPlayback(video)

    const playInline = () => {
      configureInlineMutedPlayback(video)
      if (!isActive) return
      void video.play().catch(() => {})
    }

    video.addEventListener('loadedmetadata', playInline)

    if (isActive) {
      video.currentTime = 0
      void video.play().catch(() => {})
    } else {
      video.pause()
    }

    return () => {
      video.removeEventListener('loadedmetadata', playInline)
    }
  }, [isActive, videoSrc])

  return (
    <div className="video-placeholder">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={isActive}
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
      />
    </div>
  )
}
