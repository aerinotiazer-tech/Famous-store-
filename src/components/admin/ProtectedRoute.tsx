import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || (!isAdmin && user.email?.toLowerCase() !== 'aerinotiazer@gmail.com')) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
