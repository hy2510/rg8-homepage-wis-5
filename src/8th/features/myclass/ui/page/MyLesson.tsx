'use client'

import { Assets } from '@/8th/assets/asset-library'
import CalendarModalDnf from '@/8th/features/achieve/ui/modal/CalendarModalDnf'
import {
  MY_LESSON_GROUPS,
  MY_LESSON_TODAY_SECTION,
  MY_LESSON_UPCOMING_DAYS,
} from '@/8th/features/myclass/model/my-lesson-demo'
import {
  MyLessonStyle,
  QuickJumpButtonStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, Gap, TextStyle } from '@/8th/shared/ui/Misc'
import SITE_PATH from '@/app/site-path'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import MyLessonBookItem from '../component/MyLessonBookItem'
import MyLessonHeader from '../component/MyLessonHeader'
import MyLessonSection from '../component/MyLessonSection'

const SCROLL_FOCUS_OFFSET_BELOW_CENTER = 30

export default function MyLessonHome() {
  const router = useRouter()
  const focusTargetRef = useRef<HTMLDivElement>(null)
  const [isItemHeightCatched, setItemHeightCatched] = useState(false)
  const [scrollRetryCount, setScrollRetryCount] = useState(0)
  const [jumpButtonState, setJumpButtonState] = useState<
    'up' | 'down' | undefined
  >('down')
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false)

  const isDataReady = true

  useLayoutEffect(() => {
    const prevScrollRestoreVal = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    setItemHeightCatched(false)
    setScrollRetryCount(0)

    return () => {
      window.history.scrollRestoration = prevScrollRestoreVal
    }
  }, [])

  const currentTargetInfo = useMemo(() => {
    if (!isItemHeightCatched) {
      return undefined
    }

    const element = focusTargetRef.current
    if (!element) {
      return undefined
    }

    const elementBox = element.getBoundingClientRect()
    const style = window.getComputedStyle(element)

    const targetElementTop = window.scrollY + elementBox.top

    const boxHeight =
      elementBox.height +
      (parseInt(style.marginTop ?? '0') ?? 0) +
      (parseInt(style.marginBottom ?? '0') ?? 0)

    const targetElementCenter = targetElementTop + boxHeight / 2

    const moveYCenter =
      targetElementCenter -
      window.innerHeight / 2 -
      SCROLL_FOCUS_OFFSET_BELOW_CENTER

    return {
      itemHeight: boxHeight,
      destinationY: moveYCenter,
    }
  }, [isItemHeightCatched])

  const moveToFocusTarget = useCallback(
    (behavior: 'instant' | 'smooth' | 'none') => {
      if (behavior === 'none' || !currentTargetInfo?.destinationY) {
        return false
      }
      if (!isDataReady || !focusTargetRef.current) {
        return false
      }
      try {
        window.scrollTo({
          top: currentTargetInfo.destinationY,
          behavior: behavior,
        })
        return true
      } catch (error) {
        console.error('Scroll failed:', error)
        return false
      }
    },
    [currentTargetInfo?.destinationY, isDataReady],
  )

  useEffect(() => {
    if (!isDataReady || !focusTargetRef.current || isItemHeightCatched) {
      return
    }

    const timeoutId = setTimeout(() => {
      if (focusTargetRef.current && !isItemHeightCatched) {
        setItemHeightCatched(true)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [isDataReady, isItemHeightCatched])

  useEffect(() => {
    if (!isDataReady || !focusTargetRef.current) {
      return
    }

    if (currentTargetInfo?.destinationY === undefined) {
      if (scrollRetryCount < 5) {
        const retryTimeoutId = setTimeout(() => {
          setScrollRetryCount((prev) => prev + 1)
        }, 500)
        return () => clearTimeout(retryTimeoutId)
      }
      return
    }

    const timeoutId = setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const success = moveToFocusTarget('smooth')
          if (!success && scrollRetryCount < 5) {
            setTimeout(() => {
              setScrollRetryCount((prev) => prev + 1)
            }, 500)
          }
        })
      })
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [
    moveToFocusTarget,
    currentTargetInfo?.destinationY,
    isDataReady,
    scrollRetryCount,
  ])

  useEffect(() => {
    if (!currentTargetInfo?.itemHeight || !currentTargetInfo?.destinationY) {
      return
    }
    const scrollWatcher = () => {
      const itemHeight = currentTargetInfo.itemHeight
      const destinationY = currentTargetInfo.destinationY
      const scrollY = window.scrollY
      if (scrollY < destinationY - itemHeight * 1.5) {
        if (jumpButtonState !== 'down') {
          setJumpButtonState('down')
        }
      } else if (scrollY > destinationY + itemHeight * 1.5) {
        if (jumpButtonState !== 'up') {
          setJumpButtonState('up')
        }
      } else {
        if (jumpButtonState !== undefined) {
          setJumpButtonState(undefined)
        }
      }
    }
    window.addEventListener('scroll', scrollWatcher, { passive: true })
    return () => {
      window.removeEventListener('scroll', scrollWatcher)
    }
  }, [
    jumpButtonState,
    currentTargetInfo?.itemHeight,
    currentTargetInfo?.destinationY,
  ])

  return (
    <>
      <MyLessonStyle>
        <MyLessonHeader
          onCalendarButtonClick={() => setCalendarModalOpen(true)}
        />

        <MyLessonSection
          title={MY_LESSON_TODAY_SECTION.title}
          completedCount={MY_LESSON_TODAY_SECTION.completedCount}
          totalCount={MY_LESSON_TODAY_SECTION.totalCount}
          isActive={true}
          bgColor={MY_LESSON_TODAY_SECTION.bgColor}
          progressColor={MY_LESSON_TODAY_SECTION.progressColor}
          onSectionClick={() => {
            router.push(
              `${SITE_PATH.DODON_FRIENDS.MY_LESSON_DAY}?day=${MY_LESSON_TODAY_SECTION.id}`,
            )
          }}
        />

        {MY_LESSON_GROUPS.map((group) => (
          <>
            <Gap size={15} />
            <BoxStyle
              display="flex"
              flexDirection="row"
              gap={5}
              alignItems="center"
              padding="5px 2px">
              <TextStyle fontColor="secondary">•</TextStyle>
              <TextStyle fontSize="large">
                {group.classes
                  ? `${group.classes} ${group.title}`
                  : group.title}
              </TextStyle>
            </BoxStyle>
            <div>
              {group.lessons.map((lesson) => (
                <MyLessonBookItem
                  key={`${group.title}-${lesson.no}`}
                  ref={lesson.isCurrent ? focusTargetRef : undefined}
                  no={lesson.no}
                  title={lesson.title}
                  imgUrl={lesson.imgUrl}
                  passCount={lesson.passCount}
                  point={lesson.point}
                  color={MY_LESSON_TODAY_SECTION.accentColor}
                  isCurrent={lesson.isCurrent}
                  isPreK={lesson.isPreK ?? true}
                  preKCharacter={lesson.preKCharacter}
                  isMovieAvailable={lesson.isMovieAvailable}
                  onImageLoaded={
                    lesson.isCurrent && !isItemHeightCatched
                      ? (isSuccess) => {
                          if (isSuccess) {
                            setItemHeightCatched(true)
                          } else if (scrollRetryCount < 3) {
                            setTimeout(() => {
                              setScrollRetryCount((prev) => prev + 1)
                            }, 500)
                          }
                        }
                      : undefined
                  }
                />
              ))}
            </div>
          </>
        ))}

        <div>
          {MY_LESSON_UPCOMING_DAYS.map((day) => (
            <MyLessonSection
              key={day.day}
              title={day.day}
              completedCount={0}
              totalCount={3}
              isActive={false}
              bgColor="#E9EDF3"
              progressColor="var(--color-gray-strong)"
              onSectionClick={() => {}}
            />
          ))}
        </div>
      </MyLessonStyle>

      <Gap size={100} />

      {jumpButtonState && isDataReady && (
        <QuickJumpButtonStyle
          isVisible={true}
          onClick={() => {
            const success = moveToFocusTarget('smooth')
            if (!success && currentTargetInfo?.destinationY) {
              setTimeout(() => {
                moveToFocusTarget('smooth')
              }, 300)
            }
          }}>
          {jumpButtonState === 'up' && (
            <Image
              src={Assets.Icon.arrowUpBlue}
              alt="arrow up"
              width={30}
              height={30}
            />
          )}
          {jumpButtonState === 'down' && (
            <Image
              src={Assets.Icon.arrowDownBlue}
              alt="arrow down"
              width={30}
              height={30}
            />
          )}
        </QuickJumpButtonStyle>
      )}
      {isCalendarModalOpen && (
        <CalendarModalDnf onCloseModal={() => setCalendarModalOpen(false)} />
      )}
    </>
  )
}
