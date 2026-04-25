import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import MemberModal from './components/MemberModal'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import AdminPage from './pages/AdminPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProfilePage from './pages/ProfilePage'
import ShopPage from './pages/ShopPage'
import { getCategoryLabel, getProductById, products } from './data/products'
import { navigateTo, useRouter } from './hooks/useRouter'
import { fetchMemberProfile, fetchProducts } from './lib/api'

function enrichProduct(product) {
  return {
    ...product,
    categoryLabel: getCategoryLabel(product.category),
  }
}

function getToastTone(message, preferredTone) {
  if (preferredTone) {
    return preferredTone
  }

  if (/失敗|錯誤|不一致|無法|請先|請輸入|至少|未完成/.test(message)) {
    return 'error'
  }

  if (/移除|刪除/.test(message)) {
    return 'remove'
  }

  if (/正在|目前|示意/.test(message)) {
    return 'info'
  }

  return 'success'
}

function App() {
  const { path } = useRouter()
  const [isMember, setIsMember] = useState(false)
  const [memberProfile, setMemberProfile] = useState({
    name: 'Grace Lin',
    email: 'member@bloomandgrace.tw',
    phone: '0912-345-678',
    level: 'Bloom Select',
    joinedAt: '2026-03-08',
    birthday: '1996-05-20',
    favoriteCategories: ['蝴蝶蘭', '花籃'],
    stats: {
      cartCount: 0,
      savedRecipients: 2,
      yearlyOrders: 6,
      memberDiscountLabel: '95 折示意',
    },
    addresses: [],
    orders: [],
  })
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [toast, setToast] = useState({ message: '', tone: 'success' })
  const [productListState, setProductListState] = useState([])

  const marqueeMessages = [
    'Bloom & Grace｜以花傳遞祝福、感謝與思念',
    '蝴蝶蘭、花籃、盆花與追思花禮，陪你度過每個重要時刻',
    '登入會員即可查看會員價，享受更完整的花店選品體驗',
    '現在可從購物車前往結帳，並串接綠界付款流程',
  ]

  const showToast = useCallback((message, tone) => {
    setToast({ message: '', tone: getToastTone(message, tone) })

    window.setTimeout(() => {
      setToast({ message, tone: getToastTone(message, tone) })

      window.setTimeout(() => {
        setToast((currentToast) => ({ ...currentToast, message: '' }))
      }, 2400)
    }, 10)
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const loadedProducts = await fetchProducts()
        setProductListState(loadedProducts.map(enrichProduct))
      } catch {
        setProductListState(products.map(enrichProduct))
        showToast('目前使用前端內建商品資料，若要啟用上架後台請一起啟動本地 server', 'info')
      }
    }

    loadProducts()
  }, [showToast])
  const productList = useMemo(
    () => (productListState.length > 0 ? productListState : products.map(enrichProduct)),
    [productListState],
  )

  const filteredProducts = useMemo(() => {
    return productList.filter((product) => {
      const matchesCategory = currentCategory === 'all' || product.category === currentCategory
      const normalizedSearch = searchText.trim().toLowerCase()
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.tag.toLowerCase().includes(normalizedSearch) ||
        product.categoryLabel.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [currentCategory, productList, searchText])

  const activeProductId = path.startsWith('/products/') ? path.replace('/products/', '') : ''
  const activeProduct = activeProductId
    ? productList.find((product) => product.id === activeProductId) || enrichProduct(getProductById(activeProductId))
    : null
  const relatedProducts = activeProduct
    ? productList
        .filter((product) => product.id !== activeProduct.id && product.category === activeProduct.category)
        .slice(0, 3)
    : []

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  const totals = cartItems.reduce(
    (summary, item) => {
      summary.originalTotal += item.originalPrice * item.quantity
      summary.memberTotal += item.memberPrice * item.quantity
      return summary
    },
    { originalTotal: 0, memberTotal: 0 },
  )

  const cartSummary = {
    originalTotal: totals.originalTotal,
    currentTotal: isMember ? totals.memberTotal : totals.originalTotal,
    discount: totals.originalTotal - totals.memberTotal,
  }

  const handleAddToCart = (product, quantity) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find((item) => item.id === product.id)

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...previousItems, { ...product, quantity }]
    })

    showToast(`${product.name} 已加入購物車`, 'success')
    setSelectedQuantity(1)
  }

  const handleIncreaseCartItem = (productId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const handleDecreaseCartItem = (productId) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleRemoveCartItem = (productId) => {
    const removedItem = cartItems.find((item) => item.id === productId)
    setCartItems((previousItems) => previousItems.filter((item) => item.id !== productId))
    if (removedItem) {
      showToast(`${removedItem.name} 已從購物車移除`, 'remove')
    }
  }

  const handleMemberLogin = async (profile) => {
    const fallbackProfile = {
      ...memberProfile,
      name: profile.name,
      email: profile.email,
    }

    setIsMember(true)
    setMemberProfile(fallbackProfile)
    setIsMemberModalOpen(false)

    try {
      const remoteProfile = await fetchMemberProfile(profile.email)
      setMemberProfile({
        ...remoteProfile,
        name: profile.name || remoteProfile.name,
        email: profile.email || remoteProfile.email,
      })
    } catch {
      showToast('會員資料先以前端示意顯示，稍後可再接真實會員 API', 'info')
    }
  }


  const handleMemberLogout = () => {
    setIsMember(false)
    setIsMemberModalOpen(false)
    showToast('已登出會員，目前以訪客身份瀏覽', 'info')
  }

  let pageContent = null

  if (path === '/shop') {
    pageContent = (
      <ShopPage
        products={filteredProducts}
        isMember={isMember}
        currentCategory={currentCategory}
        searchText={searchText}
        onCategoryChange={setCurrentCategory}
        onSearchChange={setSearchText}
        onAddToCart={handleAddToCart}
      />
    )
  } else if (path === '/about') {
    pageContent = <AboutPage />
  } else if (path === '/profile') {
    pageContent = (
      <ProfilePage
        isMember={isMember}
        memberProfile={memberProfile}
        cartCount={cartCount}
        onOpenMemberModal={() => setIsMemberModalOpen(true)}
      />
    )
  } else if (path === '/cart') {
    pageContent = (
      <CartPage
        cartItems={cartItems}
        isMember={isMember}
        totals={cartSummary}
        onIncreaseQuantity={handleIncreaseCartItem}
        onDecreaseQuantity={handleDecreaseCartItem}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          showToast('請依序確認商品、送貨資訊與付款方式', 'info')
          navigateTo('/checkout')
        }}
      />
    )
  } else if (path === '/checkout') {
    pageContent = (
      <CheckoutPage
        cartItems={cartItems}
        isMember={isMember}
        totals={cartSummary}
        onNotify={showToast}
        onCheckoutSuccess={() => showToast('訂單已建立，正在導向綠界付款頁', 'info')}
      />
    )
  } else if (path === '/admin') {
    pageContent = isAdminAuthenticated ? (
      <AdminPage
        onProductsUpdate={(nextProducts) => setProductListState(nextProducts.map(enrichProduct))}
        onNotify={showToast}
      />
    ) : (
      <AdminLoginPage
        onAdminLogin={() => setIsAdminAuthenticated(true)}
        onNotify={showToast}
      />
    )
  } else if (path.startsWith('/products/')) {
    pageContent = (
      <ProductDetailPage
        product={activeProduct}
        relatedProducts={relatedProducts}
        quantity={selectedQuantity}
        isMember={isMember}
        onIncreaseQuantity={() => setSelectedQuantity((previous) => previous + 1)}
        onDecreaseQuantity={() => setSelectedQuantity((previous) => Math.max(1, previous - 1))}
        onAddToCart={handleAddToCart}
      />
    )
  } else {
    pageContent = (
      <HomePage
        isMember={isMember}
        onAddToCart={handleAddToCart}
        onOpenMemberModal={() => setIsMemberModalOpen(true)}
      />
    )
  }

  return (
    <div className="app-shell">
      <Navbar
        cartCount={cartCount}
        isMember={isMember}
        onToggleMemberModal={() => setIsMemberModalOpen(true)}
      />

      <div className="announcement-bar">
        <div className="announcement-marquee">
          <div className="announcement-marquee-track">
            {[...marqueeMessages, ...marqueeMessages].map((message, index) => (
              <span key={`${message}-${index}`}>{message}</span>
            ))}
          </div>
        </div>
      </div>
      <Toast message={toast.message} tone={toast.tone} isVisible={Boolean(toast.message)} />

      <main className="main-content">{pageContent}</main>

      <Footer />

      <MemberModal
        isOpen={isMemberModalOpen}
        isMember={isMember}
        onClose={() => setIsMemberModalOpen(false)}
        onMemberLogin={handleMemberLogin}
        onMemberLogout={handleMemberLogout}
        onNotify={showToast}
      />
    </div>
  )
}

export default App
