import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockActionableCreators, ActionableCreator } from '@/lib/mock-data';
import { ArrowRight, Target, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const getCardStyle = (category: ActionableCreator['category']) => {
  switch (category) {
    case 'Reach Target':
      return {
        icon: Target,
        color: 'text-red-400',
        title: 'Reach Target',
        description: 'High-authority creators for major exposure.',
      };
    case 'Peer Swap':
      return {
        icon: Users,
        color: 'text-blue-400',
        title: 'Peer Swap',
        description: 'Mid-tier creators for mutual growth and engagement.',
      };
    case 'Rising Star':
      return {
        icon: Zap,
        color: 'text-green-400',
        title: 'Rising Star',
        description: 'New, highly engaged creators showing rapid velocity.',
      };
  }
};

const CreatorCard: React.FC<{ creator: ActionableCreator }> = ({ creator }) => {
  const { icon: Icon, color, title, description } = getCardStyle(creator.category);

  return (
    <Card className="bg-gray-900 border-gray-800 text-white h-full flex flex-col transition-all hover:border-brand-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${color}`} />
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          <p className="text-3xl font-extrabold text-white mb-1">{creator.handle}</p>
          <p className="text-sm text-gray-400 mb-4">
            <span className="font-semibold text-brand-primary">{creator.subscribers} subs</span> · {creator.metric}
          </p>
        </div>
        <Button 
          variant="outline" 
          className="w-full bg-black border-gray-700 text-gray-300 hover:bg-gray-800 mt-4"
          onClick={() => console.log(`DMing ${creator.handle}`)}
        >
          DM Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const ActionableCreatorFeed: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {mockActionableCreators.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </div>
  );
};

export default ActionableCreatorFeed;