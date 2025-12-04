import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/SupabaseAuthProvider';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Hardcoded admin email as requested
const ADMIN_EMAIL = "admin@stackbuzz.app";

const AdminRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (user.email !== ADMIN_EMAIL) {
    // If logged in but not admin, redirect to dashboard and show error
    toast.error("Access Denied: You are not authorized to view the Admin Panel.");
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized admin user
  return <Outlet />;
};

export default AdminRoute;