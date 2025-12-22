import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, TrendingUp, Search, Users, Zap, Star, MessageSquare, Lightbulb } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import PricingCard, { Feature } from "@/components/PricingCard";
import FAQSection from "@/components/FAQSection"; // Import FAQSection
import { cn } from "@/lib/utils";
import LiveSignalBanner from "@/components/LiveSignalBanner"; // Import the new component

// Section 2 Feature Grid Data
const featureGridData = [
    { title: "Pulse Card", icon: Zap, description: "See the single hottest topic being discussed right now." },
    { title: "Hot Post Scraper", icon: TrendingUp, description: "Instantly find the posts gaining comments the fastest — ranked by momentum." },
    { title: "Comment Word Cloud", icon: MessageSquare, description: "Analyze the core sentiment and sub-topics driving engagement." },
    { title: "“Who to DM Today”", icon: Users, description: "Actionable list of creators ready for collaboration." },
    { title: "Saved Keywords", icon: Star, description: "Saved keywords get smarter over time. Track the topics you care about and see which ones are gaining momentum — so you stop chasing dead trends and start acting earlier." },
    { title: "AI Title Generator", icon: Lightbulb, description: "Get counter-angle titles based on viral posts." },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-b from-gray-950 to-black">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 text-center relative overflow-hidden">
        {/* Radial Gradient Background - Subtle Green Glow */}
        <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_50%)]
                      opacity-50 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          {/* NEW: Live Trend Signal Banner */}
          <LiveSignalBanner />

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-none mb-6 tracking-tighter text-white">
            The Real-Time Radar for <span className="text-brand-primary">Substack Creators</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-10 font-light max-w-4xl mx-auto">
            Know exactly <span className="font-bold text-white">what to write today</span>, <span className="font-bold text-white">who to DM right now</span>, and <span className="font-bold text-white">which topics are gaining momentum</span> — before they’re obvious.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex justify-center space-x-4 mb-10">
            <Button asChild className="h-12 px-8 text-lg font-semibold bg-brand-primary hover:bg-brand-hover">
              <Link to="/signup">Start Free</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 text-lg font-semibold bg-black border-gray-700 text-white hover:bg-gray-900">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
          
          {/* NEW: Momentum Credibility Block */}
          <div className="max-w-xl mx-auto mb-16 p-4 border-l-4 border-brand-primary bg-gray-900/50 text-left">
            <p className="text-lg font-bold text-white mb-1">Momentum &gt; Popularity</p>
            <p className="text-sm text-gray-400">
              StackBuzz doesn’t show what *was* popular. It highlights what’s <span className="font-semibold text-brand-primary">accelerating right now</span> — so you don’t publish into dead conversations.
            </p>
          </div>
          
          {/* Hero Visual */}
          <div className="relative z-10">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Section 1 — What StackBuzz Does */}
      <section className="py-20 bg-gray-900 border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">
            Stop Guessing. Start Growing.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Instant Trend Detection */}
            <div className="p-6 space-y-3 border border-gray-800 rounded-lg bg-gray-800/50 hover:border-brand-secondary-blue transition-colors">
              <TrendingUp className="h-8 w-8 text-brand-secondary-blue mx-auto" />
              <h3 className="text-xl font-semibold text-white">Instant Trend Detection</h3>
              <p className="text-gray-400">See which conversations are <span className="font-semibold text-white">accelerating</span>, not just active — updated throughout the day.</p>
            </div>
            {/* Hot Post Scraper */}
            <div className="p-6 space-y-3 border border-gray-800 rounded-lg bg-gray-800/50 hover:border-brand-secondary-yellow transition-colors">
              <Search className="h-8 w-8 text-brand-secondary-yellow mx-auto" />
              <h3 className="text-xl font-semibold text-white">Hot Post Scraper</h3>
              <p className="text-gray-400">Instantly find the posts gaining comments <span className="font-semibold text-white">the fastest</span> — ranked by momentum.</p>
            </div>
            {/* Smart Collaboration Targeting */}
            <div className="p-6 space-y-3 border border-gray-800 rounded-lg bg-gray-800/50 hover:border-brand-primary transition-colors">
              <Users className="h-8 w-8 text-brand-primary mx-auto" />
              <h3 className="text-xl font-semibold text-white">Smart Collaboration Targeting</h3>
              <p className="text-gray-400">Reach, Peer, and Rising creator buckets — with ready-to-use DM lines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — A Daily Tool Creators Actually Use */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-mono text-brand-primary uppercase tracking-widest mb-3">
            A Daily Tool
          </p>
          <h2 className="text-4xl font-bold mb-12 text-white">
            Creators open StackBuzz every morning to answer one question: <span className="text-brand-primary">“Should I write or wait?”</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featureGridData.map((feature, index) => {
                const Icon = feature.icon;
                // Cycle through colors for visual interest
                const iconColor = index % 3 === 0 ? 'text-brand-secondary-blue' : 
                                  index % 3 === 1 ? 'text-brand-secondary-yellow' : 
                                  'text-brand-primary';
                
                return (
                    <Card key={index} className="bg-gray-900 border-gray-800 text-left p-4 h-full hover:border-brand-primary/50 transition-colors">
                        <CardHeader className="p-0 pb-2">
                            <Icon className={cn("h-6 w-6 mb-2", iconColor)} />
                            <CardTitle className="text-lg font-semibold text-white">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <p className="text-sm text-gray-400">{feature.description}</p>
                        </CardContent>
                    </Card>
                );
            })}
          </div>
        </div>
      </section>
      
      {/* NEW: Hidden Engine Section */}
      <section className="py-20 bg-gray-900 border-t border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-brand-primary">
            Why StackBuzz Feels Like a Cheat Code
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We track how fast conversations grow, how recent they are, and how deep the engagement goes — then compress it into a single signal so you know when to act.
          </p>
        </div>
      </section>

      {/* Section 3 — Pricing CTA Banner */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative p-10 sm:p-16 rounded-2xl bg-gray-900 border-2 border-gray-800 shadow-2xl shadow-brand-primary/10">
            {/* Subtle Gradient Border/Glow Effect (Green Radar Glow) */}
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-50 blur-sm pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight text-white">
                Ready to Choose Your Edge?
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                From Free to Pro, find the perfect plan to unlock real-time trends, collaboration targets, and superfan insights.
              </p>
              
              <Button asChild className="h-14 px-10 text-xl font-bold transition-all duration-300 
                                         bg-brand-primary hover:bg-brand-hover text-white 
                                         hover:scale-[1.02] active:scale-[0.98]">
                <Link to="/pricing">
                  View All Plans & Features →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">
            Created for Serious Substack Writers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-gray-900 border-gray-800 text-white p-6 h-full">
              <CardContent className="p-0">
                <p className="text-xl font-semibold italic mb-3">
                  &ldquo;Finally a tool built for Substack, not social media.&rdquo;
                </p>
                <p className="text-sm text-brand-primary font-medium">— Creator Name</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-white p-6 h-full">
              <CardContent className="p-0">
                <p className="text-xl font-semibold italic mb-3">
                  &ldquo;This shaved 6+ hours off my research workflow.&rdquo;
                </p>
                <p className="text-sm text-brand-primary font-medium">— Creator Name</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-white p-6 h-full">
              <CardContent className="p-0">
                <p className="text-xl font-semibold italic mb-3">
                  &ldquo;The ‘Who to DM’ tab alone is worth it.&rdquo;
                </p>
                <p className="text-sm text-brand-primary font-medium">— Creator Name</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Section 6 - FAQ */}
      <FAQSection />

      {/* Section 5 — Why Creators Love StackBuzz */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-brand-primary">
            Why Creators Love StackBuzz
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
                "Stops you from publishing at the wrong time",
                "Replaces guesswork with confidence",
                "Surfaces opportunities before they’re crowded",
                "Turns scrolling into decisions",
                "Makes growth feel intentional again"
            ].map((benefit, index) => (
                <div key={index} className="flex items-center justify-center p-3 bg-gray-800 rounded-lg">
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <p className="text-lg font-medium text-white">{benefit}</p>
                </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;