import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/ui/AdminLayout';
import ProductsManagement from './pages/ProductsManagement';
import LabResults from './pages/LabResults';

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/admin/products" element={<ProductsManagement />} />
          <Route path="/admin/lab-results" element={<LabResults />} />
          <Route path="*" element={<NotFound />} /> {/* Add a catch-all route */}
          {/* Add more routes as needed */}
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;