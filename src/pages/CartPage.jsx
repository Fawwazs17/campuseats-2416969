import CartItem from '../components/CartItem.jsx'

function CartPage({ cart, onIncrease, onDecrease }) {
  if (cart.length === 0) {
    return <p className="muted">Your cart is empty.</p>
  }

  const total = cart.reduce((sum, line) => sum + line.price * line.qty, 0)

  return (
    <div className="card">
      <ul className="cart-list">
        {cart.map((line) => (
          <CartItem key={line.id} line={line} onIncrease={onIncrease} onDecrease={onDecrease} />
        ))}
      </ul>
      <p className="cart-total">Total: RM {total.toFixed(2)}</p>
    </div>
  )
}

export default CartPage
