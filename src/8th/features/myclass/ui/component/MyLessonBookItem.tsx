import { useIsPhone } from '@/8th/application/context/ScreenModeContext'
import { Assets } from '@/8th/assets/asset-library'
import { MyLessonBookItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import { StartButton } from '@/8th/shared/ui/Buttons'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'

interface MyLessonBookItemProps {
  ref?: React.RefObject<HTMLDivElement | null>
  no: number
  title: string
  imgUrl: string
  passCount: number
  point: number
  color: string
  isCurrent?: boolean
  isPreK?: boolean
  preKCharacter?: string
  isMovieAvailable?: boolean
  onStart?: () => void
  onImageLoaded?: (isSuccess: boolean) => void
  onContentClick?: () => void
}

export default function MyLessonBookItem({
  ref,
  no,
  title,
  imgUrl,
  passCount,
  point,
  color,
  isCurrent,
  isPreK,
  preKCharacter,
  isMovieAvailable,
  onStart,
  onImageLoaded,
  onContentClick,
}: MyLessonBookItemProps) {
  const isPhone = useIsPhone()

  const isCompleted = point <= 0
  let pointText = `${NumberUtils.toDecimalPoint(point)}P`
  if (isCompleted) {
    pointText = 'Good Job 👍'
  }

  const onImageLoadEvent = onImageLoaded
    ? () => {
        onImageLoaded(true)
      }
    : undefined
  const onImageErrorEvent = onImageLoaded
    ? () => {
        onImageLoaded(false)
      }
    : undefined

  return (
    <MyLessonBookItemStyle
      ref={ref}
      className={isCurrent ? 'current-book' : ''}
      isPreK={isPreK}
      isCurrent={isCurrent}
      isCompleted={passCount > 0}
      color={color}>
      <div
        className={`book-container ${
          isPreK ? 'mobile-prek-container' : 'mobile-book-container'
        }`}>
        {passCount === 0 && <div className="book-number">{no}</div>}
        {passCount === 1 && <div className="completed-mark" />}
        {passCount >= 2 && <div className="completed-mark-twin" />}
        <div className={isPreK ? 'prek-thumbnail' : 'book-cover'}>
          <div className="image-wrapper" onClick={onContentClick}>
            <div className="study-label">eBook</div>
            <Image
              src={imgUrl}
              alt="thumbnail"
              className="image"
              width={125}
              height={180}
              onLoad={onImageLoadEvent}
              onError={onImageErrorEvent}
            />
            {preKCharacter && (
              <Image
                src={getPreKCharacterBadgeAsset(preKCharacter)}
                className={'character'}
                alt={preKCharacter}
                width={42}
                height={42}
              />
            )}
            {isMovieAvailable && (
              <Image
                src={Assets.Icon.playRed}
                className={'movie-icon'}
                alt={'movie-icon'}
                width={42}
                height={42}
              />
            )}
          </div>
        </div>
        <div className="title-container">
          <div className="title-box">
            <div className="title" onClick={onContentClick}>
              {title}
            </div>
            <div className={`point ${isCompleted ? 'good-job' : ''}`}>
              {pointText}
            </div>
          </div>
          <div>
            {isPhone ? (
              <></>
            ) : (
              <>
                {isCurrent && (
                  <StartButton onClick={onStart} className="animated" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {isPhone ? (
        <div style={{ width: '100%' }}>
          {isCurrent && (
            <StartButton
              onClick={onStart}
              isMobile
              className="mobile-animated mobile-activated"
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </MyLessonBookItemStyle>
  )
}

function getPreKCharacterBadgeAsset(character: string) {
  const badge =
    Assets.DailyRG.Badge[character as keyof typeof Assets.DailyRG.Badge]
  return badge
}
