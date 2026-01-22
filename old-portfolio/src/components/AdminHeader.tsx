import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/create"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Post</span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-5 h-5" />
                <span className="text-sm">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;