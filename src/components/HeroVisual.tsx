import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Live Pulse Card (Simplified)
const MockLivePulse: React.FC = () => (
  <Card className="bg-gray-800 border-gray-700 text-white col-span-full shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        The Live Pulse
      </CardTitle>
      <Flame className="h-4 w-4 text-brand-primary animate-pulse" />
    </CardHeader>
    <CardContent className="pt-2">
      <div className="flex items-center space-x-3">
        <Flame className="h-6 w-6 text-brand-primary" />
        <div>
          <p className="text-xl font-extrabold tabular-nums">
            1,400
          </p>
          <p className="text-sm text-gray-300 mt-0.5">
            people are talking about <span className="font-bold text-brand-primary">"AI Ethics"</span> right now.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Mock Collaborator Card (Simplified)
const MockCollaboratorCard: React.FC = () => (
  <Card className="bg-gray-800 border-gray-700 text-white h-full flex flex-col shadow-lg">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-green-400">
          Rising Star
        </CardTitle>
        <User className="h-3 w-3 text-green-400" />
      </div>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col justify-between pt-1">
      <div>
        <p className="text-lg font-extrabold text-white mb-1">@NewVoiceAI</p>
        <p className="text-xs text-gray-400">
          <span className="font-semibold text-brand-primary">200 subs</span> · 47 comments on last post
        </p>
      </div>
      <Button 
        variant="outline" 
        className="w-full h-8 text-xs bg-black border-gray-700 text-gray-300 mt-3"
      >
        View Activity <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
    </CardContent>
  </Card>
);


const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto mt-10">
      {/* Laptop Mockup Container */}
      <div className="relative bg-gray-900 border-4 border-gray-700 rounded-xl p-2 shadow-2xl">
        {/* Screen Content */}
        <div className="bg-black p-4 rounded-lg space-y-4">
          <MockLivePulse />
          <div className="grid grid-cols-2 gap-4">
            <MockCollaboratorCard />
            <MockCollaboratorCard />
          </div>
        </div>
        
        {/* Bottom bezel/stand */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-2/3 h-2 bg-gray-700 rounded-b-lg"></div>
      </div>
    </div>
  );
};

export default HeroVisual;