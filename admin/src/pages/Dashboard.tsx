import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to the admin panel</p>
        </CardContent>
      </Card>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>System Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/admin/system-monitoring')}>View Details</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/admin/notifications')}>View Notifications</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Audit Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/admin/audit-logs')}>View Logs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;