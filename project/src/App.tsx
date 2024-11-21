import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AgeGate from './components/AgeGate';
import Home from './pages/Home';
import About from './pages/About';
import Cultivation from './pages/Cultivation';
import Products from './pages/Products';
import Retailers from './pages/Retailers'; // Ensure this import is correct
import LabResults from './pages/LabResults';
import Contact from './pages/Contact';

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
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cultivation" element={<Cultivation />} />
            <Route path="/products" element={<Products />} />
            <Route path="/retailers" element={<Retailers />} /> {/* Ensure this route is correct */}
            <Route path="/LabResults" element={<LabResults />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;