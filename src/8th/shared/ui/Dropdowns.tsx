'use client'

import { Assets } from '@/8th/assets/asset-library'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useMemo, useRef } from 'react'
import {
  DropdownContainerStyle,
  DropdownContainerStyleProps,
  DropdownGnbIconRowStyle,
  DropdownItemStyle,
} from '../styled/SharedStyled'
import { BoxStyle } from './Misc'

/**
 * 드롭다운 메뉴
 */

interface DropdownMenuProps extends Pick<
  DropdownContainerStyleProps,
  'position' | 'viewGrid'
> {
  items: {
    text: string
    subText?: string
    icon?: StaticImageData
    onClick?: () => void
  }[]
  isOpen?: boolean
  onClose?: () => void
  showArrow?: boolean
  currentIndex?: number
}

export default function DropdownMenu({
  items,
  isOpen = false,
  onClose,
  position = 'bottomLeft',
  showArrow = true,
  viewGrid = false,
  currentIndex,
}: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { gnbItems, linkItems } = useMemo(() => {
    const gnbItems: {
      item: DropdownMenuProps['items'][number]
      index: number
    }[] = []
    const linkItems: {
      item: DropdownMenuProps['items'][number]
      index: number
    }[] = []

    items.forEach((item, index) => {
      if (item.icon) {
        gnbItems.push({ item, index })
      } else {
        linkItems.push({ item, index })
      }
    })

    return { gnbItems, linkItems }
  }, [items])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <DropdownContainerStyle
      position={position}
      ref={dropdownRef}
      viewGrid={viewGrid}>
      {linkItems.map(({ item, index }) => (
        <DropdownItemStyle
          key={index}
          onClick={(event) => {
            event.stopPropagation()
            item.onClick?.()
            onClose?.()
          }}
          viewGrid={viewGrid}>
          <BoxStyle
            display="flex"
            flexDirection="column"
            alignItems="flex-start">
            <div className="link-text">{item.text}</div>
            <div className="sub-text">{item.subText}</div>
          </BoxStyle>
          {showArrow && (
            <div className="icon">
              <Image
                src={Assets.Icon.arrowUpRightGray}
                alt="arrow up right"
                width={10}
                height={10}
              />
            </div>
          )}
          {index === currentIndex && (
            <div className="current">
              <Image
                src={Assets.Icon.checkLightBlue}
                alt="check"
                width={16}
                height={16}
              />
            </div>
          )}
        </DropdownItemStyle>
      ))}
      {gnbItems.length > 0 && (
        <DropdownGnbIconRowStyle>
          {gnbItems.map(({ item, index }) => (
            <button
              key={index}
              type="button"
              className="gnb-menu-item"
              onClick={(event) => {
                event.stopPropagation()
                item.onClick?.()
                onClose?.()
              }}>
              <div className="item-icon">
                <Image src={item.icon!} alt="" width={34} height={34} />
              </div>
              <div className="gnb-menu-item-text">{item.text}</div>
              {index === currentIndex && (
                <div className="current">
                  <Image
                    src={Assets.Icon.checkLightBlue}
                    alt="check"
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </button>
          ))}
        </DropdownGnbIconRowStyle>
      )}
    </DropdownContainerStyle>
  )
}
