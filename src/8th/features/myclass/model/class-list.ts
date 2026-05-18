export type ClassItem = {
  id: string
  title: string
  characterImage: string
  completedCount: number
  totalCount: number
  description: string
  bookCover: {
    back: string
    front: string
  }
}

export const CLASS_LIST: Record<string, ClassItem> = {
  baroClass: {
    id: 'baroClass',
    title: 'Baro’s Class',
    characterImage: 'baro-001.png',
    completedCount: 30,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-ka-002.jpg',
      front: 'eb-ka-001.jpg',
    },
  },
  chelloClass: {
    id: 'chelloClass',
    title: 'Chello’s Class',
    characterImage: 'chello-001.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kb-102.jpg',
      front: 'eb-kb-101.jpg',
    },
  },
  milloClass: {
    id: 'milloClass',
    title: 'Millo’s Class',
    characterImage: 'millo-001.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kb-105.jpg',
      front: 'eb-kb-036.jpg',
    },
  },
  jackClass: {
    id: 'jackClass',
    title: 'Jack’s Class',
    characterImage: 'jack-001.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kb-025.jpg',
      front: 'eb-kb-112.jpg',
    },
  },
  blancClass: {
    id: 'blancClass',
    title: 'Blanc’s Class',
    characterImage: 'blanc-001.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-ka-107.jpg',
      front: 'eb-kc-002.jpg',
    },
  },
  sheilaClass: {
    id: 'sheilaClass',
    title: 'Sheila’s Class',
    characterImage: 'sheila-001.png',
    completedCount: 0,
    totalCount: 30,
    description: '내 꿈은 해적왕이야!',
    bookCover: {
      back: 'eb-kc-048.jpg',
      front: 'eb-kc-043.jpg',
    },
  },
  tori1Class: {
    id: 'tori1Class',
    title: 'Tori |',
    characterImage: 'tori-001.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kc-166.jpg',
      front: 'eb-kc-108.jpg',
    },
  },
  tori1sClass: {
    id: 'tori1sClass',
    title: 'Tori | S',
    characterImage: 'tori-002.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kc-052.jpg',
      front: 'eb-kc-208.jpg',
    },
  },
  tori2Class: {
    id: 'tori2Class',
    title: 'Tori ||',
    characterImage: 'tori-003.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kc-149.jpg',
      front: 'eb-kc-137.jpg',
    },
  },
  tori2sClass: {
    id: 'tori2sClass',
    title: 'Tori || S',
    characterImage: 'tori-004.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kc-201.jpg',
      front: 'eb-kc-326.jpg',
    },
  },
  roro1Class: {
    id: 'roro1Class',
    title: 'Roro |',
    characterImage: 'roro-001.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kc-135.jpg',
      front: 'eb-kc-148.jpg',
    },
  },
  roro1sClass: {
    id: 'roro1sClass',
    title: 'Roro | S',
    characterImage: 'roro-002.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kc-324.jpg',
      front: 'eb-kc-616.jpg',
    },
  },
  roro2Class: {
    id: 'roro2Class',
    title: 'Roro ||',
    characterImage: 'roro-003.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kc-132.jpg',
      front: 'eb-kc-160.jpg',
    },
  },
  roro2sClass: {
    id: 'roro2sClass',
    title: 'Roro || S',
    characterImage: 'roro-004.png',
    completedCount: 0,
    totalCount: 30,
    description: '나와 함께 알파벳을 배워보자!',
    bookCover: {
      back: 'eb-kc-609.jpg',
      front: 'eb-kc-627.jpg',
    },
  },
}

export const CLASS_LIST_ITEMS = Object.values(CLASS_LIST)

export function getClassItem(classId: string | null | undefined) {
  if (!classId) {
    return undefined
  }
  return CLASS_LIST[classId]
}
