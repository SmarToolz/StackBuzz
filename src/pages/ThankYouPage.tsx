import React from "react";

const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8 bg-black text-white relative">
      {/* Subtle Radial Gradient Overlay for Premium Feel (Updated to Green Glow) */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_50%)]
                      opacity-50 z-0"></div>

      <div className="max-w-3xl mx-auto py-16 relative z-10">
        {/* Big bold headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-none mb-8 tracking-tighter text-white">
          You’re in — spot secured.
        </h1>

        {/* Sub-headline */}
        <div className="text-2xl sm:text-3xl text-gray-300 mb-12 font-light max-w-2xl mx-auto space-y-3">
          <p className="font-bold text-brand-primary">You’re one of the first 500.</p>
          <p className="font-bold text-brand-primary">Lifetime early-bird pricing locked.</p>
          <p className="text-gray-400">Launch drops in your inbox first week of February.</p>
        </div>

        {/* One line */}
        <p className="text-lg sm:text-xl text-gray-500 mt-16 font-medium">
          Talk soon — get ready to see Substack differently.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;