export type MovieCastRow = {
  key: 'fullCast' | 'single'
  label: string
  completedDate?: string
}

export type MovieItem = {
  id: string
  title: string
  level: 'A' | 'B' | 'C' | 'D'
  castRows: MovieCastRow[]
  videoUrl?: string
}
