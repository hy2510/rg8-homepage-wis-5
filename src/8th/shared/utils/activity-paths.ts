import SITE_PATH from '@/app/site-path'

export type ActivityPaths = {
  activity: string
  todo: string
  favorite: string
  tryagain: string
  review: string
  reviewWrite: string
  reviewSpeak: string
}

export function getActivityPaths(pathname: string): ActivityPaths {
  if (pathname.includes('/dodonfriends/')) {
    return {
      activity: SITE_PATH.DODON_FRIENDS.ACTIVITY,
      todo: SITE_PATH.DODON_FRIENDS.TODO,
      favorite: SITE_PATH.DODON_FRIENDS.FAVORITE,
      tryagain: SITE_PATH.DODON_FRIENDS.TRYAGAIN,
      review: SITE_PATH.DODON_FRIENDS.REVIEW,
      reviewWrite: SITE_PATH.DODON_FRIENDS.REVIEW_WRITE,
      reviewSpeak: SITE_PATH.DODON_FRIENDS.REVIEW_SPEAK,
    }
  }

  return {
    activity: SITE_PATH.STUDENT_8TH.ACTIVITY,
    todo: SITE_PATH.STUDENT_8TH.TODO,
    favorite: SITE_PATH.STUDENT_8TH.FAVORITE,
    tryagain: SITE_PATH.STUDENT_8TH.TRYAGAIN,
    review: SITE_PATH.STUDENT_8TH.REVIEW,
    reviewWrite: SITE_PATH.STUDENT_8TH.REVIEW_WRITE,
    reviewSpeak: SITE_PATH.STUDENT_8TH.REVIEW_SPEAK,
  }
}
