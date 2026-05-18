'use client'

import { LibraryFinderTabBarStyle } from '@/8th/shared/styled/FeaturesStyled'

type Props = {
  units: number[]
  activeUnit: number
  onUnitChange: (unit: number) => void
}

export default function ClassesListUnitTabs({
  units,
  activeUnit,
  onUnitChange,
}: Props) {
  return (
    <LibraryFinderTabBarStyle role="tablist" aria-label="Unit">
      <div className="tabs">
        {units.map((u) => {
          const active = activeUnit === u
          return (
            <button
              key={u}
              type="button"
              role="tab"
              aria-selected={active}
              className={`tab ${active ? 'active' : 'inactive'}`}
              onClick={() => onUnitChange(u)}>
              Part {u}
            </button>
          )
        })}
      </div>
    </LibraryFinderTabBarStyle>
  )
}
