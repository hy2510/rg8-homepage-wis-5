import MovieContentsList from '@/8th/features/movies/ui/page/MovieContentsList'

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>
}) {
  const { categoryId } = await params

  return <MovieContentsList categoryId={categoryId} />
}
