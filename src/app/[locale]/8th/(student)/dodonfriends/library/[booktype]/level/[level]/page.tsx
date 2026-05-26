import SearchLevelBookListDnf from '@/8th/features/librarydnf/ui/page/SearchLevelBookListDnf'

export default async function Page({
  params,
}: {
  params: Promise<{ booktype: string; level: string }>
}) {
  const { booktype, level } = await params

  return (
    <SearchLevelBookListDnf
      booktype={booktype.toUpperCase()}
      level={level.toUpperCase()}
    />
  )
}
