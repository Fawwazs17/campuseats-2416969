import { useEffect, useState } from 'react'

// Loads public/api/vendors.json. retry() fetches it again after an error.
function useVendors() {
  const [vendors, setVendors] = useState(null) // null until the fetch finishes
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0) // bump it to fetch again

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

  function retry() {
    setError(null)
    setVendors(null)
    setReloadKey((k) => k + 1)
  }

  return { vendors, error, loading: !vendors && !error, retry }
}

export default useVendors
