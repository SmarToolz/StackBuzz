import React from 'react';
import { mockHeatmapData, HeatmapActivity } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

// Helper function to map activity count (0-100) to a Tailwind opacity class
const getActivityColor = (count: number): string => {
  if (count > 80) return 'bg-brand-primary/90';
  if (count > 60) return 'bg-brand-primary/70';
  if (count > 40) return 'bg-brand-primary/50';
  if (count > 20) return 'bg-brand-primary/30';
  if (count > 5) return 'bg-brand-primary/10';
  return 'bg-gray-800/50'; // Low or zero activity
};

const ActivityHeatmap: React.FC = () => {
  // Group data by day for easier rendering
  const groupedData = mockHeatmapData.reduce((acc, item) => {
    if (!acc[item.dayIndex]) {
      acc[item.dayIndex] = [];
    }
    acc[item.dayIndex].push(item);
    return acc;
  }, {} as Record<number, HeatmapActivity[]>);

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
          Engagement Heatmap (Last 7 Days)
        </CardTitle>
        <p className="text-sm text-gray-500">
          When are viral posts and high-engagement comments peaking?
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
                  {groupedData[dayIndex]?.map((item) => (
                    <div
                      key={`${item.dayIndex}-${item.hour}`}
                      className={cn(
                        "w-4 h-4 rounded-sm transition-colors duration-100",
                        getActivityColor(item.activityCount)
                      )}
                      title={`Day: ${dayName}, Hour: ${item.hour}:00, Activity: ${item.activityCount}`}
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

export default ActivityHeatmap;