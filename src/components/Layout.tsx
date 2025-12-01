import React from "react";
import { GlobalFooter } from "./GlobalFooter";
import { GlobalHeader } from "./GlobalHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GlobalHeader />
      <main className="flex-grow">{children}</main>
      <GlobalFooter />
    </div>
  );
};