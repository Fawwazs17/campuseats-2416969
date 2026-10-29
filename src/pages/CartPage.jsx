import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import useCart from '../hooks/useCart.js'

function CartPage() {
  const { cart, total, changeQty, removeFromCart, placeOrder } = useCart()
  const navigate = useNavigate()

  function handlePlaceOrder(details) {
    const order = placeOrder(details)
    navigate('/orders', { state: { justPlacedId: order.id } })
  }

  return (
    <section>
      <h2 className="section-title">Your cart</h2>
      {cart.length === 0 ? (
        <p className="muted">
          Your cart is empty. <Link to="/">Browse vendors</Link>
        </p>
      ) : (
        <div className="card">
          <ul className="cart-list">
            {cart.map((line) => (
              <CartItem key={line.item.id} line={line} onChangeQty={changeQty} onRemove={removeFromCart} />
            ))}
          </ul>
          <p className="cart-total">Total: RM {total.toFixed(2)}</p>
          <CheckoutForm onPlaceOrder={handlePlaceOrder} />
        </div>
      )}
    </section>
  )
}

export default CartPage
