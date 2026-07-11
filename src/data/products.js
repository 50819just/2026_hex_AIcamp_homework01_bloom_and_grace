import { getReferenceProductImage } from './referenceImages'

const CATEGORY_META = {
  orchid: {
    key: 'orchid',
    label: '蝴蝶蘭',
    tone: 'rose',
  },
  basket: {
    key: 'basket',
    label: '花籃',
    tone: 'gold',
  },
  potted: {
    key: 'potted',
    label: '盆花',
    tone: 'green',
  },
  sympathy: {
    key: 'sympathy',
    label: '追思花禮',
    tone: 'lavender',
  },
}

export const categories = [
  { key: 'all', label: '全部' },
  { key: CATEGORY_META.orchid.key, label: CATEGORY_META.orchid.label },
  { key: CATEGORY_META.basket.key, label: CATEGORY_META.basket.label },
  { key: CATEGORY_META.potted.key, label: CATEGORY_META.potted.label },
  { key: CATEGORY_META.sympathy.key, label: CATEGORY_META.sympathy.label },
]

export const products = [
  {
    id: 'test-flower-1-dollar',
    name: '人造花用具',
    category: CATEGORY_META.potted.key,
    image: getReferenceProductImage('potted', 0),
    originalPrice: 1,
    memberPrice: 1,
    description: '人造花材整理與包裝用的小型測試商品，方便快速確認購物與付款流程。',
    tag: '$1 測試商品',
  },
  {
    id: 'orchid-aurora-01',
    name: '晨曦粉霧蝴蝶蘭',
    category: CATEGORY_META.orchid.key,
    image: getReferenceProductImage('orchid', 0),
    originalPrice: 5680,
    memberPrice: 5180,
    description: '柔粉花瓣搭配奶白陶盆，適合升遷與溫柔送禮場合。',
    tag: '人氣熱銷',
  },
  {
    id: 'orchid-luna-02',
    name: '月映白金蝴蝶蘭',
    category: CATEGORY_META.orchid.key,
    image: getReferenceProductImage('orchid', 1),
    originalPrice: 6880,
    memberPrice: 6280,
    description: '高雅白色蝴蝶蘭搭配淡金緞帶，適合開幕誌慶與品牌贈禮。',
    tag: '開幕首選',
  },
  {
    id: 'orchid-muse-03',
    name: '紫霧晨露蝴蝶蘭',
    category: CATEGORY_META.orchid.key,
    image: getReferenceProductImage('orchid', 2),
    originalPrice: 7280,
    memberPrice: 6680,
    description: '帶有漸層紫韻的蝴蝶蘭，優雅而細緻，適合重要節慶祝賀。',
    tag: '會員優惠',
  },
  {
    id: 'basket-opus-04',
    name: '盛放祝賀花籃',
    category: CATEGORY_META.basket.key,
    image: getReferenceProductImage('basket', 0),
    originalPrice: 4280,
    memberPrice: 3890,
    description: '明亮色系花材與金色包裝，適合開幕、喬遷與演出祝賀。',
    tag: '開幕首選',
  },
  {
    id: 'basket-harmony-05',
    name: '暖陽典雅花籃',
    category: CATEGORY_META.basket.key,
    image: getReferenceProductImage('basket', 1),
    originalPrice: 4980,
    memberPrice: 4520,
    description: '暖橘與香檳金配色，視覺飽滿，適合品牌合作送禮。',
    tag: '人氣熱銷',
  },
  {
    id: 'basket-verdant-06',
    name: '綠意開幕祝福花籃',
    category: CATEGORY_META.basket.key,
    image: getReferenceProductImage('basket', 2),
    originalPrice: 4580,
    memberPrice: 4120,
    description: '加入綠葉層次與雅緻蘭花點綴，讓祝福更顯大器。',
    tag: '會員優惠',
  },
  {
    id: 'potted-velvet-07',
    name: '霧粉玫瑰盆花',
    category: CATEGORY_META.potted.key,
    image: getReferenceProductImage('potted', 0),
    originalPrice: 2480,
    memberPrice: 2280,
    description: '小巧柔和的桌上型盆花，適合生日與紀念日禮物。',
    tag: '人氣熱銷',
  },
  {
    id: 'potted-olive-08',
    name: '靜謐綠意盆花',
    category: CATEGORY_META.potted.key,
    image: getReferenceProductImage('potted', 1),
    originalPrice: 2180,
    memberPrice: 1990,
    description: '以綠植與淡色花材搭配，適合辦公空間與溫柔居家佈置。',
    tag: '會員優惠',
  },
  {
    id: 'potted-garden-09',
    name: '奶霜花園盆景',
    category: CATEGORY_META.potted.key,
    image: getReferenceProductImage('potted', 2),
    originalPrice: 2880,
    memberPrice: 2590,
    description: '多層次季節花材盆景，帶出花園般的輕盈感。',
    tag: '季節推薦',
  },
  {
    id: 'sympathy-serene-10',
    name: '靜心追思花禮',
    category: CATEGORY_META.sympathy.key,
    image: getReferenceProductImage('sympathy', 0),
    originalPrice: 3680,
    memberPrice: 3380,
    description: '白色與淡紫花材低調呈現，傳達溫柔而莊重的心意。',
    tag: '溫柔致意',
  },
  {
    id: 'sympathy-grace-11',
    name: '安然白緞追思盆花',
    category: CATEGORY_META.sympathy.key,
    image: getReferenceProductImage('sympathy', 1),
    originalPrice: 3280,
    memberPrice: 2990,
    description: '清透白色系搭配柔霧葉材，適合追思與告別場合。',
    tag: '莊重首選',
  },
  {
    id: 'orchid-golden-12',
    name: '香檳金雙梗蝴蝶蘭',
    category: CATEGORY_META.orchid.key,
    image: getReferenceProductImage('orchid', 0),
    originalPrice: 5980,
    memberPrice: 5480,
    description: '雙梗蝴蝶蘭搭配香檳色包裝，適合送長輩與正式商務致意。',
    tag: '品牌精選',
  },
]

export function getCategoryLabel(categoryKey) {
  return categories.find((item) => item.key === categoryKey)?.label || categoryKey
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId)
}

export function getRelatedProducts(currentProductId, categoryKey) {
  return products
    .filter((product) => product.id !== currentProductId && product.category === categoryKey)
    .slice(0, 3)
}
