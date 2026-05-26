import { LevelBook } from '@/8th/features/achieve/model/level-books'
import SITE_PATH from '@/app/site-path'
import LevelUtils from '@/util/level-utils'
import { StaticImageData } from 'next/image'

export type SectionLevelDataType = {
  type: 'eb' | 'pb' | 'study' | 'game' | 'song'
  level: string
  title: string
  total: number
  completed: number
  imgSrc: string | StaticImageData
  bgColor: string
  fontColor: string
  href: string
}

export type LevelSectionType = {
  section: string
  levels: {
    group?: string
    items: SectionLevelDataType[]
  }[]
  todos?: {
    group?: string
    items: SectionLevelDataType[]
  }[]
}

const levelColor: Record<string, { color: string; fontColor: string }> = {
  ka: { color: '#FBCE2A', fontColor: '#fff' },
  kb: { color: '#FBB02C', fontColor: '#fff' },
  kc: { color: '#FA9231', fontColor: '#fff' },
  '1a': { color: '#F66A2A', fontColor: '#fff' },
  '1b': { color: '#F75E44', fontColor: '#fff' },
  '1c': { color: '#EE3649', fontColor: '#fff' },
  '2a': { color: '#ADC335', fontColor: '#fff' },
  '2b': { color: '#80C133', fontColor: '#fff' },
  '2c': { color: '#5EB14E', fontColor: '#fff' },
  '3a': { color: '#60B0AD', fontColor: '#fff' },
  '3b': { color: '#5AA4C6', fontColor: '#fff' },
  '3c': { color: '#5390D1', fontColor: '#fff' },
  '4a': { color: '#7C6DCC', fontColor: '#fff' },
  '4b': { color: '#9458C9', fontColor: '#fff' },
  '4c': { color: '#994FA3', fontColor: '#fff' },
  '5a': { color: '#9A7E4B', fontColor: '#fff' },
  '5b': { color: '#72542E', fontColor: '#fff' },
  '5c': { color: '#584024', fontColor: '#fff' },
  '6a': { color: '#707070', fontColor: '#fff' },
  '6b': { color: '#464545', fontColor: '#fff' },
  '6c': { color: '#262525', fontColor: '#fff' },
}

function isIncludeLevelGroup(
  group: 'Kto1' | '2to3' | '4to6',
  level: string,
): boolean {
  switch (group) {
    case 'Kto1': {
      const groupLevels = ['KA', 'KB', 'KC', '1A', '1B', '1C']
      return groupLevels.includes(level)
    }
    case '2to3': {
      const groupLevels = ['2A', '2B', '2C', '3A', '3B', '3C']
      return groupLevels.includes(level)
    }
    case '4to6': {
      const groupLevels = ['4A', '4B', '4C', '5A', '5B', '5C', '6A', '6B', '6C']
      return groupLevels.includes(level)
    }
    default:
      return false
  }
}

export function makeLevelItem(
  type: 'eb' | 'pb',
  level: LevelBook,
): SectionLevelDataType {
  const colorSet = levelColor[level.levelName.toLowerCase()]
  return {
    type: type,
    level: level.levelName,
    title: level.levelName,
    total: level.totalBooks,
    completed: level.completedBooks,
    imgSrc: getRandomCoverImage(type, level.levelName.toLowerCase()),
    bgColor: colorSet.color,
    fontColor: colorSet.fontColor,
    href:
      type === 'eb'
        ? `${SITE_PATH.DODON_FRIENDS.EB_LEVEL}/${level.levelName}`
        : `${SITE_PATH.DODON_FRIENDS.PB_LEVEL}/${level.levelName}`,
  }
}

export function makeLevelSectionType(
  group: 'Kto1' | '2to3' | '4to6',
  type: 'eb' | 'pb',
  levels: LevelBook[],
): LevelSectionType | undefined {
  const targetLevels = levels.filter((level) =>
    isIncludeLevelGroup(group, level.levelName),
  )

  if (targetLevels.length === 0) {
    return undefined
  }

  let sectionTitle = ''
  switch (group) {
    case 'Kto1':
      sectionTitle = 'Level K to 1'
      break
    case '2to3':
      sectionTitle = 'Level 2 to 3'
      break
    case '4to6':
      sectionTitle = 'Level 4 to 6'
      break
  }

  const data: LevelSectionType = {
    section: sectionTitle,
    levels: [
      {
        items: [...targetLevels.map((level) => makeLevelItem(type, level))],
      },
    ],
  }
  return data
}

