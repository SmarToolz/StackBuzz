import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface Feature {
  text: string;
  included: boolean;
}

export interface PricingCardProps {
  tier: 'Free' | 'Basic' | 'Pro';
  price: string;
  description: string;
  features: Feature[];
  ctaText: string;
  ctaLink: string;
  isPrimary?: boolean;
  colorClass: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  price,
  description,
  features,
  ctaText,
  ctaLink,
  isPrimary = false,
  colorClass,
}) => {
  return (
    <Card 
      className={cn(
        "flex flex-col bg-gray-900 border-gray-800 text-white h-full transition-all duration-300",
        isPrimary ? "border-2 border-brand-primary shadow-2xl shadow-brand-primary/20" : "hover:border-brand-primary/50"
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle className={cn("text-2xl font-extrabold", colorClass)}>
          {tier}
        </CardTitle>
        <p className="text-4xl font-bold mt-2 text-white">{price}</p>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-3 border-t border-gray-800 pt-6">
        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Features:</h4>
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-2">
            {feature.included ? (
              <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <p className={cn("text-sm", feature.included ? "text-gray-300" : "text-gray-500 line-through")}>
              {feature.text}
            </p>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="pt-6 border-t border-gray-800">
        <Button 
          asChild
          className={cn(
            "w-full h-12 text-lg font-semibold",
            isPrimary 
              ? "bg-brand-primary hover:bg-brand-hover text-white" 
              : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
          )}
        >
          <Link to={ctaLink}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;