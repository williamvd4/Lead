import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './api/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AgeGate from './components/AgeGate';
import Home from './pages/Home';
import About from './pages/About';
import Cultivation from './pages/Cultivation';
import Products from './pages/Products';
import Retailers from './pages/Retailers';
import LabResults from './pages/LabResults';
import Contact from './pages/Contact';
import ShopItems from './pages/ShopItems'; // Existing shop items page, path /ShopItems
import ShopPage from './pages/ShopPage'; // New e-commerce shop page
import Cart from './pages/Cart'; // Assuming you have a Cart component
import Checkout from './pages/Checkout'; // Import Checkout component
import ProductReviews from './pages/ProductReviews'; // Import ProductReviews component
import ProductDetailPage from './pages/ProductDetailPage'; // Import ProductDetailPage
import CheckoutPage from './pages/CheckoutPage'; // Import CheckoutPage
import OrderConfirmationPage from './pages/OrderConfirmationPage'; // Import OrderConfirmationPage
import OrderHistoryPage from './pages/OrderHistoryPage'; // Import OrderHistoryPage
import OrderDetailPage from './pages/OrderDetailPage'; // Import OrderDetailPage
import './App.css';

function App() {
  const [isVerified, setIsVerified] = useState(() => {
    return localStorage.getItem('ageVerified') === 'true';
  });

  useEffect(() => {
    if (isVerified) {
      localStorage.setItem('ageVerified', 'true');
    }
  }, [isVerified]);

  if (!isVerified) {
    return <AgeGate onVerify={() => setIsVerified(true)} />;
  }

  return (
    <Router>
      <CartProvider> {/* Wrap with CartProvider */}
        <div className="min-h-screen flex flex-col bg-neutral-50">
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <main className="flex-grow">
            <div className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/cultivation" element={<Cultivation />} />
                <Route path="/products" element={<Products />} />
                <Route path="/retailers" element={<Retailers />} />
                <Route path="/LabResults" element={<LabResults />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ShopItems" element={<ShopItems />} /> {/* Existing route for general shop items */}
                <Route path="/shop" element={<ShopPage />} /> {/* Added route for the new e-commerce ShopPage */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} /> {/* Add route for Checkout */}
                <Route path="/product-reviews" element={<ProductReviews />} /> {/* Add route for ProductReviews */}
                <Route path="/product/:slug" element={<ProductDetailPage />} /> {/* Add route for ProductDetailPage */}
                <Route path="/checkout-page" element={<CheckoutPage />} /> {/* Add route for CheckoutPage */}
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} /> {/* Add route for OrderConfirmationPage */}
                <Route path="/orders" element={<OrderHistoryPage />} /> {/* Add route for OrderHistoryPage */}
                <Route path="/orders/:orderId" element={<OrderDetailPage />} /> {/* Add route for OrderDetailPage */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </CartProvider> {/* Close CartProvider */}
    </Router>
  );
}

export default App;
