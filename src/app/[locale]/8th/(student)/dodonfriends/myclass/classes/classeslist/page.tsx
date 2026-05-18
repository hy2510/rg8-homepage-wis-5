import ClassesList from '@/8th/features/myclass/ui/page/ClassesList'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ClassesList />
    </Suspense>
  )
}
