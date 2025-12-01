import React, { useState } from "react";
import TopicSearch from "@/components/TopicSearch";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollaboratorView from "@/components/CollaboratorView";
import SuperfansView from "@/components/SuperfansView";
import DashboardOverview from "@/components/DashboardOverview";

const DashboardPage: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState("AI Ethics");

  const handleTopicChange = (newTopic: string) => {
    if (newTopic.trim() === "") {
        toast.error("Please enter a topic to search.");
        return;
    }
    setCurrentTopic(newTopic);
    toast.info(`Dashboard updated for topic: "${newTopic}"`);
    // In a real app, this would trigger data fetching for all dashboard components
  };

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Your Creator Radar
        </h1>

        {/* 1. Topic Input (Persists across tabs) */}
        <TopicSearch initialTopic={currentTopic} onTopicChange={handleTopicChange} />

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8 bg-gray-900 border border-gray-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="collaborators" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              Collaborators
            </TabsTrigger>
            <TabsTrigger value="superfans" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              My Superfans
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard">
            <DashboardOverview />
          </TabsContent>

          {/* Collaborators Tab Content */}
          <TabsContent value="collaborators">
            <CollaboratorView />
          </TabsContent>
          
          {/* Superfans Tab Content */}
          <TabsContent value="superfans">
            <SuperfansView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;