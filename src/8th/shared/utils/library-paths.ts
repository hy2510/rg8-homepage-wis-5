import SITE_PATH from '@/app/site-path'

export type LibraryPaths = {
  library: string
  eb: string
  pb: string
  ebLevel: string
  pbLevel: string
  ebSearch: string
  pbSearch: string
  assignments: string
}

export function isDodonFriendsLibraryPath(pathname: string): boolean {
  return pathname.includes('/dodonfriends/')
}

export function getLibraryPaths(pathname: string): LibraryPaths {
  if (isDodonFriendsLibraryPath(pathname)) {
    return {
      library: SITE_PATH.DODON_FRIENDS.LIBRARY,
      eb: SITE_PATH.DODON_FRIENDS.EB,
      pb: SITE_PATH.DODON_FRIENDS.PB,
      ebLevel: SITE_PATH.DODON_FRIENDS.EB_LEVEL,
      pbLevel: SITE_PATH.DODON_FRIENDS.PB_LEVEL,
      ebSearch: SITE_PATH.DODON_FRIENDS.EB_SEARCH,
      pbSearch: SITE_PATH.DODON_FRIENDS.PB_SEARCH,
      assignments: SITE_PATH.DODON_FRIENDS.ASSIGNMENTS,
    }
  }

  return {
    library: SITE_PATH.STUDENT_8TH.LIBRARY,
    eb: SITE_PATH.STUDENT_8TH.EB,
    pb: SITE_PATH.STUDENT_8TH.PB,
    ebLevel: SITE_PATH.STUDENT_8TH.EB_LEVEL,
    pbLevel: SITE_PATH.STUDENT_8TH.PB_LEVEL,
    ebSearch: SITE_PATH.STUDENT_8TH.EB_SEARCH,
    pbSearch: SITE_PATH.STUDENT_8TH.PB_SEARCH,
    assignments: SITE_PATH.STUDENT_8TH.TODO,
  }
}
