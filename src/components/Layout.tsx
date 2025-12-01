import React from "react";
import { GlobalFooter } from "./GlobalFooter";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">{children}</main>
      <GlobalFooter />
    </div>
  );
};