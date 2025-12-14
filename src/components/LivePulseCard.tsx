import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLivePulse } from "@/lib/mock-data";
import { Flame } from "lucide-react";

const LivePulseCard: React.FC = () => {
  const { topic, count, icon: Icon } = mockLivePulse;

  return (
    <Card className="bg-gray-900 border-gray-800 text-white col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          The Live Pulse
        </CardTitle>
        <Flame className="h-6 w-6 text-brand-primary animate-pulse" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center space-x-4">
          <Icon className="h-10 w-10 text-brand-primary" />
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold tabular-nums">
              {count.toLocaleString()}
            </p>
            <p className="text-lg text-gray-300 mt-1">
              people are talking about <span className="font-bold text-brand-primary">"{topic}"</span> right now.
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Immediate validation for your niche.
        </p>
      </CardContent>
    </Card>
  );
};

export default LivePulseCard;