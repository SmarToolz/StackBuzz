import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { GlobalFooter } from "./GlobalFooter";
import { Sidebar } from "./Sidebar";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      
      <div className="flex flex-grow">
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      <GlobalFooter />
    </div>
  );
};