import { Assets } from '@/8th/assets/asset-library'
import ActionBar, {
  type LibraryActionBarProps,
} from '@/8th/features/library/ui/component/LibraryActionBar'
import { BoxStyle, Dropdown, TextStyle } from '@/8th/shared/ui/Misc'
import Image from 'next/image'

export type SchoolSubjectOption = {
  current: string
  options: { key: string; label: string }[]
  onChange: (value: { key: string; label: string }) => void
}
export function SchoolSubjectSelectHeader({
  grade,
  publisher,
  lesson,
  lessonTitle,
  onLessonInfoClick,
  actionBar,
}: {
  grade: SchoolSubjectOption
  publisher: SchoolSubjectOption
  lesson: SchoolSubjectOption
  lessonTitle?: string
  onLessonInfoClick?: () => void
  actionBar?: LibraryActionBarProps
}) {
  const isActiveShowLessonInfo = !!lessonTitle && !!onLessonInfoClick
  return (
    <BoxStyle display="flex" flexDirection="column" gap={10}>
      <BoxStyle display="flex" gap={15} padding="10px">
        <Dropdown
          placeholder={'학년'}
          selectedValue={grade.current}
          onChange={(value) => grade.onChange(value)}
          options={grade.options}
          mediumFont
        />
        <Dropdown
          placeholder={'교과서'}
          selectedValue={publisher.current}
          onChange={(value) => publisher.onChange(value)}
          options={publisher.options}
          mediumFont
        />
        <Dropdown
          placeholder={'단원'}
          selectedValue={lesson.current}
          onChange={(value) => lesson.onChange(value)}
          options={lesson.options}
          mediumFont
        />
      </BoxStyle>
      {lessonTitle && (
        <BoxStyle
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderTop="1px solid var(--line-color-primary)"
          padding="10px 10px 0 10px">
          <TextStyle fontFamily="sans" fontSize="large" fontWeight={700}>
            {lessonTitle}
          </TextStyle>
          {isActiveShowLessonInfo && (
            <BoxStyle
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="40px"
              height="40px"
              onClick={onLessonInfoClick}>
              <Image
                src={Assets.Icon.zoonInGray.src}
                alt="zoom-in"
                width={20}
                height={20}
              />
            </BoxStyle>
          )}
        </BoxStyle>
      )}
      {actionBar && <ActionBar {...actionBar} />}
    </BoxStyle>
  )
}
