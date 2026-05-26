'use client'

import { useCustomerConfiguration } from '@/8th/application/context/CustomerContext'
import { useIsTabletLarge } from '@/8th/application/context/ScreenModeContext'
import { Assets } from '@/8th/assets/asset-library'
import DodonFriendsCalendarModal from '@/8th/features/achieve/ui/modal/CalendarModalDnf'
import LevelTestInfoModal from '@/8th/features/student/ui/modal/LevelTestInfoModal'
import DropdownMenu from '@/8th/shared/ui/Dropdowns'
import { getAccountPaths } from '@/8th/shared/utils/account-paths'
import SITE_PATH from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  DisplayNoneStyle,
  GlobalNavBarStyle,
  MenuItemStyle,
} from '../styled/SharedStyled'
import { openWindow } from '../utils/open-window'
import { Gap } from './Misc'
import AppUserGuideModal from './modal/app-user-guide/AppUserGuideModal'

/**
 * RG TRACK ... More 까지
 */

const MP3_URL = {
  dodo: 'https://util.readinggate.com/Library/DodoABCWorkSheetMP3Info',
  pk: 'https://wcfresource.a1edu.com/NewSystem/AppMobile/webview/randing/prek_workbook_mp3/',
}

export default function GlobalNavBarDnf() {
  // @Language 'common'
  const { t } = useTranslation()

  const { menu } = useCustomerConfiguration()

  const maketingEventTracker = useTrack()

  const isGnbBottom = useIsTabletLarge('smaller')

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const [isLevelTestOpen, setLevelTestOpen] = useState(false)
  const [isShowAppUserGuideModal, setShowAppUserGuideModal] = useState(false)

  const pathname = usePathname()
  const accountPaths = getAccountPaths(pathname)

  const router = useRouter()

  const dropdownItems: {
    text: string
    icon?: StaticImageData
    onClick: () => void
  }[] = []
  if (isGnbBottom && menu.dubbing.open) {
    dropdownItems.push({
      text: 'DUBBING',
      icon: Assets.Icon.Gnb.dubbing,
      onClick: () => {
        maketingEventTracker.eventAction('GNB 탭 클릭', {
          version: '8th',
          tab_name: 'Dubbing',
        })
        router.push(SITE_PATH.DODON_FRIENDS.DUBBING)
      },
    })
  }

  if (isGnbBottom && menu.movies.open) {
    dropdownItems.push({
      text: 'MOVIES',
      icon: Assets.Icon.Gnb.movies,
      onClick: () => {
        maketingEventTracker.eventAction('GNB 탭 클릭', {
          version: '8th',
          tab_name: 'Movies',
        })
        router.push(SITE_PATH.DODON_FRIENDS.MOVIES)
      },
    })
  }

  if (menu.levelTest.open) {
    dropdownItems.push({
      text: 'Level Test',
      onClick: () => setLevelTestOpen(true),
    })
  }

  if (menu.activity.tryAgain.open) {
    dropdownItems.push({
      text: 'Try Again',
      onClick: () => {
        maketingEventTracker.eventAction('GNB 탭 클릭', {
          version: '8th',
          tab_name: 'Try Again',
        })
        router.push(SITE_PATH.DODON_FRIENDS.TRYAGAIN)
      },
    })
  }
  if (menu.account.setting.open) {
    dropdownItems.push({
      text: 'Setting',
      onClick: () => {
        setIsDropdownOpen(false)
        maketingEventTracker.eventAction('GNB 탭 클릭', {
          version: '8th',
          tab_name: 'Setting',
        })
        router.push(accountPaths.accountInfoSetting)
      },
    })
  }
  if (menu.pkWorkbookMp3.open && menu.eb.readingLevel.level.prekClassic.open) {
    dropdownItems.push({
      text: 'PK Classic Workbook MP3',
      onClick: () => {
        maketingEventTracker.eventAction('GNB 탭 클릭', {
          version: '8th',
          tab_name: 'PK Classic Workbook MP3',
        })
        openWindow(MP3_URL.pk, {
          external: true,
          target: '_blank',
          feature: 'noopener, noreferrer',
        })
      },
    })
  }
  // if (menu.rank.open) {
  //   dropdownItems.push({
  //     text: t('t8th229'),
  //     onClick: () => router.push(SITE_PATH.STUDENT_8TH.RANKING),
  //   })
  // }

  // 이용 가이드 보기 안내 메뉴 추가
  // if (true) {
  //   dropdownItems.push({
  //     text: t('t8th317'),
  //     onClick: () => {
  //       maketingEventTracker.eventAction('GNB 탭 클릭', {
  //         version: '8th',
  //         tab_name: 'App User Guide',
  //       })
  //       setShowAppUserGuideModal(true)
  //     },
  //   })
  // }

  if (isGnbBottom) {
    // 더빙룸 메뉴 제거
    // dropdownItems.splice(3, 0, {
    //   text: 'Dubbing',
    //   onClick: () => router.push(SITE_PATH.NW82.EB_WORKBOOK),
    // })
  }

  return (
    <GlobalNavBarStyle $zIndex={isDropdownOpen ? 1000 : 100}>
      <div className="logo-container">
        <Link
          href={'#'}
          onClick={() => (window.location.href = SITE_PATH.HOME.MAIN)}>
          <Image
            src={Assets.Image.AppLogoDnf}
            alt="App Logo"
            className="dnf-logo"
          />
        </Link>
      </div>

      <div className="menu-container">
        {menu.dailyRg.open && (
          <MenuItem
            icon={Assets.Icon.Gnb.myClass}
            text="MY CLASS"
            isActive={pathname.includes(SITE_PATH.DODON_FRIENDS.MY_CLASS)}
            linkUrl={SITE_PATH.DODON_FRIENDS.MY_LESSON}
          />
        )}

        {(menu.eb.readingLevel.level.dodoAbc.open ||
          menu.eb.readingLevel.level.prekClassic.open ||
          menu.eb.open ||
          menu.pb.open) && (
          <MenuItem
            icon={Assets.Icon.Gnb.library}
            text="LIBRARY"
            isActive={pathname.includes(SITE_PATH.DODON_FRIENDS.LIBRARY)}
            linkUrl={SITE_PATH.DODON_FRIENDS.LIBRARY}
          />
        )}

        {/* 
        {menu.eb.open && (
          <MenuItem
            icon={Assets.Icon.Gnb.ebooks}
            text="E-BOOK"
            isActive={pathname.includes(SITE_PATH.NW82.EB)}
            linkUrl={SITE_PATH.NW82.EB}
          />
        )}
        {menu.pb.open && (
          <MenuItem
            icon={Assets.Icon.Gnb.bookQuiz}
            text="P-BOOK QUIZ"
            isActive={pathname.includes(SITE_PATH.NW82.PB)}
            linkUrl={SITE_PATH.NW82.PB}
          />
        )} */}

        {menu.activity.open && (
          <MenuItem
            icon={Assets.Icon.Gnb.myActivity}
            text="MY PAGE"
            isActive={pathname.includes(SITE_PATH.DODON_FRIENDS.ACTIVITY)}
            linkUrl={SITE_PATH.DODON_FRIENDS.ACTIVITY}
          />
        )}

        {menu.calendar.open && (
          <DisplayNoneStyle $hideOnLabtopS>
            <div className="divider" />

            <Gap size={10} />
            <MenuItem
              icon={Assets.Icon.Gnb.dubbing}
              text="DUBBING"
              isActive={pathname.includes(SITE_PATH.DODON_FRIENDS.DUBBING)}
              linkUrl={SITE_PATH.DODON_FRIENDS.DUBBING}
            />
            <Gap size={10} />
            <MenuItem
              icon={Assets.Icon.Gnb.movies}
              text="MOVIES"
              isActive={pathname.includes(SITE_PATH.DODON_FRIENDS.MOVIES)}
              linkUrl={SITE_PATH.DODON_FRIENDS.MOVIES}
            />
            <Gap size={10} />
            <div className="divider" />
            <Gap size={10} />
            {/* <MenuItemCalendar
              text="CALENDAR"
              onClick={() => {
                maketingEventTracker.eventAction('GNB 탭 클릭', {
                  version: '8th',
                  tab_name: 'Calendar',
                })
                setCalendarOpen(true)
              }}
            /> */}
          </DisplayNoneStyle>
        )}

        {dropdownItems.length > 0 && (
          <MenuItem
            icon={Assets.Icon.Gnb.more}
            text="MORE"
            isActive={false}
            isDropdown={true}
            onDropdownToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            isOpen={isDropdownOpen}
            dropdownItems={dropdownItems}
          />
        )}
      </div>
      {isCalendarOpen && (
        <DodonFriendsCalendarModal
          onCloseModal={() => setCalendarOpen(false)}
        />
      )}
      {isLevelTestOpen && (
        <LevelTestInfoModal onClose={() => setLevelTestOpen(false)} />
      )}
      {isShowAppUserGuideModal && (
        <AppUserGuideModal
          onCloseModal={() => setShowAppUserGuideModal(false)}
        />
      )}
    </GlobalNavBarStyle>
  )
}

