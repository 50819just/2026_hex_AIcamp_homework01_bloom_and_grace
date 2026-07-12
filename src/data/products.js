import { withBaseUrl } from '../lib/assetUrl'

const localImage = (path) => withBaseUrl(`images/products/${path}`)

const CATEGORY_META = {
  orchid: {
    key: 'orchid',
    label: '蝴蝶蘭',
    homeLabel: '蝴蝶蘭',
    tone: 'rose',
  },
  basket: {
    key: 'basket',
    label: '花藝花籃',
    homeLabel: '花藝花籃',
    tone: 'gold',
  },
  potted: {
    key: 'potted',
    label: '盆栽植栽',
    homeLabel: '盆栽植栽',
    tone: 'green',
  },
  sympathy: {
    key: 'sympathy',
    label: '弔唁花禮',
    homeLabel: '弔唁花禮',
    tone: 'lavender',
  },
  dried: {
    key: 'dried',
    label: '乾燥花藝',
    homeLabel: '乾燥花藝',
    tone: 'sand',
  },
}

export const categories = [
  { key: 'all', label: '全部花禮' },
  { key: CATEGORY_META.orchid.key, label: CATEGORY_META.orchid.label },
  { key: CATEGORY_META.basket.key, label: CATEGORY_META.basket.label },
  { key: CATEGORY_META.potted.key, label: CATEGORY_META.potted.label },
  { key: CATEGORY_META.sympathy.key, label: CATEGORY_META.sympathy.label },
  { key: CATEGORY_META.dried.key, label: CATEGORY_META.dried.label },
]

export const homeCategories = [
  {
    key: CATEGORY_META.orchid.key,
    label: CATEGORY_META.orchid.homeLabel,
    image: localImage('orchids/white-orchid-01.jpg'),
  },
  {
    key: CATEGORY_META.basket.key,
    label: CATEGORY_META.basket.homeLabel,
    image: localImage('baskets/pink-rose-bouquet-01.jpg'),
  },
  {
    key: CATEGORY_META.potted.key,
    label: CATEGORY_META.potted.homeLabel,
    image: localImage('potted/green-potted-01.jpg'),
  },
  {
    key: CATEGORY_META.sympathy.key,
    label: CATEGORY_META.sympathy.homeLabel,
    image: localImage('sympathy/sympathy-white-01.jpg'),
  },
]

const sharedCareNotes = [
  '每 7～10 天少量澆水一次，保持根部透氣。',
  '避免直曬與高溫風口，放在通風明亮處最剛好。',
  '不要讓根部長時間泡在積水裡。',
]

