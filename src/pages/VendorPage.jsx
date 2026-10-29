import { Link, useParams } from 'react-router-dom'
import MenuList from '../components/MenuList.jsx'
import RecentlyViewed from '../components/RecentlyViewed.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import useVendors from '../hooks/useVendors.js'
import useCart from '../hooks/useCart.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import NotFoundPage from './NotFoundPage.jsx'

function VendorPage() {
  const { vendorId } = useParams() // from the :vendorId part of the URL
  const { vendors, error, loading, retry } = useVendors()
  const { addToCart } = useCart()
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('campuseats-recent', [])

  function handleView(item) {
    // newest first, no duplicates, max 5
    setRecentlyViewed((prev) => [item, ...prev.filter((v) => v.id !== item.id)].slice(0, 5))
  }

  if (loading) return <Loading text="Loading menu…" />
  if (error) return <ErrorMessage message={error} onRetry={retry} />

  const vendor = vendors.find((v) => v.id === vendorId)
  if (!vendor) return <NotFoundPage />

  return (
    <>
      <p>
        <Link to="/">← All vendors</Link>
      </p>
      <section>
        <h2 className="section-title">Menu: {vendor.name}</h2>
        <p className="muted">
          {vendor.location} · Open {vendor.openHours}
        </p>
        <MenuList items={vendor.menu} onAdd={addToCart} onView={handleView} />
      </section>
      <RecentlyViewed items={recentlyViewed} onClear={() => setRecentlyViewed([])} />
    </>
  )
}

export default VendorPage
