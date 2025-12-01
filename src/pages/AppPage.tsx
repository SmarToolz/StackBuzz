import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AppPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center p-4 sm:p-8 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Primary Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight mb-6">
          See exactly what’s trending on Substack right now — and who to talk to.
        </h1>

        {/* Social Proof / Ticker */}
        <p className="text-lg sm:text-xl text-gray-400 mb-12 font-mono">
          Right now, 3,200 people are talking about ‘remote work burnout’.
        </p>

        {/* Call to Action (CTA) - Massive, High-Contrast Button */}
        <Button asChild
          className="h-auto px-12 py-6 text-xl sm:text-2xl font-bold rounded-lg shadow-2xl transition-all duration-300 
                     bg-brand-primary hover:bg-brand-hover text-white 
                     hover:scale-[1.02] active:scale-[0.98] border-2 border-brand-primary hover:border-brand-hover"
        >
          <Link to="/signup">
            Start free 7-day trial.
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AppPage;