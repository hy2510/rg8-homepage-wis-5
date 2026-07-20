'use client'

import { AccountPageFooterStyle } from '@/8th/shared/styled/SharedStyled'
import SITE_PATH, { CUSTOMER_CENTER_URL } from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useMemo } from 'react'

type FooterLink = {
  id: string
  labelI18nKey: string
  href: string
  external?: boolean
}

const DEFAULT_FOOTER_LINKS: FooterLink[] = [
  { id: 'about', labelI18nKey: 't8th352', href: SITE_PATH.HOME.MAIN },
  {
    id: 'terms',
    labelI18nKey: 't337',
    href: SITE_PATH.HOME.MEMBERSHIP_SERVICE_TERM,
  },
  {
    id: 'privacy',
    labelI18nKey: 't299',
    href: SITE_PATH.HOME.MEMBERSHIP_PRIVACY_POLICY,
  },
  {
    id: 'customer-center',
    labelI18nKey: 't321',
    href: CUSTOMER_CENTER_URL.private,
    external: true,
  },
  {
    id: 'institution',
    labelI18nKey: 't8th353',
    href: 'https://util.readinggate.com/Community/BringInInstitution',
    external: true,
  },
]

export default function AccountPageFooter({
  links,
  copyrightI18nKey = 't8th354',
}: {
  links?: FooterLink[]
  copyrightI18nKey?: string
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const footerLinks = useMemo(() => links ?? DEFAULT_FOOTER_LINKS, [links])

  return (
    <AccountPageFooterStyle>
      <div className="footer-links">
        {footerLinks.map((link) =>
          link.external ? (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer">
              {t(link.labelI18nKey)}
            </a>
          ) : (
            <Link key={link.id} href={link.href}>
              {t(link.labelI18nKey)}
            </Link>
          ),
        )}
      </div>
      <div className="copyright">{t(copyrightI18nKey)}</div>
    </AccountPageFooterStyle>
  )
}
