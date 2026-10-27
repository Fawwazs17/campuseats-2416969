import { useState } from 'react'
import vendors from './data/vendors.js'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './pages/CartPage.jsx'
import RecentlyViewed from './components/RecentlyViewed.jsx'

function App() {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id)
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
  const [cart, setCart] = useState([]) // each line is a menu item plus qty
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const [lastOrder, setLastOrder] = useState(null)
  const [recentlyViewed, setRecentlyViewed] = useState([])

  function handleView(item) {
    // newest first, no duplicates, max 5
    setRecentlyViewed((prev) => [item, ...prev.filter((v) => v.id !== item.id)].slice(0, 5))
  }

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.id === item.id)
      if (existing) {
        return prevCart.map((line) => (line.id === item.id ? { ...line, qty: line.qty + 1 } : line))
      }
      return [...prevCart, { ...item, qty: 1 }] // a NEW array, never cart.push()
    })
  }

  function handleIncrease(id) {
    setCart((prevCart) => prevCart.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line)))
  }

  function handleDecrease(id) {
    setCart((prevCart) =>
      prevCart
        .map((line) => (line.id === id ? { ...line, qty: line.qty - 1 } : line))
        .filter((line) => line.qty > 0),
    )
  }

  function handlePlaceOrder(details) {
    setLastOrder({ ...details, items: cart })
    setCart([])
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="container">
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
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
        <section>
          <h2 className="section-title">Your cart</h2>
          {lastOrder && (
            <p className="notice">
              Thanks, {lastOrder.name}! Your order is placed. Pick it up at {lastOrder.pickupTime}.
            </p>
          )}
          <CartPage
            cart={cart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onPlaceOrder={handlePlaceOrder}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
