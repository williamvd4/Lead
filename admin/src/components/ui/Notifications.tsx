import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Notifications = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Display system alerts here */}
          <p>No new alerts.</p>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>User Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Display user notifications here */}
          <p>No new notifications.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;