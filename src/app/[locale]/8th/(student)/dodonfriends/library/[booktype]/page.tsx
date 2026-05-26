import FinderBookDnf from '@/8th/features/librarydnf/ui/page/FinderBookDnf'

export default async function Page({
  params,
}: {
  params: Promise<{ booktype: string }>
}) {
  const { booktype } = await params

  return <FinderBookDnf booktype={booktype as 'eb' | 'pb'} />
}
