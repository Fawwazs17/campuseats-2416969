import CartContext from './CartContext.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

// Holds the cart and past orders so every page can read them with useCart().
function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', []) // each line is { item, qty }
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id)
      if (existing) {
        return prevCart.map((line) => (line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line))
      }
      return [...prevCart, { item, qty: 1 }] // a NEW array, never cart.push()
    })
  }

  function changeQty(id, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => (line.item.id === id ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0),
    )
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== id))
  }

  function placeOrder(details) {
    const order = { id: Date.now(), placedAt: new Date().toISOString(), ...details, lines: cart, total }
    setOrders((prev) => [order, ...prev]) // newest first
    setCart([])
    return order
  }

  const value = { cart, cartCount, total, orders, addToCart, changeQty, removeFromCart, placeOrder }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
