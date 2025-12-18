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
    { text: 'Live Pulse card + top posts snapshot', included: true },
    { text: '“Who to DM Today” (3 sample cards)', included: true },
    { text: 'Word cloud view of trending comments', included: true },
    { text: 'Perfect for seeing the magic and getting one high‑signal insight every week', included: true },
    { text: '3 keyword searches per week (≈12/month)', included: false },
    { text: 'Saved Keywords with live trend arrows', included: false },
    { text: 'Download results as CSV', included: false },
    { text: 'Unlimited viewing of saved searches', included: false },
    // Collaboration Intelligence Features
    { text: 'Creator Match Score (0-100)', included: false },
    { text: 'Audience Overlap Map', included: false },
    { text: 'Personalized DM Scripts', included: false },
    { text: 'Unlimited keyword searches (any topic, any time)', included: false },
    { text: 'AI‑powered title & DM line generator', included: false },
    { text: 'Superfans tab (connect your Substack to see top commenters)', included: false },
    { text: 'Priority support', included: false },
];

const pricingTiersData: PricingTierData[] = [
  {
    tier: 'Free',
    description: 'Static dashboard preview (weekly buzz keyword pre‑loaded)',
    colorClass: 'text-brand-secondary-yellow',
    ctaText: 'Start Free — No Card Required',
    ctaLink: '/signup',
    isPrimary: false,
    monthly: {
        price: '$0 / month',
        footerNote: 'Need more? Unlock extra searches anytime for $3.50 each or upgrade to Basic.',
    },
    yearly: {
        price: '$0 / year',
        descriptionSuffix: '',
        footerNote: 'Need more? Unlock extra searches anytime for $3.50 each or upgrade to Basic.',
    },
    features: baseFeatures.slice(0, 4), // First 4 features are included
  },
  {
    tier: 'Basic',
    description: 'High‑Signal Briefing',
    colorClass: 'text-brand-secondary-blue',
    ctaText: 'Upgrade to Basic — Get Your Weekly Briefing',
    ctaLink: '/signup',
    isPrimary: true,
    monthly: {
        price: '$29 / month',
        footerNote: 'Flex option: Add extra searches anytime for $3.50 each.',
    },
    yearly: {
        price: '$290 / year',
        descriptionSuffix: ' (save 17%)',
        footerNote: 'Flex option: Add extra searches anytime for $3.50 each.',
    },
    features: baseFeatures.map((f, i) => ({
        ...f,
        // Basic includes features 0-7.
        text: i === 4 ? '3 keyword searches per week (≈12/month)' : f.text,
        included: i < 8,
    })),
  },
  {
    tier: 'Pro',
    description: 'Full Radar Access + Collaboration Engine',
    colorClass: 'text-brand-primary',
    ctaText: 'Go Pro — Unlock Unlimited Radar',
    ctaLink: '/signup',
    isPrimary: false,
    monthly: {
        price: '$79 / month',
        footerNote: 'For serious creators who want the full edge, every day.',
    },
    yearly: {
        price: '$790 / year',
        descriptionSuffix: ' (save 17%)',
        footerNote: 'For serious creators who want the full edge, every day.',
    },
    features: baseFeatures.map((f, i) => ({
        ...f,
        // Pro includes ALL features.
        text: i === 11 ? 'Unlimited keyword searches (any topic, any time)' : f.text,
        included: true,
    })),
  },
];

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const isYearly = billingCycle === 'yearly';

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white relative">
      {/* Subtle Radial Gradient Overlay for Premium Feel (Updated to Green Glow) */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_50%)]
                      opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto py-12 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 tracking-tight text-white">
            Discover What’s Buzzing on Substack — Right Now
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
                        <span className="absolute -top-2 right-0 bg-brand-secondary-blue text-black text-[10px] font-bold px-2 py-0.5 rounded-full transform translate-x-1/2 -translate-y-1/2">
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
                features = baseFeatures.map(f => ({ 
                    ...f, 
                    included: true,
                    text: f.text.includes('Unlimited keyword searches') ? 'Unlimited keyword searches (any topic, any time)' : f.text,
                }));
            } else if (tierData.tier === 'Basic') {
                features = baseFeatures.map((f, i) => ({
                    ...f,
                    included: i < 8,
                    text: i === 4 ? '3 keyword searches per week (≈12/month)' : f.text,
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