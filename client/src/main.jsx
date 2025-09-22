import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';

import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardRedirect from './pages/DashboardRedirect';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ChangePasswordPage from './pages/ChangePasswordPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Public Routes
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      
      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <DashboardRedirect /> },
          { path: 'user/dashboard', element: <UserDashboard /> },
          { path: 'owner/dashboard', element: <OwnerDashboard /> },
          { path: 'admin/dashboard', element: <AdminDashboard /> },
        ],
      },
      { path: 'change-password', element: <ChangePasswordPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);