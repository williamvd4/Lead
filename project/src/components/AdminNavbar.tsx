import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/admin" className="hover:text-emerald-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/content" className="hover:text-emerald-400">
            Manage Content
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="hover:text-emerald-400">
            Settings
          </Link>
        </li>
        <li>
          <Link to="/admin/profile" className="hover:text-emerald-400">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
