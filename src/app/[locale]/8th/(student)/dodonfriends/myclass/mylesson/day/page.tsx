import MyLessonDayBookList from '@/8th/features/myclass/ui/page/MyLessonDayBookList'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ day?: string }>
}) {
  const { day } = await searchParams
  return <MyLessonDayBookList dayId={day ?? ''} />
}
