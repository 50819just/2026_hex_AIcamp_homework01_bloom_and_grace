import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import MemberModal from './components/MemberModal'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import AdminPage from './pages/AdminPage'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProfilePage from './pages/ProfilePage'
import ShopPage from './pages/ShopPage'
import { getCategoryLabel, getProductById, products } from './data/products'
import { navigateTo, useRouter } from './hooks/useRouter'
import { fetchProducts } from './lib/api'

function enrichProduct(product) {
  return {
    ...product,
    categoryLabel: getCategoryLabel(product.category),
  }
}

function App() {
  const { path } = useRouter()
  const [isMember, setIsMember] = useState(false)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [feedbackMessage, setFeedbackMessage] = useState('登入會員後可享會員價，加入購物車時會看到更清楚的價格差異。')
  const [toastMessage, setToastMessage] = useState('')
  const [productListState, setProductListState] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const loadedProducts = await fetchProducts()
        setProductListState(loadedProducts.map(enrichProduct))
      } catch {
        setProductListState(products.map(enrichProduct))
        setFeedbackMessage('目前使用前端內建商品資料，若要啟用上架後台請一起啟動本地 server。')
      }
    }

    loadProducts()
  }, [])

  const showToast = (message) => {
    setToastMessage('')

    window.setTimeout(() => {
      setToastMessage(message)

      window.setTimeout(() => {
        setToastMessage('')
      }, 2200)
    }, 10)
  }

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

    setFeedbackMessage(`${product.name} 已加入購物車，${isMember ? '會員價已套用顯示。' : '登入後可享會員價。'}`)
    showToast(`${product.name} 已加入購物車`)
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
    setFeedbackMessage('商品已從購物車移除。')
    if (removedItem) {
      showToast(`${removedItem.name} 已從購物車移除`)
    }
  }

  const toggleMember = () => {
    setIsMember((previous) => !previous)
    setIsMemberModalOpen(false)
    setFeedbackMessage(
      isMember
        ? '目前已切換為訪客狀態，商品仍可瀏覽，但會員價僅作為示意。'
        : '已模擬登入會員，購物車與商品頁將以會員價為主要優惠顯示。',
    )
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
          setFeedbackMessage('請依序確認商品、送貨資訊與付款方式。')
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
        onNotify={setFeedbackMessage}
        onCheckoutSuccess={() => showToast('訂單已建立，正在導向綠界付款頁')}
      />
    )
  } else if (path === '/admin') {
    pageContent = (
      <AdminPage
        onProductsUpdate={(nextProducts) => setProductListState(nextProducts.map(enrichProduct))}
        onNotify={setFeedbackMessage}
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

      <div className="announcement-bar">{feedbackMessage}</div>
      <Toast message={toastMessage} isVisible={Boolean(toastMessage)} />

      <main className="main-content">{pageContent}</main>

      <Footer />

      <MemberModal
        isOpen={isMemberModalOpen}
        isMember={isMember}
        onClose={() => setIsMemberModalOpen(false)}
        onToggleMember={toggleMember}
      />
    </div>
  )
}

export default App
