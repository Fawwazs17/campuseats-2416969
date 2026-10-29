import { useEffect, useState } from 'react'

// Like useState, but the value is saved in localStorage and survives a page refresh.
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue // storage blocked or the saved text is not valid JSON
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or blocked: keep working with state only
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
