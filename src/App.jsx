import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingTalk from './components/FloatingTalk.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Toaster from './components/ui/Toaster.jsx'
import { FullPageSpinner } from './components/ui/Spinner.jsx'
import { useUnauthorizedListener } from './hooks/useUnauthorizedListener.js'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import PublicDiscover from './pages/Discover.jsx'
import PublicProductDetail from './pages/PublicProductDetail.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/Privacy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import NotFound from './pages/NotFound.jsx'

import GuestRoute from './routes/GuestRoute.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

// Auth + dashboard are route-split: a logged-out marketing visitor never
// downloads the dashboard bundle, and vice versa.
const Login = lazy(() => import('./pages/auth/Login.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword.jsx'))

const DashboardLayout = lazy(() => import('./layouts/DashboardLayout.jsx'))
const DashboardOverview = lazy(() => import('./pages/dashboard/DashboardOverview.jsx'))
const Discover = lazy(() => import('./pages/dashboard/Discover.jsx'))
const ProductDetail = lazy(() => import('./pages/dashboard/ProductDetail.jsx'))
const Cart = lazy(() => import('./pages/dashboard/Cart.jsx'))
const Orders = lazy(() => import('./pages/dashboard/Orders.jsx'))
const OrderDetail = lazy(() => import('./pages/dashboard/OrderDetail.jsx'))
const WalletPage = lazy(() => import('./pages/dashboard/Wallet.jsx'))
const Notifications = lazy(() => import('./pages/dashboard/Notifications.jsx'))
const Profile = lazy(() => import('./pages/dashboard/Profile.jsx'))

function MarketingSite() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/discover" element={<PublicDiscover />} />
          <Route path="/discover/:id" element={<PublicProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingTalk />
    </div>
  )
}

export default function App() {
  useUnauthorizedListener()

  return (
    <div className="font-sans antialiased">
      <ScrollToTop />
      <Toaster />
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          {/* Auth pages — redirect away if already signed in */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Dashboard — requires an active session */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="discover" element={<Discover />} />
              <Route path="discover/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Everything else is the existing marketing site, untouched */}
          <Route path="/*" element={<MarketingSite />} />
        </Routes>
      </Suspense>
    </div>
  )
}
