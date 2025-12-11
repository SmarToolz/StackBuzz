import React from "react";
import { GlobalFooter } from "./GlobalFooter";
import { PublicHeader } from "./PublicHeader";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
};