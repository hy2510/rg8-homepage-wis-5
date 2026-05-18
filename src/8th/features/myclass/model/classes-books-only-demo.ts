import type { ClassesListBookTile } from '@/8th/features/myclass/ui/component/classes-list/types'
import { demoLessonGroupsForUnit } from '@/8th/features/myclass/model/classes-lessons-list-demo'

const BOOK_COVER_URLS = [
  'https://wcfresource.a1edu.com/newsystem/image/dodoabc/cover/eb-pk-301.jpg',
  'https://wcfresource.a1edu.com/newsystem/neulbom/ebook/thurmnail-list/eb-ka-001.png',
  'https://wcfresource.a1edu.com/newsystem/image/dodoabc/cover/eb-pk-701.jpg',
  'https://wcfresource.a1edu.com/newsystem/image/br/covernew1/eb-1a-505.jpg',
  'https://wcfresource.a1edu.com/newsystem/image/br/covernew1/eb-pk-302.jpg',
  'https://wcfresource.a1edu.com/newsystem/image/br/covernew1/eb-pk-303.jpg',
] as const

const LEVEL_NAME_BY_LABEL: Record<ClassesListBookTile['label'], string> = {
  eBook: 'EB-PK-301',
  'Movie Activity': 'EB-PK-302',
  Song: 'EB-PK-303',
}

export type ClassesBooksOnlyLibraryItem = {
  id: string
  title: string
  passCount: number
  point: number
  addYn: boolean
  movieYn: boolean
  src: string
  levelName: string
  recommendedAge: string
}

function passCountFromTile(book: ClassesListBookTile): number {
  if (book.unitDone && book.unitReviewDone) {
    return 1
  }
  if (book.unitDone) {
    return 1
  }
  return 0
}

function mapTileToLibraryItem(
  book: ClassesListBookTile,
  index: number,
): ClassesBooksOnlyLibraryItem {
  const completed = book.unitDone && book.unitReviewDone
  return {
    id: book.id,
    title: book.title,
    passCount: passCountFromTile(book),
    point: book.point,
    addYn: !completed,
    movieYn: book.label === 'Movie Activity',
    src: BOOK_COVER_URLS[index % BOOK_COVER_URLS.length],
    levelName: LEVEL_NAME_BY_LABEL[book.label],
    recommendedAge: 'A',
  }
}

/** Books Only 그리드 — 단원 내 전체 도서를 Library BookItem 형식으로 반환 */
export function demoBooksOnlyForUnit(unit: number): ClassesBooksOnlyLibraryItem[] {
  const groups = demoLessonGroupsForUnit(unit)
  let index = 0
  return groups.flatMap((group) =>
    group.books.map((book) => mapTileToLibraryItem(book, index++)),
  )
}
