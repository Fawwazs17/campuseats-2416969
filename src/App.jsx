import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartProvider from './context/CartProvider.jsx'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import VendorPage from './pages/VendorPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vendors/:vendorId" element={<VendorPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
