import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrendVelocityChart from "@/components/TrendVelocityChart";
import TopCreatorsList from "@/components/TopCreatorsList";
import { kpiData } from "@/lib/mock-data";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  Icon: LucideIcon;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, Icon, color }) => (
  <Card className="bg-gray-900 border-gray-800 text-white">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">
        {title}
      </CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500 mt-1">{change}</p>
    </CardContent>
  </Card>
);

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
        <p className="text-gray-400 mb-8">Real-time insights into Substack trends and creator activity.</p>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpiData.map((kpi) => (
            <KpiCard 
              key={kpi.title} 
              title={kpi.title} 
              value={kpi.value} 
              change={kpi.change} 
              Icon={kpi.icon} 
              color={kpi.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Velocity Chart (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800 text-white p-6">
              <CardTitle className="text-xl font-bold mb-4">Trend Velocity (Last 7 Days)</CardTitle>
              <p className="text-sm text-gray-400 mb-4">Volume of mentions across all tracked topics.</p>
              <TrendVelocityChart />
            </Card>
          </div>

          {/* Top Creators List (1/3 width on large screens) */}
          <div className="lg:col-span-1">
            <TopCreatorsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;