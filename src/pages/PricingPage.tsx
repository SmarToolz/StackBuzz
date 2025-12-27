import React, { useState } from "react";
import PricingCard, { PricingCardProps } from "@/components/PricingCard";
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Define a type for the full tier object, including both monthly and yearly data
interface PricingTierData {
    tier: 'Free' | 'Basic' | 'Pro';
    description: string;
    colorClass: string;
    ctaText: string;
    ctaLink: string;
    isPrimary: boolean;
    monthly: {
        price: string;
        footerNote: string;
    };
    yearly: {
        price: string;
        descriptionSuffix: string; // e.g., (or $290 / year — save 17%)
        footerNote: string;
    };
    features: PricingCardProps['features'];
}

const baseFeatures = [
    // Free Features
    { text: 'Weekly Buzz dashboard (pre‑loaded hottest keyword)', included: true },
    { text: 'Pulse card + top posts snapshot', included: true }, // Updated from Live Pulse
    { text: '“Who to DM Today” (3 sample cards)', included: true },
    { text: 'Word cloud of trending comments', included: true },
    
    // Basic Features
    { text: '20 keyword searches per month', included: false },
    { text: 'Saved Keywords with optional refreshes', included: false },
    { text: 'Download results as CSV', included: false },
    { text: 'Unlimited viewing of saved trends', included: false },
    
    // Pro Features
    { text: 'Unlimited keyword searches (any topic)', included: false },
    { text: '20 monthly credits to refresh your keywords', included: false },
    { text: 'Creator Match Score (0-100)', included: false },
    { text: 'Audience Overlap Map', included: false },
    { text: 'Personalized AI‑powered title & DM line generator', included: false },
    { text: 'Superfans tab (see top commenters)', included: false },
    { text: 'Priority support', included: false },
];

