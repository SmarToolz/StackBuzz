import { TrendingUp, Users, MessageSquare, Zap } from "lucide-react";

// --- KPI Data ---
export const kpiData = [
  {
    title: "Trending Topics",
    value: "12,450",
    change: "+20.1% from last month",
    icon: TrendingUp,
    color: "text-brand-primary",
  },
  {
    title: "New Creators Tracked",
    value: "5,320",
    change: "+15% from last month",
    icon: Users,
    color: "text-green-400",
  },
  {
    title: "Average Engagement Score",
    value: "92%",
    change: "Highest score this quarter",
    icon: MessageSquare,
    color: "text-blue-400",
  },
  {
    title: "Velocity Spike Alerts",
    value: "14",
    change: "3 critical spikes today",
    icon: Zap,
    color: "text-red-400",
  },
];

// --- Trend Velocity Chart Data ---
export const trendVelocityData = [
  { name: 'Day 1', velocity: 4000 },
  { name: 'Day 2', velocity: 3000 },
  { name: 'Day 3', velocity: 2000 },
  { name: 'Day 4', velocity: 2780 },
  { name: 'Day 5', velocity: 1890 },
  { name: 'Day 6', velocity: 2390 },
  { name: 'Day 7', velocity: 3490 },
];

// --- Top Creators Data ---
export interface Creator {
  id: number;
  name: string;
  topic: string;
  subscribers: string;
  engagement: number;
}

export const topCreators: Creator[] = [
  { id: 1, name: "Jane Doe", topic: "Future of AI", subscribers: "15k", engagement: 95 },
  { id: 2, name: "Alex Smith", topic: "Indie Hacking", subscribers: "8k", engagement: 88 },
  { id: 3, name: "Chris Lee", topic: "Web3 & Culture", subscribers: "22k", engagement: 91 },
  { id: 4, name: "Maria Garcia", topic: "Remote Work Burnout", subscribers: "12k", engagement: 85 },
];