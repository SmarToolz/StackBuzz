import React from "react";
import DashboardOverview from "@/components/DashboardOverview";

const DashboardPage: React.FC = () => {
  // The TopicSearch, Tabs, and related views have been moved to IntelligentStackPage.

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Overview remains as the primary content for the main dashboard route */}
        <div className="mb-12">
            <DashboardOverview />
        </div>
        
        <div className="text-center mt-20">
            <p className="text-lg text-gray-400">
                Navigate to the <span className="font-semibold text-brand-primary">Intelligent Stack</span> section to analyze topics and view creator insights.
            </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;