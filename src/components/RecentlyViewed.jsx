import { Link } from 'react-router'

// Personal feature (matric digit 9): the last 5 menu items the user looked at, newest first.
// Each item links back to its vendor's page.
function RecentlyViewed({ items, onClear }) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="recent">
      <div className="recent-head">
        <h2 className="section-title">Recently viewed</h2>
        <button type="button" className="link-btn" onClick={onClear}>
          Clear
        </button>
      </div>
      <ul className="recent-list">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/vendor/${item.vendorId}`} className="recent-chip">
              {item.name} <span className="muted">RM {item.price.toFixed(2)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecentlyViewed
