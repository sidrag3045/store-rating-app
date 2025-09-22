import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/authService';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to={user ? "/dashboard" : "/login"} className="text-xl font-bold text-blue-600">
          Store Rater
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <Link to="/change-password" className="text-sm text-gray-600 hover:underline">
              Change Password
            </Link>
          )}
          {user ? (
            <>
              <span className="text-gray-700">Welcome, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;