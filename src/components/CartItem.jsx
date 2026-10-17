function CartItem({ line, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <div>
        <h3>{line.name}</h3>
        <p className="muted">RM {line.price.toFixed(2)} each</p>
      </div>
      <div className="qty">
        <button type="button" onClick={() => onDecrease(line.id)} aria-label={`Remove one ${line.name}`}>
          –
        </button>
        <span>{line.qty}</span>
        <button type="button" onClick={() => onIncrease(line.id)} aria-label={`Add one ${line.name}`}>
          +
        </button>
      </div>
      <p className="price">RM {(line.price * line.qty).toFixed(2)}</p>
    </li>
  )
}

export default CartItem
