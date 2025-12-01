import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, TrendingUp, Settings, LogOut, History, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Trends", href: "/trends", icon: TrendingUp },
  { name: "Search History", href: "/history", icon: History },
  { name: "Exports CSV", href: "/exports", icon: Download },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  
  // Placeholder for authentication state
  const isAuthenticated = true; 

  return (
    <aside className="w-64 flex-shrink-0 bg-sidebar-background border-r border-sidebar-border p-4 flex flex-col h-full">
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.name}
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
              )}
            >
              <Link to={item.href}>
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            </Button>
          );
        })}
      </nav>
      
      {/* Bottom section for settings/logout */}
      {isAuthenticated && (
        <div className="pt-4 border-t border-sidebar-border mt-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:bg-sidebar-accent hover:text-white"
            onClick={() => console.log("Navigating to Settings")}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:bg-red-900/30"
            onClick={() => console.log("Logging out")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      )}
    </aside>
  );
};