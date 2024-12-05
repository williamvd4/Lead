import { Button } from '@/components/ui/button';

import { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 min-h-screen p-4">
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Products
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Lab Results
          </Button>
          <Button variant="ghost" className="w-full justify-start">
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
