import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="card">
      <h2 className="section-title">Page not found</h2>
      <p className="muted">We couldn't find that page.</p>
      <Link to="/">Back to vendors</Link>
    </section>
  )
}

export default NotFoundPage
