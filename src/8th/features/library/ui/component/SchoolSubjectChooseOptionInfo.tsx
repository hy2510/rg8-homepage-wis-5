import { Assets } from '@/8th/assets/asset-library'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import Image from 'next/image'

export default function SchoolSubjectChooseOptionInfo() {
  return (
    <BoxStyle width="100%">
      <BoxStyle
        display="flex"
        height="64dvh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={20}>
        <Image
          src={Assets.Image.SchoolSubjectChooseOptionInfo}
          alt="school-subject-choose-option-info"
          width={105}
          height={101}
        />
        <span
          style={{
            fontFamily: 'var(--font-family-secondary)',
            fontSize: '16px',
            fontWeight: '500',
          }}>
          학년과, 교과서, 단원을 선택해 주세요.
        </span>
      </BoxStyle>
    </BoxStyle>
  )
}
