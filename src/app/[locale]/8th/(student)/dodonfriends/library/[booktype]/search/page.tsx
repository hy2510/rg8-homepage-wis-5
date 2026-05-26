import SearchBookListDnf from '@/8th/features/librarydnf/ui/page/SearchKeywordBookListDnf'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ booktype: string }>
  searchParams: Promise<{ keyword: string; type?: string }>
}) {
  const { booktype } = await params
  const { keyword, type } = await searchParams

  return (
    <SearchBookListDnf
      booktype={booktype.toUpperCase()}
      keyword={keyword}
      type={type}
    />
  )
}
