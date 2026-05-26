export type DubbingCastRow = {
  key: 'fullCast' | 'single'
  label: string
  completedDate?: string
}

export type DubbingItem = {
  id: string
  title: string
  level: 'A' | 'B' | 'C' | 'D'
  castRows: DubbingCastRow[]
}