interface MenuItemProps {
  icon?: StaticImageData
  text?: string
  isActive?: boolean
  isDropdown?: boolean
  onDropdownToggle?: () => void
  isOpen?: boolean
  dropdownItems?: {
    text: string
    icon?: StaticImageData
    onClick: () => void
  }[]
  linkUrl?: string
  onClick?: () => void
}

function MenuItem({
  icon,
  text,
  isActive,
  isDropdown,
  onDropdownToggle,
  isOpen,
  dropdownItems,
  linkUrl,
  onClick,
}: MenuItemProps) {
  const maketingEventTracker = useTrack()

  const isGnbBottom = useIsTabletLarge('smaller')

  const [dropDownPosition, setDropDownPosition] = useState<
    'topRight' | 'rightCenter' | 'rightBottom'
  >('topRight')

  useEffect(() => {
    let mediaQuery: MediaQueryList | undefined = undefined
    const handleChange = () => {
      if (mediaQuery && !isGnbBottom) {
        if (mediaQuery.matches) {
          setDropDownPosition('rightBottom')
        } else {
          setDropDownPosition('rightCenter')
        }
      }
    }

    if (window && isDropdown) {
      if (isGnbBottom) {
        setDropDownPosition('topRight')
      } else {
        const query = `(max-height: 699px)`
        mediaQuery = window.matchMedia(query)
        if (mediaQuery) {
          handleChange()
          mediaQuery.addEventListener('change', handleChange)
        }
      }
    }
    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [isDropdown, isGnbBottom])

  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (linkUrl) {
      maketingEventTracker.eventAction('GNB 탭 클릭', {
        version: '8th',
        tab_name: text,
      })
      router.push(linkUrl)
    } else if (isDropdown && onDropdownToggle) {
      onDropdownToggle()
    }
  }

  return (
    <MenuItemStyle
      className={isActive ? 'is-active' : ''}
      onClick={handleClick}>
      <div className="menu-item-icon">
        <Image
          src={icon as StaticImageData}
          alt={text || ''}
          width={34}
          height={34}
        />
      </div>

      <div className="menu-item-text">{text}</div>

      {isDropdown && isOpen && dropdownItems && (
        <DropdownMenu
          items={dropdownItems}
          isOpen={isOpen}
          onClose={() => {
            if (onDropdownToggle) {
              onDropdownToggle()
            }
          }}
          position={dropDownPosition}
        />
      )}
    </MenuItemStyle>
  )
}

function MenuItemCalendar({
  text,
  onClick,
}: {
  text: string
  onClick?: () => void
}) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const dayNumber = new Date().getDate()

  return (
    <MenuItemStyle onClick={handleClick}>
      <div
        className="menu-item-icon"
        style={{ position: 'relative', display: 'inline-block' }}>
        <Image
          src={Assets.Icon.Gnb.calendar}
          alt={text || ''}
          width={34}
          height={34}
        />
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 0,
            width: 34,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <span
            style={{
              color: '#8A2BE2',
              fontWeight: '900',
              padding: '0',
              fontSize: 11,
            }}>
            {dayNumber}
          </span>
        </div>
      </div>

      <div className="menu-item-text">{text}</div>
    </MenuItemStyle>
  )
}
