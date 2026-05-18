import type { ClassesListLessonGroup } from '@/8th/features/myclass/ui/component/classes-list/types'

/** ClassesList UI 데모 — API 연동 시 이 객체를 대체하면 됩니다. */

/** `1.2: Phonics - ace / age` → `{ unit: 1, step: 2 }` */
export function parseLessonSection(title: string): {
  unit: number
  step: number
} | null {
  const m = /^(\d+)\.(\d+)\s*:/.exec(title.trim())
  if (!m) return null
  return {
    unit: Number.parseInt(m[1], 10),
    step: Number.parseInt(m[2], 10),
  }
}

/** 단원 번호 → 레슨 그룹 목록 (차시 순) */
export const DEMO_CLASSES_LIST_BY_UNIT: Record<
  number,
  ClassesListLessonGroup[]
> = {
  1: [
    {
      id: '1-1',
      rowKind: 'lesson',
      title: '1.1: Phonics - ace / age',
      books: [
        {
          id: '1-1-1',
          title: 'ace / age',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-1-2',
          title: 'Jane Is Free!',
          point: 1.0,
          label: 'Movie Activity',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-1-3',
          title: 'Phonics Time: ace / age',
          point: 1.0,
          label: 'Song',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-1-4',
          title: 'Phonics Chant: ace / age',
          point: 1.0,
          label: 'Song',
          unitDone: true,
          unitReviewDone: true,
        },
      ],
    },
    {
      id: '1-2',
      rowKind: 'review',
      title: '1.2: Review - ace / age',
      books: [
        {
          id: '1-2-1',
          title: 'ace / age',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-2-2',
          title: 'Review Warm-up: ace / age',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-2-3',
          title: 'Review Check: ace / age',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '1-2-4',
          title: 'Chant Review: ace / age',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '1-3',
      rowKind: 'lesson',
      title: '1.3: Phonics - ake / ale',
      books: [
        {
          id: '1-3-1',
          title: 'ake / ale',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-3-2',
          title: 'Use the Trash Can!',
          point: 1.0,
          label: 'Movie Activity',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-3-3',
          title: 'Phonics Time: ake / ale',
          point: 1.0,
          label: 'Song',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-3-4',
          title: 'Phonics Chant: ake / ale',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '1-4',
      rowKind: 'review',
      title: '1.4: Review - ake / ale',
      books: [
        {
          id: '1-4-1',
          title: 'ake / ale',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-4-2',
          title: 'Review Warm-up: ake / ale',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '1-4-3',
          title: 'Review Check: ake / ale',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '1-4-4',
          title: 'Chant Review: ake / ale',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '1-5',
      rowKind: 'lesson',
      title: '1.5: Phonics - ame / ane',
      books: [
        {
          id: '1-5-1',
          title: 'ame / ane',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-5-2',
          title: "James' Plane",
          point: 1.0,
          label: 'Movie Activity',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-5-3',
          title: 'Phonics Time: ame / ane',
          point: 1.0,
          label: 'Song',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-5-4',
          title: 'Phonics Chant: ame / ane',
          point: 1.0,
          label: 'Song',
          unitDone: true,
          unitReviewDone: true,
        },
      ],
    },
    {
      id: '1-6',
      rowKind: 'review',
      title: '1.6: Review - ame / ane',
      books: [
        {
          id: '1-6-1',
          title: 'ame / ane',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '1-6-2',
          title: 'Review Warm-up: ame / ane',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '1-6-3',
          title: 'Review Check: ame / ane',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '1-6-4',
          title: 'Chant Review: ame / ane',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '1-7',
      rowKind: 'lesson',
      title: '1.7: Phonics - ape / are',
      books: [
        {
          id: '1-7-1',
          title: 'ape / are',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-7-2',
          title: 'The Dress Making Contest',
          point: 1.0,
          label: 'Movie Activity',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-7-3',
          title: 'Phonics Time: ape / are',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '1-7-4',
          title: 'Phonics Chant: ape / are',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '1-8',
      rowKind: 'review',
      title: '1.8: Review - ape / are',
      books: [
        {
          id: '1-8-1',
          title: 'ape / are',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-8-2',
          title: 'Review Warm-up: ape / are',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-8-3',
          title: 'Review Check: ape / are',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '1-8-4',
          title: 'Chant Review: ape / are',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
  ],
  2: [
    {
      id: '2-1',
      rowKind: 'lesson',
      title: '2.1: Phonics - ase / ate',
      books: [
        {
          id: '2-1-1',
          title: 'ase / ate',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-1-2',
          title: 'My Cat, Luna',
          point: 1.0,
          label: 'Movie Activity',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-1-3',
          title: 'Phonics Time: ase / ate',
          point: 1.0,
          label: 'Song',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-1-4',
          title: 'Phonics Chant: ase / ate',
          point: 1.0,
          label: 'Song',
          unitDone: true,
          unitReviewDone: true,
        },
      ],
    },
    {
      id: '2-2',
      rowKind: 'review',
      title: '2.2: Review - ase / ate',
      books: [
        {
          id: '2-2-1',
          title: 'ase / ate',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-2-2',
          title: 'Review Warm-up: ase / ate',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '2-2-3',
          title: 'Review Check: ase / ate',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-2-4',
          title: 'Chant Review: ase / ate',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '2-3',
      rowKind: 'lesson',
      title: '2.3: Phonics - ea / ee',
      books: [
        {
          id: '2-3-1',
          title: 'ea / ee',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-3-2',
          title: "Pete's Leaf",
          point: 1.0,
          label: 'Movie Activity',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-3-3',
          title: 'Phonics Time: ea / ee',
          point: 1.0,
          label: 'Song',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-3-4',
          title: 'Phonics Chant: ea / ee',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '2-4',
      rowKind: 'review',
      title: '2.4: Review - ea / ee',
      books: [
        {
          id: '2-4-1',
          title: 'ea / ee',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '2-4-2',
          title: 'Review Warm-up: ea / ee',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '2-4-3',
          title: 'Review Check: ea / ee',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '2-4-4',
          title: 'Chant Review: ea / ee',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '2-5',
      rowKind: 'lesson',
      title: '2.5: Phonics - ice / ide',
      books: [
        {
          id: '2-5-1',
          title: 'ice / ide',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-5-2',
          title: 'Yeti and Eliza',
          point: 1.0,
          label: 'Movie Activity',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '2-5-3',
          title: 'Phonics Time: ice / ide',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '2-5-4',
          title: 'Phonics Chant: ice / ide',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '2-6',
      rowKind: 'review',
      title: '2.6: Review - ice / ide',
      books: [
        {
          id: '2-6-1',
          title: 'ice / ide',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-6-2',
          title: 'Review Warm-up: ice / ide',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-6-3',
          title: 'Review Check: ice / ide',
          point: 1.0,
          label: 'eBook',
          unitDone: false,
          unitReviewDone: false,
        },
        {
          id: '2-6-4',
          title: 'Chant Review: ice / ide',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
    {
      id: '2-7',
      rowKind: 'lesson',
      title: '2.7: Phonics - ike / ive',
      books: [
        {
          id: '2-7-1',
          title: 'ike / ive',
          point: 1.0,
          label: 'eBook',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-7-2',
          title: "Kile's Hike",
          point: 1.0,
          label: 'Movie Activity',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-7-3',
          title: 'Phonics Time: ike / ive',
          point: 1.0,
          label: 'Song',
          unitDone: true,
          unitReviewDone: true,
        },
        {
          id: '2-7-4',
          title: 'Phonics Chant: ike / ive',
          point: 1.0,
          label: 'Song',
          unitDone: false,
          unitReviewDone: false,
        },
      ],
    },
  ],
}

export function demoUnitsFromData(): number[] {
  return Object.keys(DEMO_CLASSES_LIST_BY_UNIT)
    .map(Number)
    .sort((a, b) => a - b)
}

export function demoLessonGroupsForUnit(
  unit: number,
): ClassesListLessonGroup[] {
  return DEMO_CLASSES_LIST_BY_UNIT[unit] ?? []
}
export function demoLessonBookCountForUnit(unit: number): number {
  return demoLessonGroupsForUnit(unit).reduce((n, g) => n + g.books.length, 0)
}
