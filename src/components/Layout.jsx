import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// The same header and footer on every page; <Outlet /> is where the current page goes.
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
