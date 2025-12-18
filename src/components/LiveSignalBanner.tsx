import React, { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const LiveSignalBanner: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); 

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Using brand-primary for the pink/purple color seen in the image, 
  // but adjusting the background/border to fit the existing dark theme.
  return (
    <div className="flex justify-center mb-8">
      <div 
        className={cn(
          "flex items-center space-x-4 px-6 py-3 rounded-full",
          "bg-gray-900 border-2 border-brand-primary/50 shadow-lg shadow-brand-primary/10"
        )}
      >
        {/* Live Trend Signal */}
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <Zap className="h-5 w-5 text-brand-primary" />
          <span className="text-base font-semibold text-brand-primary">
            Live Trend Signal
          </span>
        </div>

        {/* Updated Time */}
        <div className="flex items-center space-x-2 text-gray-400">
          <Clock className="h-4 w-4" />
          <span className="text-sm tabular-nums">
            Updated: {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveSignalBanner;