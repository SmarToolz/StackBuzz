import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export const PublicHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo/Brand Name */}
        <Link to="/" className="text-xl font-bold text-brand-primary hover:text-brand-hover transition-colors flex-shrink-0">
          StackBuzz
        </Link>

        {/* Center: Navigation Links (Hidden on small screens) */}
        <nav className="hidden md:flex items-center space-x-6 mx-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href} 
              className={cn(
                "text-sm font-medium text-gray-300 hover:text-white transition-colors",
                window.location.pathname === link.href && "text-brand-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Conversion Buttons */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          {/* Log In (Text Link) */}
          <Button asChild variant="link" className="text-sm font-medium text-gray-300 hover:text-white p-0 h-auto">
            <Link to="/login">
              Log In
            </Link>
          </Button>
          
          {/* Get Started (Primary CTA Button) */}
          <Button asChild className="h-9 px-4 text-sm font-semibold bg-brand-primary hover:bg-brand-hover text-white">
            <Link to="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};