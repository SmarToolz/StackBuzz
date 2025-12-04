import React from "react";
import { useAuth } from "@/context/SupabaseAuthProvider";

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-red-500">Admin Panel</h1>
        <p className="text-gray-400 mb-4">
          Welcome, Administrator. This area is restricted to users with the email: admin@stackbuzz.app.
        </p>
        {user && (
            <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                <p className="text-lg font-semibold text-white">Current User:</p>
                <p className="text-brand-primary">{user.email}</p>
                <p className="text-sm text-gray-500 mt-2">User ID: {user.id}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;