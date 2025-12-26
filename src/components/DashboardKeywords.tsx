import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSavedKeywords } from '@/hooks/useSavedKeywords';
import { Loader2, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardKeywords: React.FC = () => {
  const { savedKeywords, isLoading } = useSavedKeywords();

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800 text-white h-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-300 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
            Pinned Trend Radar
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-800 text-white h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-300 flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
          Pinned Trend Radar
        </CardTitle>
        <Link to="/trends">
            <Button variant="link" className="text-sm text-brand-primary hover:text-brand-hover p-0 h-auto">
                View All
            </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {savedKeywords.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p className="mb-3">No keywords pinned yet.</p>
            <Link to="/trends">
                <Button size="sm" className="bg-brand-primary hover:bg-brand-hover">
                    Start Tracking Trends
                </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {savedKeywords.slice(0, 5).map((keyword) => {
              const ChangeIcon = keyword.isUp ? ArrowUp : ArrowDown;
              const changeColor = keyword.isUp ? 'text-green-400' : 'text-red-400';
              
              return (
                <div key={keyword.id} className="flex justify-between items-center p-4 hover:bg-gray-800 transition-colors">
                  <div className="flex flex-col text-left">
                    <p className="text-base font-semibold text-white">{keyword.keyword}</p>
                    <p className="text-xs text-gray-500">Last updated: {keyword.lastUpdated}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-right">
                    <div className="text-sm text-gray-400 tabular-nums">
                        {keyword.commentCount.toLocaleString()} comments
                    </div>
                    <div className={cn("flex items-center text-sm font-bold tabular-nums", changeColor)}>
                      <ChangeIcon className="h-3 w-3 mr-1" />
                      {keyword.changePercent}%
                    </div>
                  </div>
                </div>
              );
            })}
            {savedKeywords.length > 5 && (
                <div className="p-4 text-center text-sm text-gray-500">
                    ... and {savedKeywords.length - 5} more.
                </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardKeywords;