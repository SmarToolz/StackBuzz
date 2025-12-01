import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Creator, topCreators } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CreatorItem: React.FC<{ creator: Creator }> = ({ creator }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-md transition-colors border-b border-gray-800 last:border-b-0">
    <div className="flex flex-col text-left">
      <span className="font-semibold text-white">{creator.name}</span>
      <span className="text-xs text-gray-400">{creator.topic}</span>
    </div>
    <div className="flex items-center space-x-3">
      <Badge variant="secondary" className="bg-gray-700 text-white hover:bg-gray-700/80">
        {creator.subscribers} Subs
      </Badge>
      <span className="text-sm font-bold text-brand-primary">{creator.engagement}%</span>
      <ArrowRight className="h-4 w-4 text-gray-500" />
    </div>
  </div>
);

const TopCreatorsList: React.FC = () => {
  return (
    <Card className="bg-gray-900 border-gray-800 text-white h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Top Influencers & Collaborators</CardTitle>
        <p className="text-sm text-gray-400">Creators driving the most engagement this week.</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-800">
          {topCreators.map((creator) => (
            <CreatorItem key={creator.id} creator={creator} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCreatorsList;