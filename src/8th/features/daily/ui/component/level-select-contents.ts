import { Assets } from '@/8th/assets/asset-library'

export type LevelSelectItem = {
  level: string
  label1: string
  label2: string
  gradeI18nKey: string
  descriptionI18nKey: string
  videoSrc: string
}

export const LEVEL_SELECT_LEVELS: LevelSelectItem[] = [
  {
    level: 'PK',
    label1: 'Pre K',
    label2: 'Pre K',
    gradeI18nKey: 't8th344',
    descriptionI18nKey: 't8th348',
    videoSrc: Assets.Video.SelectLevelSample.PreK,
  },
  {
    level: 'KA',
    label1: 'K',
    label2: 'Level K',
    gradeI18nKey: 't8th345',
    descriptionI18nKey: 't8th349',
    videoSrc: Assets.Video.SelectLevelSample.LevelK,
  },
  {
    level: '1A',
    label1: '1',
    label2: 'Level 1',
    gradeI18nKey: 't8th346',
    descriptionI18nKey: 't8th350',
    videoSrc: Assets.Video.SelectLevelSample.Level1,
  },
  {
    level: '2A',
    label1: '2',
    label2: 'Level 2',
    gradeI18nKey: 't8th347',
    descriptionI18nKey: 't8th351',
    videoSrc: Assets.Video.SelectLevelSample.Level2,
  },
]
