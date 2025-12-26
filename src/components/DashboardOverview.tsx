import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSummaryStats, mockVelocityData, mockTopInfluencers, SummaryStat, TopInfluencer } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowUp } from "lucide-react";
import ActivityHeatmap from "./ActivityHeatmap";
import DashboardKeywords from "./DashboardKeywords"; // Import the Pinned Keywords component

// Helper component for the summary cards
const SummaryCard: React.FC<{ stat: SummaryStat }> = ({ stat }) => {
  const Icon = stat.icon;
  return (
    <Card className="bg-gray-900 border-gray-800 text-white h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          {stat.title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${stat.color}`} />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-3xl font-bold tabular-nums">{stat.value}</div>
        <p className={`text-xs mt-1 flex items-center ${stat.color}`}>
          <ArrowUp className="h-3 w-3 mr-1" />
          {stat.change}
        </p>
      </CardContent>
    </Card>
  );
};

// Helper component for the influencer list
const InfluencerItem: React.FC<{ influencer: TopInfluencer }> = ({ influencer }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-800 last:border-b-0">
    <div className="flex flex-col text-left">
      <p className="text-base font-semibold text-white">{influencer.name}</p>
      <p className="text-xs text-gray-500">{influencer.topic}</p>
    </div>
    <div className="flex items-center space-x-4 text-right">
      <div className="text-sm text-gray-400">{influencer.subs}</div>
      <div className="text-lg font-bold text-brand-primary">{influencer.engagement}</div>
    </div>
  </div>
);


const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Creator Dashboard</h2>
        <p className="text-gray-400 mt-1">Real-time insights into Substack trends and creator activity.</p>
      </div>

      {/* 1. Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockSummaryStats.map((stat, index) => (
          <SummaryCard key={index} stat={stat} />
        ))}
      </div>
      
      {/* 2. Engagement Heatmap */}
      <ActivityHeatmap />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Pinned Trend Radar (New) */}
        <div className="lg:col-span-1">
            <DashboardKeywords />
        </div>

        {/* 4. Trend Velocity Chart (Now lg:col-span-2) */}
        <Card className="lg:col-span-2 bg-gray-900 border-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-300">
              Trend Velocity (Last 7 Days)
            </CardTitle>
            <p className="text-sm text-gray-500">Volume of mentions across all tracked topics.</p>
          </CardHeader>
          <CardContent className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockVelocityData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', color: '#FFFFFF' }}
                  labelStyle={{ color: '#E86324' }}
                  formatter={(value: number) => [value.toLocaleString(), 'Mentions']}
                />
                <Bar dataKey="mentions" fill="#E86324" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 5. Top Influencers List (Moved to full width below) */}
      <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-300">
              Top Influencers & Collaborators
            </CardTitle>
            <p className="text-sm text-gray-500">Creators driving the most engagement this week.</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-800">
              {mockTopInfluencers.map((influencer, index) => (
                <InfluencerItem key={index} influencer={influencer} />
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default DashboardOverview;