let randomCoverImageSeed: number[] | undefined = undefined
export function getRandomCoverImage(type: 'eb' | 'pb', level: string) {
  let valueRange = {
    min: 1,
    max: 1,
  }
  switch (type) {
    case 'eb': {
      switch (level) {
        case 'ka':
          valueRange = { min: 1, max: 50 }
          break
        case 'kb':
          valueRange = { min: 1, max: 50 }
          break
        case 'kc':
          valueRange = { min: 1, max: 50 }
          break
        case '1a':
          valueRange = { min: 1, max: 50 }
          break
        case '1b':
          valueRange = { min: 301, max: 340 }
          break
        case '1c':
          valueRange = { min: 331, max: 360 }
          break
        case '2a':
          valueRange = { min: 301, max: 390 }
          break
        case '2b':
          valueRange = { min: 301, max: 380 }
          break
        case '2c':
          valueRange = { min: 301, max: 360 }
          break
        case '3a':
          valueRange = { min: 401, max: 470 }
          break
        case '3b':
          valueRange = { min: 301, max: 340 }
          break
        case '3c':
          valueRange = { min: 1, max: 25 }
          break
        case '4a':
          valueRange = { min: 301, max: 315 }
          break
        case '4b':
          valueRange = { min: 301, max: 320 }
          break
        case '4c':
          valueRange = { min: 301, max: 315 }
          break
        case '5a':
          valueRange = { min: 301, max: 310 }
          break
        case '5b':
          valueRange = { min: 301, max: 310 }
          break
        case '5c':
          valueRange = { min: 1, max: 5 }
          break
        case '6a':
          valueRange = { min: 301, max: 306 }
          break
        case '6b':
          valueRange = { min: 301, max: 301 }
          break
      }
      break
    }
    case 'pb': {
      switch (level) {
        case 'kc':
          valueRange = { min: 1, max: 94 }
          break
        case '1a':
          valueRange = { min: 1, max: 266 }
          break
        case '1b':
          valueRange = { min: 1, max: 257 }
          break
        case '1c':
          valueRange = { min: 1, max: 276 }
          break
        case '2a':
          valueRange = { min: 1, max: 320 }
          break
        case '2b':
          valueRange = { min: 1, max: 323 }
          break
        case '2c':
          valueRange = { min: 1, max: 252 }
          break
        case '3a':
          valueRange = { min: 1, max: 274 }
          break
        case '3b':
          valueRange = { min: 1, max: 195 }
          break
        case '3c':
          valueRange = { min: 4, max: 194 }
          break
        case '4a':
          valueRange = { min: 1, max: 134 }
          break
        case '4b':
          valueRange = { min: 1, max: 108 }
          break
        case '4c':
          valueRange = { min: 1, max: 107 }
          break
        case '5a':
          valueRange = { min: 1, max: 84 }
          break
        case '5b':
          valueRange = { min: 1, max: 75 }
          break
        case '5c':
          valueRange = { min: 1, max: 84 }
          break
        case '6a':
          valueRange = { min: 1, max: 72 }
          break
        case '6b':
          valueRange = { min: 1, max: 46 }
          break
        case '6c':
          valueRange = { min: 1, max: 19 }
          break
      }
      break
    }
  }

  const { min, max } = valueRange
  if (!randomCoverImageSeed) {
    randomCoverImageSeed = [Math.random(), Math.random(), Math.random()]
  }
  const lvChar = level.substring(1, 2) || 'a'
  const randomIndex = lvChar === 'b' ? 1 : lvChar === 'c' ? 2 : 0
  const randomNumber =
    Math.floor(randomCoverImageSeed[randomIndex] * (max - min + 1)) + min

  if (type === 'eb') {
    return `https://wcfresource.a1edu.com/newsystem/image/br/covernew1/eb-${level}-${randomNumber.toString().padStart(3, '0')}.jpg`
  } else {
    return `https://wcfresource.a1edu.com/newsystem/image/br/covernew1/pb-${level}-${randomNumber.toString().padStart(3, '0')}.png`
  }
}
