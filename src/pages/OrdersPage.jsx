import { Link, useLocation } from 'react-router-dom'
import useCart from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()
  const location = useLocation()
  const justPlacedId = location.state?.justPlacedId // set by CartPage after checkout

  return (
    <section>
      <h2 className="section-title">My orders</h2>
      {orders.length === 0 ? (
        <p className="muted">
          No orders yet. <Link to="/">Browse vendors</Link>
        </p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className={order.id === justPlacedId ? 'card order new' : 'card order'}>
              {order.id === justPlacedId && <p className="notice">Thanks, {order.name}! Your order is placed.</p>}
              <div className="order-head">
                <h3>{new Date(order.placedAt).toLocaleString()}</h3>
                <p className="price">RM {order.total.toFixed(2)}</p>
              </div>
              <p className="muted">
                {order.name} · Mahallah {order.mahallah} · Pickup {order.pickupTime}
              </p>
              <ul className="order-lines">
                {order.lines.map((line) => (
                  <li key={line.item.id}>
                    {line.qty} × {line.item.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default OrdersPage
