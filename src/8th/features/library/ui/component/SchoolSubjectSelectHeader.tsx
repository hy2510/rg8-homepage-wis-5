import { Assets } from '@/8th/assets/asset-library'
import { SelectBox } from '@/8th/shared/ui/Misc'
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
  isMobile = false,
}: {
  // grade: string
  grade: SchoolSubjectOption
  publisher: SchoolSubjectOption
  lesson: SchoolSubjectOption
  lessonTitle?: string
  onLessonInfoClick?: () => void
  isMobile?: boolean
}) {
  const isActiveShowLessonInfo = !!lessonTitle && !!onLessonInfoClick
  return (
    <>
      <div
        style={{
          marginBottom: '-20px',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            minHeight: '60px',
            borderTop: '1px solid var(--line-color-primary)',
            borderBottom: '1px solid var(--line-color-primary)',
            gap: isMobile ? 6 : 16,
            alignItems: 'center',
            padding: '0 10px',
          }}>
          <SelectBox
            placeholder={'학년'}
            selectedValue={grade.current}
            largeFont
            onChange={(value) => grade.onChange(value)}
            options={grade.options}
          />
          <SelectBox
            placeholder={'교과서'}
            selectedValue={publisher.current}
            largeFont
            onChange={(value) => publisher.onChange(value)}
            options={publisher.options}
            minWidth={160}
          />
          <SelectBox
            placeholder={'단원'}
            selectedValue={lesson.current}
            largeFont
            onChange={(value) => lesson.onChange(value)}
            options={lesson.options}
            minWidth={80}
          />
        </div>
        {lessonTitle && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: isMobile ? '4px' : '20px',
              padding: isMobile ? '15px 10px' : '15px 10px 0 10px',
            }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  display: 'inline',
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                }}>
                {lessonTitle}
              </span>
              {isActiveShowLessonInfo && (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    marginLeft: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={onLessonInfoClick}>
                  <Image
                    src={Assets.Icon.zoomIn}
                    alt="zoom-in"
                    width={24}
                    height={24}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
