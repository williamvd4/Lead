import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/ui/AdminLayout';
import ProductsManagement from '@/pages/ProductsManagement';
import LabResults from '@/pages/LabResults';
import Dashboard from '@/pages/Dashboard';
import HomeAdmin from '@/pages/HomeAdmin';
import CultivationAdmin from '@/pages/CultivationAdmin';
import RetailersAdmin from '@/pages/RetailersAdmin';
import AboutAdmin from '@/pages/AboutAdmin';
import SystemMonitoring from '@/components/ui/systemmonitoring';
import Notifications from '@/components/ui/notifications';
import AuditLogs from '@/components/ui/auditlogs';

const App = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsManagement />} />
          <Route path="/admin/lab-results" element={<LabResults />} />
          <Route path="/admin/home" element={<HomeAdmin />} />
          <Route path="/admin/cultivation" element={<CultivationAdmin />} />
          <Route path="/admin/retailers" element={<RetailersAdmin />} />
          <Route path="/admin/about" element={<AboutAdmin />} />
          <Route path="/admin/system-monitoring" element={<SystemMonitoring />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/audit-logs" element={<AuditLogs />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default App;