import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import { Loader2Icon } from 'lucide-react';
const AdminLayout: React.FC = () => {
  const {
    isAuthenticated,
    isLoading
  } = useAuth();
  // Show loading state
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2Icon className="h-12 w-12 text-[#A3320B] animate-spin" />
      </div>;
  }
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>;
};
export default AdminLayout;