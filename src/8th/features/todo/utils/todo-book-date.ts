import { TodoBook } from '@/8th/features/todo/model/todo-book'
import DateUtils from '@/util/date-utils'

function formatBookDisplayDate(date: string) {
  if (!date) {
    return ''
  }
  try {
    return DateUtils.toRgDateEnglishFormat(date, 'MD')
  } catch {
    return date.substring(0, 10)
  }
}

/** To-Do / Assignments 날짜 표시 (미래 날짜는 + 없음) */
function formatTodoDateLabel(date: string): string {
  const formatted = formatBookDisplayDate(date)
  if (!formatted) {
    return ''
  }
  const today = new Date()
  const isFutureDate =
    DateUtils.dayDistance(today, DateUtils.createDate(date)) > 0
  return isFutureDate ? formatted : `+ ${formatted}`
}

/** To-Do / Assignments 날짜 그룹 헤더 */
export function formatTodoGroupDateLabel(date: string): string {
  return formatTodoDateLabel(date)
}

/** 선생님 부여 오픈 데이트, 없으면 추가된 날짜 */
export function getTodoBookDisplayDate(book: TodoBook): string | undefined {
  let rawDate: string | undefined
  if (book.assignmentsYn && book.openDate) {
    rawDate = book.openDate
  } else if (book.assignDate) {
    rawDate = book.assignDate
  } else if (book.openDate) {
    rawDate = book.openDate
  }
  if (!rawDate) {
    return undefined
  }
  const label = formatTodoDateLabel(rawDate)
  return label || undefined
}
