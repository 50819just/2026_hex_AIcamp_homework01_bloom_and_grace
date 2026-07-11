export const referenceImages = {
  heroBanner: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&auto=format&fit=crop&q=80',
  floristStory: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=900&auto=format&fit=crop&q=80',
  memberWelcome: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=900&auto=format&fit=crop&q=80',
  memberProfile: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=900&auto=format&fit=crop&q=80',
  addressBook: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=900&auto=format&fit=crop&q=80',
  orchid: [
    'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=900&auto=format&fit=crop&q=80',
  ],
  basket: [
    'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=900&auto=format&fit=crop&q=80',
  ],
  potted: [
    'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?w=900&auto=format&fit=crop&q=80',
  ],
  sympathy: [
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=900&auto=format&fit=crop&q=80',
  ],
}

export function getReferenceProductImage(category, index = 0) {
  const imageGroup = referenceImages[category] || referenceImages.orchid
  return imageGroup[index % imageGroup.length]
}
