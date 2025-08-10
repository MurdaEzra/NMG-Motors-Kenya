import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FAQsPage from './pages/FAQsPage';
// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import CarListingPage from './pages/admin/CarListingPage';
import CarFormPage from './pages/admin/CarFormPage';
import AdminLayout from './components/admin/AdminLayout';
import { AuthProvider } from './contexts/AuthContext';
export function App() {
  return <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Public Routes */}
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="cars" element={<CarListingPage />} />
              <Route path="cars/add" element={<CarFormPage />} />
              <Route path="cars/edit/:id" element={<CarFormPage />} />
            </Route>
            {/* Public Routes with Navbar and Footer */}
            <Route path="/*" element={<>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/vehicles" element={<VehiclesPage />} />
                      <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/faqs" element={<FAQsPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>;
}