import React from "react";
import PricingCard, { PricingCardProps } from "@/components/PricingCard";
import { Check } from "lucide-react";

// Define a type for the full tier object, extending PricingCardProps
interface FullPricingTier extends PricingCardProps {
    footerNote: string;
}

const pricingTiers: FullPricingTier[] = [
  {
    tier: 'Free',
    price: '$0 / month',
    description: 'Static dashboard preview (weekly buzz keyword pre‑loaded)',
    colorClass: 'text-yellow-400',
    ctaText: 'Start Free — No Card Required',
    ctaLink: '/signup',
    isPrimary: false,
    features: [
      { text: 'Live Pulse card + top posts snapshot', included: true },
      { text: '“Who to DM Today” (3 sample cards)', included: true },
      { text: 'Word cloud view of trending comments', included: true },
      { text: 'Perfect for seeing the magic and getting one high‑signal insight every week', included: true },
      { text: '3 keyword searches per week', included: false },
      { text: 'Saved Keywords with live trend arrows', included: false },
      { text: 'Unlimited keyword searches', included: false },
      { text: 'Superfans tab (connect your Substack)', included: false },
    ],
    footerNote: 'Need more? Unlock extra searches anytime for $3.50 each or upgrade to Basic.',
  },
  {
    tier: 'Basic',
    price: '$29 / month',
    description: 'High‑Signal Briefing (or $290 / year — save 17%)',
    colorClass: 'text-blue-400',
    ctaText: 'Upgrade to Basic — Get Your Weekly Briefing',
    ctaLink: '/signup',
    isPrimary: true,
    features: [
      { text: 'Live Pulse card + top posts snapshot', included: true },
      { text: '“Who to DM Today” (3 sample cards)', included: true },
      { text: 'Word cloud view of trending comments', included: true },
      { text: '3 keyword searches per week (≈12/month)', included: true },
      { text: 'Saved Keywords with live trend arrows', included: true },
      { text: 'Download results as CSV', included: true },
      { text: 'Unlimited viewing of saved searches', included: true },
      { text: 'Unlimited keyword searches', included: false },
      { text: 'Superfans tab (connect your Substack)', included: false },
    ],
    footerNote: 'Flex option: Add extra searches anytime for $3.50 each.',
  },
  {
    tier: 'Pro',
    price: '$79 / month',
    description: 'Full Radar Access (or $790 / year — save 17%)',
    colorClass: 'text-red-400',
    ctaText: 'Go Pro — Unlock Unlimited Radar',
    ctaLink: '/signup',
    isPrimary: false,
    features: [
      { text: 'Live Pulse card + top posts snapshot', included: true },
      { text: '“Who to DM Today” (3 sample cards)', included: true },
      { text: 'Word cloud view of trending comments', included: true },
      { text: 'Unlimited keyword searches (any topic, any time)', included: true },
      { text: 'Saved Keywords with daily refresh', included: true },
      { text: 'Download results as CSV', included: true },
      { text: 'AI‑powered title & DM line generator', included: true },
      { text: 'Superfans tab (connect your Substack to see top commenters)', included: true },
      { text: 'Priority support', included: true },
    ],
    footerNote: 'For serious creators who want the full edge, every day.',
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white relative">
      {/* Subtle Radial Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(circle_at_center,_rgba(232,99,36,0.05)_0%,_transparent_50%)]
                      opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto py-12 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-4 tracking-tight text-white">
            Discover What’s Buzzing on Substack — Right Now
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            StackBuzz shows you the hottest topics, the posts getting thousands of comments, and exactly who to reach out to — all in seconds.
          </p>
        </header>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <div key={tier.tier} className="flex flex-col">
              {/* Spread the tier object, which now conforms to the expected type */}
              <PricingCard {...tier} /> 
              <p className="text-xs text-gray-500 mt-3 text-center italic">{tier.footerNote}</p>
            </div>
          ))}
        </div>

        {/* Why Creators Love StackBuzz Section */}
        <div className="mt-20 pt-12 border-t border-gray-800 text-center">
          <h2 className="text-3xl font-bold text-brand-primary mb-6 flex items-center justify-center">
            <Check className="h-6 w-6 mr-2" />
            Why Creators Love StackBuzz
          </h2>
          <div className="text-lg text-gray-300 space-y-2">
            <p>10 seconds of insight replaces hours of scrolling.</p>
            <p>Never guess what to write or who to DM again.</p>
            <p>From Free to Pro, every tier is designed to give you the radar edge.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;