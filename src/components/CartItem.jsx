function CartItem({ line, onChangeQty, onRemove }) {
  const { item, qty } = line

  return (
    <li className="cart-item">
      <div>
        <h3>{item.name}</h3>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
        <button type="button" className="link-btn remove" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
      <div className="qty">
        <button type="button" onClick={() => onChangeQty(item.id, -1)} aria-label={`Remove one ${item.name}`}>
          –
        </button>
        <span>{qty}</span>
        <button type="button" onClick={() => onChangeQty(item.id, 1)} aria-label={`Add one ${item.name}`}>
          +
        </button>
      </div>
      <p className="price">RM {(item.price * qty).toFixed(2)}</p>
    </li>
  )
}

export default CartItem
