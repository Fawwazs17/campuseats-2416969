function Header({ cartCount, view, onNavigate }) {
  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        <button
          type="button"
          className={view === 'menu' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => onNavigate('menu')}
        >
          Menu
        </button>
        <button
          type="button"
          className={view === 'cart' ? 'nav-btn cart active' : 'nav-btn cart'}
          onClick={() => onNavigate('cart')}
        >
          Cart <span className="badge">{cartCount}</span>
        </button>
      </nav>
    </header>
  )
}

export default Header
