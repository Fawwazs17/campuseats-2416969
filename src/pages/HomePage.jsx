import VendorCard from '../components/VendorCard.jsx'
import RecentlyViewed from '../components/RecentlyViewed.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import useVendors from '../hooks/useVendors.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  // same key as VendorPage, so items viewed there show up here
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('campuseats-recent', [])

  if (loading) return <Loading text="Loading vendors…" />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <>
      <section>
        <h2 className="section-title">Choose a vendor</h2>
        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>
      <RecentlyViewed items={recentlyViewed} onClear={() => setRecentlyViewed([])} />
    </>
  )
}

export default HomePage
