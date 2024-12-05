import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 min-h-screen p-4">
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/dashboard')}>
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/home')}>
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/products')}>
            Products Management
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/cultivation')}>
            Cultivation Page
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/retailers')}>
            Retailers Management
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/lab-results')}>
            Lab Results Management
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/about')}>
            About page
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/settings')}>
            Settings
          </Button>
        </nav>
      </div>
      <main className="flex-grow p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;