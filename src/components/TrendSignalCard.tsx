import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ViralPost } from '@/lib/mock-data';
import { Flame, MessageSquare, User, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TrendSignalCardProps {
  post: ViralPost;
  onClick: (post: ViralPost) => void;
}

// Mock logic for trend status and DM badge for visual effect
const getSignalStatus = (commentCount: number) => {
    if (commentCount > 400) return { isUp: true, change: '+180%', dmBadge: true, color: 'text-green-400' };
    if (commentCount > 200) return { isUp: true, change: '+45%', dmBadge: false, color: 'text-yellow-400' };
    return { isUp: false, change: '-12%', dmBadge: false, color: 'text-red-400' };
};

const TrendSignalCard: React.FC<TrendSignalCardProps> = ({ post, onClick }) => {
  const { isUp, change, dmBadge, color } = getSignalStatus(post.commentCount);
  const TrendIcon = isUp ? ArrowUp : ArrowDown;

  return (
    <Card 
      className={cn(
        "bg-gray-900 border-gray-800 text-white cursor-pointer transition-all duration-300",
        "hover:border-brand-primary/70 hover:shadow-lg hover:shadow-brand-primary/10",
        "flex flex-col"
      )}
      onClick={() => onClick(post)}
    >
      <CardContent className="p-4 flex flex-col justify-between flex-grow">
        
        {/* Top Row: Status and Metrics */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <TrendIcon className={cn("h-4 w-4", color)} />
            <Badge className={cn("text-xs font-semibold", isUp ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400')}>
              {change} Velocity
            </Badge>
          </div>
          
          {dmBadge && (
            <Badge className="bg-brand-primary text-white font-bold uppercase tracking-wider">
              DM Today
            </Badge>
          )}
        </div>

        {/* Middle: Post Title */}
        <div className="text-left flex-grow min-w-0 pr-4">
          <p className="text-xl font-bold text-white line-clamp-2">
            {post.title}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            <User className="h-3 w-3 inline mr-1" /> {post.author} · {post.subscribers} subs
          </p>
        </div>
        
        {/* Bottom: Engagement */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800 mt-4">
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-brand-primary" />
            <span className="text-2xl font-extrabold tabular-nums text-white">
              {post.commentCount}
            </span>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-brand-primary hover:bg-gray-800"
          >
            Get Strategy <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendSignalCard;