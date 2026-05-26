'use client'

import LibraryActionBarDnf, {
  ActionBarDropdownItem,
} from '@/8th/features/librarydnf/ui/component/LibraryActionBarDnf'
import type {
  MovieCastRow,
  MovieItem,
} from '@/8th/features/movies/model/movie-item'
import MovieCard from '@/8th/features/movies/ui/component/MovieCard'
import { useStatusAndGenreItems } from '@/8th/shared/hook/useActionBarDropdownOption'
import { MovieContentsListStyle } from '@/8th/shared/styled/FeaturesStyled'
import { Gap } from '@/8th/shared/ui/Misc'
import Pagenation from '@/8th/shared/ui/Pagenation'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import MovieContentsListHeader from '../component/MovieContentsListHeader'

const DEMO_COUNT = 224

const DEMO_CAST_ROWS: MovieCastRow[] = [
  {
    key: 'fullCast',
    label: 'Full Cast',
    completedDate: '2026-10-20',
  },
  { key: 'single', label: 'Single' },
]

const DEMO_ITEMS: MovieItem[] = [
  {
    id: 'whats-your-name',
    title: "What's Your Name?",
    level: 'A',
    castRows: DEMO_CAST_ROWS,
  },
  {
    id: 'my-name-is-gino',
    title: 'My Name Is Gino',
    level: 'A',
    castRows: DEMO_CAST_ROWS,
  },
  {
    id: 'how-old-are-you',
    title: 'How Old Are You?',
    level: 'A',
    castRows: DEMO_CAST_ROWS,
  },
  {
    id: 'i-can-swim',
    title: 'I Can Swim',
    level: 'A',
    castRows: DEMO_CAST_ROWS,
  },
  {
    id: 'what-color-is-it',
    title: 'What Color Is It?',
    level: 'A',
    castRows: DEMO_CAST_ROWS,
  },
  {
    id: 'where-is-the-cat',
    title: 'Where Is the Cat?',
    level: 'A',
    castRows: DEMO_CAST_ROWS,
  },
  {
    id: 'open-the-door',
    title: 'Open the Door',
    level: 'A',
    castRows: DEMO_CAST_ROWS,
  },
  {
    id: 'wash-your-hands',
    title: 'Wash Your Hands',
    level: 'A',
    castRows: DEMO_CAST_ROWS,
  },
  {
    id: 'i-like-apples',
    title: 'I Like Apples',
    level: 'A',
    castRows: DEMO_CAST_ROWS,
  },
]

const TOTAL_PAGES = 5

function buildLevelTabs(categoryId: string) {
  const base = `${SITE_PATH.DODON_FRIENDS.MOVIES}/${categoryId}`
  return [
    { level: 'A' as const, label: 'Level A', href: base },
    { level: 'B' as const, label: 'Level B', href: `${base}?level=b` },
    { level: 'C' as const, label: 'Level C', href: `${base}?level=c` },
    { level: 'D' as const, label: '교과연계', href: `${base}?level=d` },
  ]
}

export default function MovieContentsList({
  categoryId,
}: {
  categoryId: string
}) {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [activePage, setActivePage] = useState(1)
  const [status, setStatus] = useState('1stCompleteOrBefore')
  const [genre, setGenre] = useState('All')

  const levelTabs = useMemo(() => buildLevelTabs(categoryId), [categoryId])

  const activeLevel = useMemo(() => {
    const levelParam = searchParams.get('level')?.toLowerCase()
    if (levelParam === 'd') {
      return 'D'
    }
    if (levelParam === 'b') {
      return 'B'
    }
    if (levelParam === 'c') {
      return 'C'
    }
    return 'A'
  }, [searchParams])

  const tabBarItems = levelTabs.map((tab) => ({
    href: tab.href,
    label: tab.label,
    active: tab.level === activeLevel,
  }))

  const statusItems = useStatusAndGenreItems(status, genre)

  const actionBarTitle = statusItems
    .filter((item) => item.isActive && !!item.label)
    .reduce((title, item) => {
      if (item.key.startsWith('Status')) {
        return item.label as string
      }
      if (item.key.startsWith('Genre') && item.key !== 'GenreAll') {
        return title ? `${title} / ${item.label}` : (item.label as string)
      }
      return title
    }, '')

  const visibleItems = useMemo(
    () => DEMO_ITEMS.filter((item) => item.level === activeLevel),
    [activeLevel],
  )

  const onStatusItemClick = (item: ActionBarDropdownItem) => {
    if (item.key.startsWith('Status')) {
      const value = item.key.substring(6)
      if (value.startsWith('Mode')) {
        let nextStatus = 'All'
        switch (value) {
          case 'ModeEasy':
            nextStatus = 'Easy'
            break
          case 'ModeFull':
            nextStatus = 'Full'
            break
          case 'Mode1stCompleteOrBefore':
            nextStatus = '1stCompleteOrBefore'
            break
          case 'Mode1StComplete':
            nextStatus = '1stComplete'
            break
          case 'Mode2ndComplete':
            nextStatus = '2ndComplete'
            break
          default:
            break
        }
        setStatus(nextStatus)
      } else if (status !== value) {
        setStatus(value)
      }
    } else if (item.key.startsWith('Genre')) {
      const value = item.key.substring(5)
      if (genre !== value) {
        setGenre(value)
      }
    }
  }

  return (
    <MovieContentsListStyle>
      <SubPageNavHeader parentPath={SITE_PATH.DODON_FRIENDS.MOVIES} />

      <MovieContentsListHeader />

      <LibraryActionBarDnf
        title={actionBarTitle}
        count={DEMO_COUNT}
        dropdowns={[
          {
            title: t('t8th012'),
            isActiveMakerVisible: true,
            items: statusItems,
            onItemClick: onStatusItemClick,
          },
        ]}
      />

      <div className="movie-grid">
        {visibleItems.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>

      <Pagenation
        maxPage={TOTAL_PAGES}
        currentPage={activePage}
        onPageChange={setActivePage}
      />
    </MovieContentsListStyle>
  )
}
