import SITE_PATH from '@/app/site-path'

export type AccountPaths = {
  accountInfo: string
  accountInfoSetting: string
  activity: string
}

export function isDodonFriendsAccountPath(pathname: string): boolean {
  return pathname.includes('/dodonfriends/')
}

export function getAccountPaths(pathname: string): AccountPaths {
  if (isDodonFriendsAccountPath(pathname)) {
    return {
      accountInfo: SITE_PATH.DODON_FRIENDS.ACCOUNTINFO,
      accountInfoSetting: SITE_PATH.DODON_FRIENDS.ACCOUNTINFO_SETTING,
      activity: SITE_PATH.DODON_FRIENDS.ACTIVITY,
    }
  }

  return {
    accountInfo: SITE_PATH.STUDENT_8TH.ACCOUNTINFO,
    accountInfoSetting: SITE_PATH.STUDENT_8TH.ACCOUNTINFO_SETTING,
    activity: SITE_PATH.STUDENT_8TH.ACTIVITY,
  }
}
