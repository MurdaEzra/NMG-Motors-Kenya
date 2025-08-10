import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CarIcon, LayoutDashboardIcon, LogOutIcon, PlusCircleIcon, ListIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    logout
  } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <div className="w-64 bg-[#001514] text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <Link to="/admin" className="flex items-center space-x-2">
          <CarIcon className="h-8 w-8 text-[#E6AF2E]" />
          <span className="text-xl font-bold tracking-wider">Admin Panel</span>
        </Link>
      </div>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <UserIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium">{user?.name || 'Admin'}</span>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/admin" className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${isActive('/admin') ? 'bg-[#A3320B] text-white' : 'hover:bg-gray-800'}`}>
              <LayoutDashboardIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/cars" className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${isActive('/admin/cars') ? 'bg-[#A3320B] text-white' : 'hover:bg-gray-800'}`}>
              <ListIcon className="h-5 w-5" />
              <span>Car Listings</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/cars/add" className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${isActive('/admin/cars/add') ? 'bg-[#A3320B] text-white' : 'hover:bg-gray-800'}`}>
              <PlusCircleIcon className="h-5 w-5" />
              <span>Add New Car</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button onClick={handleLogout} className="flex items-center space-x-3 p-3 w-full rounded-md hover:bg-gray-800 transition-colors text-left">
          <LogOutIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>;
};
export default AdminSidebar;