export const products = [
  {
    id: 'peony-blush-01',
    name: '牡丹柔粉花束',
    category: CATEGORY_META.basket.key,
    image: localImage('baskets/pink-rose-bouquet-01.jpg'),
    gallery: [
      localImage('baskets/pink-rose-bouquet-01.jpg'),
      localImage('baskets/pink-rose-arrangement-01.jpg'),
      localImage('baskets/colorful-arrangement-01.jpg'),
    ],
    originalPrice: 85,
    memberPrice: 78,
    description: '柔粉色調的季節花束，輕盈、溫柔，也很適合祝賀與日常送禮。',
    tag: '新品',
    badge: '新品上市',
    variantLabel: '招牌包裝',
    careNotes: sharedCareNotes,
    deliveryCopy: '可安排同城配送，適合當天送禮與預約送達。',
    sourcingCopy: '以當季花材搭配，保留自然線條與乾淨層次。',
  },
  {
    id: 'midnight-ranunculus-02',
    name: '暮色花瓣花束',
    category: CATEGORY_META.basket.key,
    image: localImage('baskets/burgundy-arrangement-01.jpg'),
    gallery: [
      localImage('baskets/burgundy-arrangement-01.jpg'),
      localImage('baskets/red-bouquet-01.jpg'),
      localImage('baskets/rose-arrangement-01.jpg'),
    ],
    originalPrice: 110,
    memberPrice: 98,
    description: '深酒紅與柔粉交疊的花束，帶著一點夜色感，氣質安靜但很有記憶點。',
    tag: '熱銷',
    badge: '熱銷款',
    variantLabel: '高級包裝',
    careNotes: sharedCareNotes,
    deliveryCopy: '適合節慶、約會與需要更有儀式感的送花時刻。',
    sourcingCopy: '以高質感花材與層疊比例完成編排，視覺更完整。',
  },
  {
    id: 'dune-hydrangea-03',
    name: '沙丘繡球盆花',
    category: CATEGORY_META.potted.key,
    image: localImage('potted/pastel-potted-01.jpg'),
    gallery: [
      localImage('potted/pastel-potted-01.jpg'),
      localImage('potted/white-potted-01.jpg'),
      localImage('potted/white-potted-02.jpg'),
    ],
    originalPrice: 95,
    memberPrice: 85,
    description: '柔和淺色系的盆花，輪廓安穩，擺在空間裡會很有靜靜發光的感覺。',
    tag: '新品',
    badge: '新品上市',
    variantLabel: '霧感陶盆',
    careNotes: sharedCareNotes,
    deliveryCopy: '很適合空間陳列、桌面點綴與不張揚的送禮場合。',
    sourcingCopy: '以自然感植栽與柔霧花色構成，整體更顯柔和。',
  },
  {
    id: 'spring-awakening-04',
    name: '春日甦醒花禮',
    category: CATEGORY_META.basket.key,
    image: localImage('baskets/colorful-arrangement-01.jpg'),
    gallery: [
      localImage('baskets/colorful-arrangement-01.jpg'),
      localImage('baskets/colorful-arrangement-02.jpg'),
      localImage('baskets/opening-bouquet-01.jpg'),
    ],
    originalPrice: 135,
    memberPrice: 120,
    description: '花量飽滿、色彩明亮的祝賀花禮，帶著很直接的喜氣與好心情。',
    tag: '限定',
    badge: '季節款',
    variantLabel: '禮盒包裝',
    careNotes: sharedCareNotes,
    deliveryCopy: '很適合開幕、升遷、慶祝與需要大方一點的場合。',
    sourcingCopy: '以當季花材層疊打造，讓整體更有豐盛感。',
  },
  {
    id: 'alba-orchid-05',
    name: '白羽蝴蝶蘭',
    category: CATEGORY_META.orchid.key,
    image: localImage('orchids/white-orchid-01.jpg'),
    gallery: [
      localImage('orchids/white-orchid-01.jpg'),
      localImage('orchids/white-orchid-02.jpg'),
      localImage('orchids/hanging-orchid-01.jpg'),
    ],
    originalPrice: 145,
    memberPrice: 125,
    description: '如羽毛般輕盈的白色蝴蝶蘭，適合想要安定、簡潔又高級的送禮場景。',
    tag: '熱銷',
    badge: '招牌款',
    variantLabel: '霧黑花器',
    careNotes: sharedCareNotes,
    deliveryCopy: '適合正式空間、辦公室與重要祝賀場合。',
    sourcingCopy: '以清晰線條與留白感打造，整體更俐落也更耐看。',
    swatches: ['霧黑', '珍珠白', '淺石灰'],
  },
  {
    id: 'monstera-deliciosa-06',
    name: '龜背芋綠意盆栽',
    category: CATEGORY_META.potted.key,
    image: localImage('potted/green-potted-01.jpg'),
    gallery: [
      localImage('potted/green-potted-01.jpg'),
      localImage('potted/glass-potted-01.jpg'),
      localImage('potted/window-potted-01.jpg'),
    ],
    originalPrice: 85,
    memberPrice: 75,
    description: '葉型飽滿、綠意很穩的植栽，呈現出乾淨又不費力的生活感。',
    tag: '熱銷',
    badge: '人氣植栽',
    variantLabel: '陶盆',
    careNotes: sharedCareNotes,
    deliveryCopy: '很適合工作桌、客廳角落或需要一點綠意的空間。',
    sourcingCopy: '挑選生長線條穩定的植株，讓整體更耐看。',
  },
  {
    id: 'dusk-and-dawn-07',
    name: '暮曉花束',
    category: CATEGORY_META.basket.key,
    image: localImage('baskets/rose-arrangement-01.jpg'),
    gallery: [
      localImage('baskets/rose-arrangement-01.jpg'),
      localImage('baskets/pink-lily-bouquet-01.jpg'),
      localImage('baskets/red-bouquet-01.jpg'),
    ],
    originalPrice: 195,
    memberPrice: 170,
    description: '深色與柔粉交錯的非對稱花束，視覺層次很強，也很有作品感。',
    tag: '限定',
    badge: '編輯款',
    variantLabel: '精裝包裝',
    careNotes: sharedCareNotes,
    deliveryCopy: '適合重要紀念日、展演送禮與更正式的慶賀需求。',
    sourcingCopy: '整體以藝術感比例構成，讓花束更像一件作品。',
  },
  {
    id: 'tuscan-olive-tree-08',
    name: '托斯卡尼橄欖樹',
    category: CATEGORY_META.potted.key,
    image: localImage('potted/window-potted-01.jpg'),
    gallery: [
      localImage('potted/window-potted-01.jpg'),
      localImage('potted/minimal-potted-01.jpg'),
      localImage('potted/red-tulip-potted-01.jpg'),
    ],
    originalPrice: 110,
    memberPrice: 95,
    description: '帶有地中海氣質的樹型盆栽，輪廓清爽，放在空間裡會很穩。',
    tag: '新品',
    badge: '植感',
    variantLabel: '水泥盆',
    careNotes: sharedCareNotes,
    deliveryCopy: '適合安靜的角落、書房或工作空間，氣質很自然。',
    sourcingCopy: '以樹型線條與自然枝葉為主，強調空間平衡。',
  },
  {
    id: 'quiet-comfort-09',
    name: '靜謐致意花禮',
    category: CATEGORY_META.sympathy.key,
    image: localImage('sympathy/sympathy-white-01.jpg'),
    gallery: [
      localImage('sympathy/sympathy-white-01.jpg'),
      localImage('sympathy/sympathy-white-02.jpg'),
      localImage('sympathy/sympathy-white-03.jpg'),
    ],
    originalPrice: 160,
    memberPrice: 140,
    description: '以純白百合與柔和綠葉構成，適合表達安靜、誠懇的心意。',
    tag: '細緻',
    badge: '弔唁',
    variantLabel: '象牙白包裝',
    careNotes: sharedCareNotes,
    deliveryCopy: '以更安靜的方式送達，適合追思與致意場合。',
    sourcingCopy: '保留留白與純淨感，讓整體更有安定力量。',
  },
  {
    id: 'archival-mix-10',
    name: '檔案乾燥花束',
    category: CATEGORY_META.dried.key,
    image: localImage('potted/dried-potted-01.jpg'),
    gallery: [
      localImage('potted/dried-potted-01.jpg'),
      localImage('sympathy/sympathy-white-yellow-01.jpg'),
      localImage('potted/minimal-potted-01.jpg'),
    ],
    originalPrice: 130,
    memberPrice: 115,
    description: '以乾燥花材與細長線條組成，耐看、耐放，也很有收藏感。',
    tag: '限定',
    badge: '乾燥',
    variantLabel: '自然容器',
    careNotes: [
      '保持乾燥，避免受潮。',
      '以柔軟刷具輕拂灰塵即可。',
      '避免重壓以維持花型。',
    ],
    deliveryCopy: '適合書架、櫃面與想要長時間保留的空間擺飾。',
    sourcingCopy: '以乾燥葉材與果實結構組成，讓質感更立體。',
  },
  {
    id: 'verdant-fern-11',
    name: '翠意蕨影',
    category: CATEGORY_META.potted.key,
    image: localImage('potted/daisy-potted-01.jpg'),
    gallery: [
      localImage('potted/daisy-potted-01.jpg'),
      localImage('potted/white-potted-02.jpg'),
      localImage('potted/green-potted-01.jpg'),
    ],
    originalPrice: 65,
    memberPrice: 58,
    description: '小巧的綠意植栽，能為桌面和角落補上一點清新感。',
    tag: '熱銷',
    badge: '綠意',
    variantLabel: '陶盆',
    careNotes: sharedCareNotes,
    deliveryCopy: '很適合辦公桌、窗邊與需要柔和綠意的地方。',
    sourcingCopy: '挑選葉型舒展的植株，讓整體看起來更輕盈。',
  },
  {
    id: 'roseate-orchid-12',
    name: '玫粉蝴蝶蘭',
    category: CATEGORY_META.orchid.key,
    image: localImage('orchids/pink-orchid-01.jpg'),
    gallery: [
      localImage('orchids/pink-orchid-01.jpg'),
      localImage('orchids/white-orchid-03.jpg'),
      localImage('orchids/white-orchid-04.jpg'),
    ],
    originalPrice: 135,
    memberPrice: 120,
    description: '帶有柔粉色調的蝴蝶蘭，溫柔、優雅，也很適合送給重要的人。',
    tag: '精選',
    badge: '蝴蝶蘭',
    variantLabel: '暖色花器',
    careNotes: sharedCareNotes,
    deliveryCopy: '適合需要更柔和氛圍的祝賀與居家擺設。',
    sourcingCopy: '以穩定花型與柔和色階為主，讓畫面更完整。',
  },
  {
    id: 'dune-grasses-13',
    name: '沙丘草穗',
    category: CATEGORY_META.dried.key,
    image: localImage('potted/dried-potted-01.jpg'),
    gallery: [
      localImage('potted/dried-potted-01.jpg'),
      localImage('potted/minimal-potted-01.jpg'),
      localImage('sympathy/sympathy-white-yellow-01.jpg'),
    ],
    originalPrice: 85,
    memberPrice: 76,
    description: '線條感很強的乾燥花束，輕盈、安靜，放久了也很有韻味。',
    tag: '新品',
    badge: '乾燥',
    variantLabel: '自然花器',
    careNotes: [
      '保持乾燥並遠離潮濕。',
      '需要時輕輕除塵即可。',
      '避免直接碰水。',
    ],
    deliveryCopy: '適合想要長久保留的桌面擺飾與溫柔禮物。',
    sourcingCopy: '用質地與線條取代繁複花量，讓整體更安靜。',
  },
]

export function getCategoryLabel(categoryKey) {
  return categories.find((item) => item.key === categoryKey)?.label || categoryKey
}

export function getHomeCategoryLabel(categoryKey) {
  return homeCategories.find((item) => item.key === categoryKey)?.label || categoryKey
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId)
}

export function getRelatedProducts(currentProductId, categoryKey) {
  return products
    .filter((product) => product.id !== currentProductId && product.category === categoryKey)
    .slice(0, 4)
}
