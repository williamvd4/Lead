import React from 'react';
import { Table } from '@/components/ui/table';

const AuditLogs = () => {
  // Example audit logs data
  const logs = [
    { id: 1, user: 'admin', action: 'Created product', date: '2024-04-01' },
    { id: 2, user: 'editor', action: 'Edited post', date: '2024-04-02' },
    // Add more logs as needed
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AuditLogs;