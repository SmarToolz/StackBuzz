import React from "react";
import { GlobalFooter } from "./GlobalFooter";
import { GlobalHeader } from "./GlobalHeader";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GlobalHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
};