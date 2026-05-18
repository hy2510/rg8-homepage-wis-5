'use client'

import { Assets } from '@/8th/assets/asset-library'
import BookItem from '@/8th/features/library/ui/component/BookItem'
import { demoBooksOnlyForUnit } from '@/8th/features/myclass/model/classes-books-only-demo'
import { BookListStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import Image from 'next/image'
import { useMemo } from 'react'

type Props = {
  unit: number
}

export default function ClassesListBooksOnlyState({ unit }: Props) {
  const books = useMemo(() => demoBooksOnlyForUnit(unit), [unit])

  return (
    <BoxStyle display="flex" flexDirection="column" gap={20}>
      {books.length === 0 ? (
        <BooksOnlyEmptyState />
      ) : (
        <BooksOnlyContent books={books} />
      )}
    </BoxStyle>
  )
}

function BooksOnlyEmptyState() {
  return (
    <div className="cl-empty-state" role="status" aria-live="polite">
      <Image src={Assets.Image.emptyResults} alt="" width={120} height={120} />
      <p className="cl-empty-state-message">No books to show.</p>
    </div>
  )
}

function BooksOnlyContent({
  books,
}: {
  books: ReturnType<typeof demoBooksOnlyForUnit>
}) {
  return (
    <BookListStyle>
      {books.map((book) => (
        <BookItem
          key={book.id}
          title={book.title}
          passCount={book.passCount}
          point={book.point}
          addYn={book.addYn}
          movieYn={book.movieYn}
          src={
            'https://wcfresource.a1edu.com/newsystem/image/br/covernew1/eb-1a-505.jpg'
          }
          levelName={book.levelName}
          recommendedAge={book.recommendedAge}
        />
      ))}
    </BookListStyle>
  )
}
