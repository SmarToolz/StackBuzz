import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ActionableCreator } from '@/lib/mock-data';
import { ArrowRight, MessageSquare, User } from 'lucide-react';

interface CollaboratorCardProps {
  creator: ActionableCreator;
  onClick: (creator: ActionableCreator) => void;
}

const getCategoryDetails = (category: ActionableCreator['category']) => {
  switch (category) {
    case 'Reach Target':
      return {
        title: 'Reach Target',
        color: 'text-red-400',
      };
    case 'Peer Swap':
      return {
        title: 'Peer Swap',
        color: 'text-blue-400',
      };
    case 'Rising Star':
      return {
        title: 'Rising Star',
        color: 'text-green-400',
      };
  }
};

const CollaboratorCard: React.FC<CollaboratorCardProps> = ({ creator, onClick }) => {
  const { title, color } = getCategoryDetails(creator.category);

  return (
    <Card 
      className="bg-gray-900 border-gray-800 text-white h-full flex flex-col transition-all hover:border-brand-primary/50 cursor-pointer"
      onClick={() => onClick(creator)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-sm font-bold uppercase tracking-wider ${color}`}>
            {title}
          </CardTitle>
          <User className={`h-4 w-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between pt-2">
        <div>
          <p className="text-2xl font-extrabold text-white mb-1">@{creator.handle}</p>
          <p className="text-sm text-gray-400 mb-4">
            <span className="font-semibold text-brand-primary">{creator.subscribers} subs</span>
          </p>
          <div className="text-xs text-gray-500 flex items-center space-x-1">
            <MessageSquare className="h-3 w-3" />
            <span>Last post: {creator.lastPostDate}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full bg-black border-gray-700 text-gray-300 hover:bg-gray-800 mt-4"
          // This button click is now handled by the card click, but we keep the visual for context
          onClick={(e) => { e.stopPropagation(); onClick(creator); }}
        >
          View Activity <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CollaboratorCard;