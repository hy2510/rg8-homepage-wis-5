import { OverrideQueryOptions } from '@/8th/shared/react-query/types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getSearchBookKeyword } from '../model/search-keyword'
import { getSearchBookLevel } from '../model/search-level'
import { libraryKeys } from './library-key'

export function useSearchBookLevel(
  params: {
    bookType: 'EB' | 'PB'
    level: string
    page?: number
    sort?: string
    genre?: string
    status?: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('level', params),
    queryFn: () => {
      let mode = undefined
      if (params.status === 'Easy' || params.status === 'Full') {
        mode = params.status.toUpperCase()
      }
      return getSearchBookLevel({
        bookType: params.bookType,
        level: params.level,
        page: params.page,
        sort: params.sort,
        genre: params.genre,
        status: mode ? 'All' : params.status,
        mode: mode,
      })
    },
    placeholderData: keepPreviousData,
  })
}

export function useSearchBookKeyword(
  params: {
    bookType: 'EB' | 'PB'
    keyword: string
    page?: number
    type?: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('keyword', params),
    queryFn: () => getSearchBookKeyword(params),
    placeholderData: keepPreviousData,
  })
}
