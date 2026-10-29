import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'
import RecentlyViewed from './components/RecentlyViewed.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  const [vendors, setVendors] = useState(null) // null until the fetch finishes
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0) // bump it to fetch again

  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([]) // each line is { item, qty }
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const [lastOrder, setLastOrder] = useState(null)
  const [recentlyViewed, setRecentlyViewed] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setVendors(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })

    // cleanup: cancel the request if the component unmounts or reloadKey changes
    return () => controller.abort()
  }, [reloadKey])

  function handleRetry() {
    setError(null)
    setVendors(null)
    setReloadKey((k) => k + 1)
  }

  function handleView(item) {
    // newest first, no duplicates, max 5
    setRecentlyViewed((prev) => [item, ...prev.filter((v) => v.id !== item.id)].slice(0, 5))
  }

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id)
      if (existing) {
        return prevCart.map((line) => (line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line))
      }
      return [...prevCart, { item, qty: 1 }] // a NEW array, never cart.push()
    })
  }

  function handleChangeQty(id, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => (line.item.id === id ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0),
    )
  }

  function handleRemove(id) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== id))
  }

  function handlePlaceOrder(details) {
    setLastOrder({ ...details, lines: cart })
    setCart([])
    setView('done')
  }

  function renderMenu() {
    if (error) return <ErrorMessage message={error} onRetry={handleRetry} />
    if (!vendors) return <Loading text="Loading vendors…" />

    const selectedVendor = vendors.find((v) => v.id === selectedVendorId) ?? vendors[0]

    return (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendor.id}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>
          <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} onView={handleView} />
        </section>
        <RecentlyViewed items={recentlyViewed} onClear={() => setRecentlyViewed([])} />
      </>
    )
  }

  return (
    <>
      <Header cartCount={cartCount} view={view} onNavigate={setView} />
      <main className="container">
        {view === 'menu' && renderMenu()}

        {view === 'cart' && (
          <section>
            <h2 className="section-title">Your cart</h2>
            <CartPage
              cart={cart}
              onChangeQty={handleChangeQty}
              onRemove={handleRemove}
              onPlaceOrder={handlePlaceOrder}
            />
          </section>
        )}

        {view === 'done' && lastOrder && (
          <section className="card done">
            <h2 className="section-title">Order placed</h2>
            <p>
              Thanks, {lastOrder.name} (Mahallah {lastOrder.mahallah})! Pick up your order at{' '}
              {lastOrder.pickupTime}.
            </p>
            <button type="button" className="btn" onClick={() => setView('menu')}>
              Back to menu
            </button>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
