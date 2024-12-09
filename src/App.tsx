import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { BetaPage } from './pages/BetaPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DemoProfile } from './components/DemoProfile';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { InfoBanner } from './components/layout/InfoBanner';
import { Header } from './components/layout/Header';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <InfoBanner />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/beta" element={<BetaPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/demo" element={<DemoProfile />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;