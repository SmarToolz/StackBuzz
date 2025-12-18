import React from "react";
import ExportCard from "@/components/ExportCard";
import { mockActionableCreators, mockViralPosts } from "@/lib/mock-data";
import { Users, TrendingUp } from "lucide-react";

const ExportsPage: React.FC = () => {
  // Mock data for demonstration
  const mockTrendsData = mockViralPosts;
  const mockCollaboratorsData = mockActionableCreators;

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Data Exports</h1>
        <p className="text-gray-400 mb-10">
          Download raw data from your recent searches and collaboration analysis for external use.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExportCard
            title="Collaborator List"
            description="Export the full list of actionable creators identified by the Intelligent Stack, including match scores and outreach lines."
            data={mockCollaboratorsData}
            filename="stackbuzz_collaborators.csv"
            icon={Users}
          />
          <ExportCard
            title="Viral Trends Data"
            description="Export the raw data from your last successful trend search, including post titles, authors, and comment counts."
            data={mockTrendsData}
            filename="stackbuzz_viral_trends.csv"
            icon={TrendingUp}
          />
        </div>
        
        <div className="mt-12 p-4 bg-gray-900 border border-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-brand-primary mb-2">Pro Tip:</h3>
          <p className="text-sm text-gray-500">
            Only Pro users can download CSVs. Upgrade your plan to unlock this feature and integrate StackBuzz data into your own spreadsheets or CRM.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExportsPage;