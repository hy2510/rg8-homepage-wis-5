import { Assets } from '@/8th/assets/asset-library'
import dubbingThumbnailSample from '@/8th/assets/images/sample/dr-ka-001 1.png'
import type { DubbingItem } from '@/8th/features/dubbing/model/dubbing-item'
import Image from 'next/image'

export default function DubbingCard({ item }: { item: DubbingItem }) {
  return (
    <div className="dubbing-card" aria-label={item.title}>
      <div className="dubbing-card-thumbnail">
        <Image src={dubbingThumbnailSample} alt="" width={200} height={120} />
      </div>
      <div className="dubbing-card-info">
        {item.castRows.map((row) => {
          const isCompleted = !!row.completedDate

          return (
            <div key={row.key} className="dubbing-card-status-row">
              <div className="dubbing-card-status-label-row">
                <Image
                  src={Assets.Icon.Study.checkMarkGold}
                  alt=""
                  width={20}
                  height={20}
                  className={`dubbing-card-check-icon ${isCompleted && 'completed'}`}
                />
                <span className="dubbing-card-status-label">{row.label}</span>
              </div>
              <span className="dubbing-card-status-date">
                {row.completedDate ?? '--'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
