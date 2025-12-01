import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TrialPage: React.FC = () => {
  const proofCards = [
    { quote: "One post from the suggestions → 8,000 new subs in 9 days.", author: "Alex Chen" },
    { quote: "Found 3 perfect collab partners in under 5 minutes.", author: "Sarah K." },
    { quote: "Finally know what my readers actually care about.", author: "400+ creators using Substrate today" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8 bg-black text-white 
                    relative overflow-hidden">
      {/* Subtle Radial Gradient Overlay for Premium Feel */}
      <div className="absolute inset-0 pointer-events-none 
                      bg-[radial-gradient(circle_at_center,_rgba(232,99,36,0.05)_0%,_transparent_50%)] 
                      opacity-50 z-0"></div>

      <div className="max-w-5xl mx-auto py-16 relative z-10">
        {/* Primary Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 tracking-tight">
          See exactly what’s trending on Substack right now — and who to talk to.
        </h1>

        {/* Sub-headline */}
        <p className="text-xl sm:text-2xl text-gray-400 mb-8 font-light">
          No more guessing what to write or who to DM. Live insights the second you log in.
        </p>

        {/* Live Ticker */}
        <div className="mb-16 space-y-2">
          <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
            Right now (auto-refreshed every 4h)
          </p>
          <div className="text-lg sm:text-xl font-semibold text-left inline-block space-y-1 p-4 rounded-lg border border-gray-800 bg-gray-900/50">
            <p className="text-white">→ 3,412 people are talking about “AI energy costs”</p>
            <p className="text-white">→ 1,890 comments on “remote work burnout” this week</p>
            <p className="text-white">→ “Indie hacking” just spiked 180 %</p>
          </div>
        </div>

        {/* Call to Action (CTA) - Massive, High-Contrast Button */}
        <Button asChild
          className="h-auto px-16 py-7 text-xl sm:text-2xl font-bold rounded-lg shadow-2xl transition-all duration-300 
                     bg-brand-primary hover:bg-brand-hover text-white 
                     hover:scale-[1.02] active:scale-[0.98] border-2 border-brand-primary hover:border-brand-hover mb-20"
        >
          <Link to="/signup">
            Start free 7-day trial → no card required
          </Link>
        </Button>

        {/* Three Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {proofCards.map((proof, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 text-white text-left p-6 h-full transition-all hover:border-brand-primary/50">
              <CardContent className="p-0">
                <p className="text-lg font-semibold mb-3 italic">
                  &ldquo;{proof.quote}&rdquo;
                </p>
                <p className="text-sm text-brand-primary font-medium">
                  — {proof.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Final Line */}
        <p className="text-xs text-gray-500 mt-8">
          Cancel anytime · Takes 10 seconds to set up · Built for writers who hate wasting time
        </p>
      </div>
    </div>
  );
};

export default TrialPage;