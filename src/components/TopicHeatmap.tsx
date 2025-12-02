import React from 'react';
import { ViralPost } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TopicHeatmapProps {
  posts: ViralPost[];
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

// Helper function to aggregate post data into a 7x24 grid
const aggregatePostActivity = (posts: ViralPost[]) => {
  // Initialize a 7x24 grid with zeros
  const activityGrid: number[][] = Array(7).fill(0).map(() => Array(24).fill(0));
  let maxActivity = 0;

  posts.forEach(post => {
    try {
      const date = new Date(post.post_date);
      // getDay() returns 0 for Sunday, 1 for Monday... We want 0 for Monday, 6 for Sunday.
      let dayIndex = date.getDay() - 1;
      if (dayIndex === -1) dayIndex = 6; // Sunday becomes index 6
      
      const hour = date.getHours();

      if (dayIndex >= 0 && dayIndex < 7 && hour >= 0 && hour < 24) {
        activityGrid[dayIndex][hour] += 1;
        if (activityGrid[dayIndex][hour] > maxActivity) {
          maxActivity = activityGrid[dayIndex][hour];
        }
      }
    } catch (e) {
      console.error("Invalid post date:", post.post_date, e);
    }
  });

  return { activityGrid, maxActivity };
};

// Helper function to map activity count to a Tailwind opacity class
const getActivityColor = (count: number, max: number): string => {
  if (max === 0) return 'bg-gray-800/50';
  
  const ratio = count / max;
  
  if (ratio > 0.75) return 'bg-brand-primary/90';
  if (ratio > 0.50) return 'bg-brand-primary/70';
  if (ratio > 0.25) return 'bg-brand-primary/50';
  if (ratio > 0.05) return 'bg-brand-primary/30';
  return 'bg-gray-800/50';
};

const TopicHeatmap: React.FC<TopicHeatmapProps> = ({ posts }) => {
  const { activityGrid, maxActivity } = aggregatePostActivity(posts);

  // Format hour labels (0, 6, 12, 18)
  const getHourLabel = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 6) return '6 AM';
    if (hour === 12) return '12 PM';
    if (hour === 18) return '6 PM';
    return '';
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-300">
          Optimal Posting Time (Based on {posts.length} Viral Posts)
        </CardTitle>
        <p className="text-sm text-gray-500">
          When are creators posting about this topic? Darker squares indicate higher frequency.
        </p>
      </CardHeader>
      <CardContent className="p-4 overflow-x-auto">
        <div className="flex flex-col min-w-[400px]">
          {/* Hour Labels (X-Axis) */}
          <div className="flex flex-row ml-10 mb-2">
            {hours.map((hour) => (
              <div 
                key={hour} 
                className="w-4 text-center text-[10px] text-gray-500 flex-shrink-0"
              >
                {getHourLabel(hour)}
              </div>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="flex flex-col space-y-1">
            {days.map((dayName, dayIndex) => (
              <div key={dayIndex} className="flex items-center">
                {/* Day Label (Y-Axis) */}
                <div className="w-10 text-right text-sm font-medium text-gray-400 mr-1 flex-shrink-0">
                  {dayName}
                </div>
                
                {/* Activity Cells */}
                <div className="flex flex-row space-x-1 flex-grow">
                  {activityGrid[dayIndex].map((count, hour) => (
                    <div
                      key={`${dayIndex}-${hour}`}
                      className={cn(
                        "w-4 h-4 rounded-sm transition-colors duration-100",
                        getActivityColor(count, maxActivity)
                      )}
                      title={`${dayName} ${hour}:00: ${count} posts`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicHeatmap;