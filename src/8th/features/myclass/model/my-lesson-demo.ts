export type MyLessonBook = {
  no: number
  title: string
  imgUrl: string
  passCount: number
  point: number
  isCurrent?: boolean
  isPreK?: boolean
  preKCharacter?: string
  isMovieAvailable?: boolean
}

export type MyLessonGroup = {
  title: string
  classes?: string
  completed: number
  total: number
  active?: boolean
  lessons: MyLessonBook[]
}

export type MyLessonDaySection = {
  id: string
  title: string
  completedCount: number
  totalCount: number
  bgColor: string
  progressColor: string
  accentColor: string
}

export const MY_LESSON_TODAY_SECTION: MyLessonDaySection = {
  id: 'day-3',
  title: "Day 3 - Today's Lesson",
  completedCount: 1,
  totalCount: 6,
  bgColor: '#2CB1BE',
  progressColor: '#FFCA2B',
  accentColor: '#2CB1BE',
}

export const MY_LESSON_GROUPS: MyLessonGroup[] = [
  {
    title: '1.1. Alphabet Cc',
    classes: "Baro's Class",
    completed: 1,
    total: 6,
    active: true,
    lessons: [
      {
        no: 1,
        title: 'Alphabet Cc',
        imgUrl:
          'https://wcfresource.a1edu.com/newsystem/image/dodoabc/cover/eb-pk-301.jpg',
        passCount: 1,
        point: 0,
      },
      {
        no: 2,
        title: 'I Want a Cake',
        imgUrl:
          'https://wcfresource.a1edu.com/newsystem/neulbom/ebook/thurmnail-list/eb-ka-001.png',
        passCount: 0,
        point: 1,
        isCurrent: true,
      },
      {
        no: 3,
        title: 'Three Little Bunnies',
        imgUrl:
          'https://wcfresource.a1edu.com/newsystem/image/dodoabc/cover/eb-pk-701.jpg',
        passCount: 0,
        point: 1,
      },
    ],
  },
  {
    title: '4. Alphabet Dd',
    classes: "Baro's Class",
    completed: 0,
    total: 3,
    lessons: [
      {
        no: 1,
        title: 'Alphabet Dd',
        imgUrl:
          'https://wcfresource.a1edu.com/newsystem/image/dodoabc/cover/eb-pk-301.jpg',
        passCount: 0,
        point: 1,
      },
      {
        no: 2,
        title: "A Duck's Train",
        imgUrl:
          'https://wcfresource.a1edu.com/newsystem/image/dodoabc/cover/eb-pk-301.jpg',
        passCount: 0,
        point: 1,
      },
      {
        no: 3,
        title: 'Three Little Ducks',
        imgUrl:
          'https://wcfresource.a1edu.com/newsystem/image/dodoabc/cover/eb-pk-301.jpg',
        passCount: 0,
        point: 1,
      },
    ],
  },
]

export const MY_LESSON_UPCOMING_DAYS = [
  { day: 'Day 4', date: 'March 9, 2026', progress: '0/3' },
  { day: 'Day 5', date: 'March 11, 2026', progress: '0/3' },
  { day: 'Day 6', date: 'March 13, 2026', progress: '0/3' },
  { day: 'Day 7', date: 'March 16, 2026', progress: '0/3' },
  { day: 'Day 8', date: 'March 18, 2026', progress: '0/3' },
]

export function getMyLessonDaySection(
  dayId: string,
): MyLessonDaySection | undefined {
  if (dayId === MY_LESSON_TODAY_SECTION.id) {
    return MY_LESSON_TODAY_SECTION
  }
  return undefined
}

export function getMyLessonBooksForDay(dayId: string): MyLessonBook[] {
  if (dayId !== MY_LESSON_TODAY_SECTION.id) {
    return []
  }
  return MY_LESSON_GROUPS.flatMap((group) => group.lessons)
}

export function getMyLessonGroupsForDay(dayId: string): MyLessonGroup[] {
  if (dayId !== MY_LESSON_TODAY_SECTION.id) {
    return []
  }
  return MY_LESSON_GROUPS
}
