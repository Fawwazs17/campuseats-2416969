import { Link, useParams } from 'react-router'
import MenuList from '../components/MenuList.jsx'
import RecentlyViewed from '../components/RecentlyViewed.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import useVendors from '../hooks/useVendors.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

function VendorPage() {
  const { id } = useParams() // from the :id part of the URL, e.g. /vendor/2416969-kedai-ayam-gunting
  const { vendors, loading, error, reload } = useVendors()
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('campuseats-recent', [])

  function handleView(item) {
    // newest first, no duplicates, max 5; keep the vendor id so the link can go back to this page
    const viewed = { ...item, vendorId: id }
    setRecentlyViewed((prev) => [viewed, ...prev.filter((v) => v.id !== item.id)].slice(0, 5))
  }

  if (loading) return <Loading text="Loading menu…" />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)
  if (!vendor) {
    return (
      <section className="card">
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">There is no vendor called “{id}”.</p>
        <Link to="/">Back to vendors</Link>
      </section>
    )
  }

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
        <MenuList items={vendor.menu} onView={handleView} />
      </section>
      <RecentlyViewed items={recentlyViewed} onClear={() => setRecentlyViewed([])} />
    </>
  )
}

export default VendorPage