const pricingTiersData: PricingTierData[] = [
  {
    tier: 'Free',
    description: 'Dashboard Glimpse',
    // SWAP: text-brand-secondary-yellow -> text-brand-secondary-blue
    colorClass: 'text-brand-secondary-blue',
    ctaText: 'Start Free',
    ctaLink: '/signup',
    isPrimary: false,
    monthly: {
        price: '$0 / month',
        footerNote: 'Perfect for tasting the magic instantly. Need more? Unlock extra searches anytime for $5 (Radar Surge) or upgrade to Basic.',
    },
    yearly: {
        price: '$0 / year',
        descriptionSuffix: '',
        footerNote: 'Perfect for tasting the magic instantly. Need more? Unlock extra searches anytime for $5 (Radar Surge) or upgrade to Basic.',
    },
    features: baseFeatures.slice(0, 4), // First 4 features are included
  },
  {
    tier: 'Basic',
    description: 'High‑Signal Briefing',
    // SWAP: text-brand-secondary-blue -> text-brand-secondary-yellow
    colorClass: 'text-brand-secondary-yellow',
    ctaText: 'Upgrade to Basic',
    ctaLink: '/signup',
    isPrimary: true,
    monthly: {
        price: '$29 / month',
        footerNote: 'Ideal for creators who want regular, self‑serve insights in their niche. Extra searches: $5 for 5 Radar Surges.',
    },
    yearly: {
        price: '$290 / year',
        descriptionSuffix: ' (save 17%)',
        footerNote: 'Ideal for creators who want regular, self‑serve insights in their niche. Extra searches: $5 for 5 Radar Surges.',
    },
    features: baseFeatures.map((f, i) => ({
        ...f,
        // Basic includes features 0-7.
        included: i < 8,
    })),
  },
  {
    tier: 'Pro',
    description: 'Full Radar Access + Collaboration Engine',
    colorClass: 'text-brand-primary',
    ctaText: 'Go Pro',
    ctaLink: '/signup',
    isPrimary: false,
    monthly: {
        price: '$79 / month',
        footerNote: 'For serious creators who want the full edge + collaboration intelligence every day. Need more updates? Buy Radar Surges: $5 for 5 extra credits.',
    },
    yearly: {
        price: '$790 / year',
        descriptionSuffix: ' (save 17%)',
        footerNote: 'For serious creators who want the full edge + collaboration intelligence every day. Need more updates? Buy Radar Surges: $5 for 5 extra credits.',
    },
    features: baseFeatures.map(f => ({
        ...f,
        included: true,
    })),
  },
];

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const isYearly = billingCycle === 'yearly';

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 text-white relative bg-gradient-to-b from-gray-950 to-black">
      {/* Subtle Radial Gradient Overlay for Premium Feel (Updated to Green Glow) */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_50%)]
                      opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto py-12 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 tracking-tight text-white">
            Discover What’s Buzzing on <span className="text-orange-400">Substack</span> — Right Now
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            StackBuzz shows you the hottest topics, the posts getting thousands of comments, and exactly who to reach out to — all in seconds.
          </p>
        </header>
        
        {/* Monthly/Yearly Toggle */}
        <div className="flex justify-center mb-12">
            <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')} className="w-full max-w-xs">
                <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-800">
                    <TabsTrigger 
                        value="monthly" 
                        className={cn(
                            "data-[state=active]:bg-brand-primary data-[state=active]:text-white",
                        )}
                    >
                        Monthly
                    </TabsTrigger>
                    <TabsTrigger 
                        value="yearly" 
                        className={cn(
                            "data-[state=active]:bg-brand-primary data-[state=active]:text-white relative"
                        )}
                    >
                        Yearly
                        {/* SWAP: bg-brand-secondary-blue -> bg-brand-secondary-yellow */}
                        <span className="absolute -top-2 right-0 bg-brand-secondary-yellow text-black text-[10px] font-bold px-2 py-0.5 rounded-full transform translate-x-1/2 -translate-y-1/2">
                            SAVE 17%
                        </span>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiersData.map((tierData) => {
            const priceInfo = isYearly ? tierData.yearly : tierData.monthly;
            const descriptionSuffix = isYearly ? tierData.yearly.descriptionSuffix : '';
            
            // Determine features based on tier logic
            let features = tierData.features;
            
            // Special handling for Pro features to ensure they override Basic features correctly
            if (tierData.tier === 'Pro') {
                // Filter out the Basic search limit feature (index 4: '20 keyword searches per month')
                features = baseFeatures
                    .filter((_, i) => i !== 4) 
                    .map(f => ({ 
                        ...f, 
                        included: true,
                    }));
            } else if (tierData.tier === 'Basic') {
                features = baseFeatures.map((f, i) => ({
                    ...f,
                    included: i < 8,
                }));
            } else {
                features = baseFeatures.map((f, i) => ({
                    ...f,
                    included: i < 4,
                }));
            }

            return (
              <div key={tierData.tier} className="flex flex-col">
                <PricingCard 
                    tier={tierData.tier}
                    price={priceInfo.price}
                    description={tierData.description + descriptionSuffix}
                    features={features}
                    ctaText={tierData.ctaText}
                    ctaLink={tierData.ctaLink}
                    isPrimary={tierData.isPrimary}
                    colorClass={tierData.colorClass}
                /> 
                <p className="text-xs text-gray-500 mt-3 text-center italic">{priceInfo.footerNote}</p>
              </div>
            );
          })}
        </div>
        
        {/* NEW: Compounding Insight Section */}
        <div className="mt-20 pt-12 border-t border-gray-800 max-w-4xl mx-auto text-left">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">
                Why StackBuzz Gets More Valuable Over Time
            </h2>
            <div className="space-y-6 text-gray-300">
                <p>
                    When you save a keyword, StackBuzz doesn’t just bookmark it. It starts tracking how that topic behaves over time — comment velocity, engagement spikes, and which creators consistently drive discussion.
                </p>
                <p className="font-semibold text-white text-lg">
                    As you save more keywords, StackBuzz quietly builds historical context in the background:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                    <li>You see which topics are accelerating vs. fading</li>
                    <li>You spot patterns earlier instead of reacting late</li>
                    <li>Trend signals become clearer and more reliable</li>
                </ul>
                <p>
                    Your dashboard stops being a generic analytics view and becomes a personalized map of your niche — built around the topics and creators you actually care about.
                </p>
                <p className="font-bold text-brand-primary">
                    That’s why Pro users don’t just “check trends.” They build an advantage that compounds every week they use StackBuzz.
                </p>
            </div>
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