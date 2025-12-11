import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, TrendingUp, Search, Users, Zap, Star, MessageSquare, Lightbulb } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import PricingCard from "@/components/PricingCard";
import { Feature } from "@/components/PricingCard";

// Mock data for pricing preview (Monthly Free, Basic and Pro)
const mockPricingFeatures: Feature[] = [
    { text: 'Live Pulse card + top posts snapshot', included: true },
    { text: '“Who to DM Today” (3 sample cards)', included: true },
    { text: '3 keyword searches per week (≈12/month)', included: true },
    { text: 'Saved Keywords with live trend arrows', included: true },
    { text: 'Unlimited keyword searches', included: false },
    { text: 'Superfans tab (connect your Substack)', included: false },
];

const mockPricingData = [
    {
        tier: 'Free',
        price: '$0 / month',
        description: 'Static dashboard preview',
        colorClass: 'text-yellow-400',
        ctaText: 'Start Free',
        ctaLink: '/signup',
        isPrimary: false,
        features: mockPricingFeatures.slice(0, 2),
    },
    {
        tier: 'Basic',
        price: '$29 / month',
        description: 'High‑Signal Briefing',
        colorClass: 'text-blue-400',
        ctaText: 'Upgrade to Basic',
        ctaLink: '/signup',
        isPrimary: true,
        features: mockPricingFeatures.slice(0, 4),
    },
    {
        tier: 'Pro',
        price: '$79 / month',
        description: 'Full Radar Access',
        colorClass: 'text-red-400',
        ctaText: 'Go Pro',
        ctaLink: '/signup',
        isPrimary: false,
        features: mockPricingFeatures.map(f => ({ ...f, included: true })),
    },
];

// Section 2 Feature Grid Data
const featureGridData = [
    { title: "Live Pulse Card", icon: Zap, description: "See the single hottest topic being discussed right now." },
    { title: "Hot Post Scraper", icon: TrendingUp, description: "Instantly find the most commented-on posts for any keyword." },
    { title: "Comment Word Cloud", icon: MessageSquare, description: "Analyze the core sentiment and sub-topics driving engagement." },
    { title: "“Who to DM Today”", icon: Users, description: "Actionable list of creators ready for collaboration." },
    { title: "Saved Keywords", icon: Star, description: "Track your niche keywords with velocity alerts." },
    { title: "AI Title Generator", icon: Lightbulb, description: "Get counter-angle titles based on viral posts." },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 text-center relative overflow-hidden">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(circle_at_center,_rgba(232,99,36,0.05)_0%,_transparent_50%)]
                      opacity-50 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-none mb-6 tracking-tighter">
            The Real-Time Radar for <span className="text-brand-primary">Substack Creators</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-10 font-light max-w-4xl mx-auto">
            Know exactly what to write, who to DM, and which topics are blowing up — without scrolling for hours.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex justify-center space-x-4 mb-16">
            <Button asChild className="h-12 px-8 text-lg font-semibold bg-brand-primary hover:bg-brand-hover">
              <Link to="/signup">Start Free</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 text-lg font-semibold bg-black border-gray-700 text-white hover:bg-gray-900">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
          
          {/* Hero Visual */}
          <HeroVisual />
        </div>
      </section>

      {/* Section 1 — What StackBuzz Does */}
      <section className="py-20 bg-gray-900 border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">
            Stop Guessing. Start Growing.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 space-y-3 border border-gray-800 rounded-lg bg-gray-800/50">
              <TrendingUp className="h-8 w-8 text-brand-primary mx-auto" />
              <h3 className="text-xl font-semibold text-white">Instant Trend Detection</h3>
              <p className="text-gray-400">See what thousands of readers are talking about — updated every 4 hours.</p>
            </div>
            <div className="p-6 space-y-3 border border-gray-800 rounded-lg bg-gray-800/50">
              <Search className="h-8 w-8 text-brand-primary mx-auto" />
              <h3 className="text-xl font-semibold text-white">On-Demand Topic Analysis</h3>
              <p className="text-gray-400">Type any keyword → get trending posts, comment heat, and counter-angles.</p>
            </div>
            <div className="p-6 space-y-3 border border-gray-800 rounded-lg bg-gray-800/50">
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
            Creators open StackBuzz every morning.
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featureGridData.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <Card key={index} className="bg-gray-900 border-gray-800 text-left p-4 h-full">
                        <CardHeader className="p-0 pb-2">
                            <Icon className="h-6 w-6 text-brand-primary mb-2" />
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

      {/* Section 3 — Free, Basic, or Pro (Pricing Preview) */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">
            Choose your edge.
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mockPricingData.map((tier, index) => (
                <PricingCard 
                    key={index}
                    tier={tier.tier as any}
                    price={tier.price}
                    description={tier.description}
                    features={tier.features}
                    ctaText={tier.ctaText}
                    ctaLink={tier.ctaLink}
                    isPrimary={tier.isPrimary}
                    colorClass={tier.colorClass}
                />
            ))}
          </div>
          
          <div className="mt-10">
            <Button asChild variant="link" className="text-lg text-brand-primary hover:text-brand-hover">
                <Link to="/pricing">View Full Pricing Details →</Link>
            </Button>
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

      {/* Section 5 — Why Creators Love StackBuzz */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-brand-primary">
            Why Creators Love StackBuzz
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
                "Saves time", 
                "Sparks new growth ideas", 
                "Generates instant collaboration opportunities", 
                "Removes writer’s block", 
                "Stops you from chasing dead topics"
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