import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/SupabaseAuthProvider";

export const DashboardHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  // This header is only shown when authenticated, but we keep the check for safety/logic clarity
  const isAuthenticated = !!user; 

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand Name */}
        <Link to="/" className="text-xl font-bold text-brand-primary hover:text-brand-hover transition-colors">
          StackBuzz
        </Link>

        {/* Navigation & CTA (Dashboard specific) */}
        <nav className="flex items-center space-x-4">
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:inline">
                Dashboard
              </Link>
              <Button 
                variant="secondary" 
                className="bg-gray-800 hover:bg-gray-700 text-white"
                onClick={signOut} // Use signOut function
              >
                Logout
              </Button>
            </>
          ) : (
            // Should not happen in ProtectedRoute context, but fallback to login
            <Button asChild className="bg-brand-primary hover:bg-brand-hover text-white">
              <Link to="/login">
                Log In
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};