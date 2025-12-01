import React, { useState } from "react";
import TopicSearch from "@/components/TopicSearch";
import LivePulseCard from "@/components/LivePulseCard";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollaboratorView from "@/components/CollaboratorView";

const DashboardPage: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState("AI Ethics");

  const handleTopicChange = (newTopic: string) => {
    if (newTopic.trim() === "") {
        toast.error("Please enter a topic to search.");
        return;
    }
    setCurrentTopic(newTopic);
    toast.info(`Dashboard updated for topic: "${newTopic}"`);
    // In a real app, this would trigger data fetching for LivePulseCard and CollaboratorView
  };

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Your Creator Radar
        </h1>

        {/* 1. Topic Input (Persists across tabs) */}
        <TopicSearch initialTopic={currentTopic} onTopicChange={handleTopicChange} />

        <Tabs defaultValue="collaborators" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-gray-900 border border-gray-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="collaborators" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              Collaborators
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard">
            {/* Live Pulse Card */}
            <div className="mb-10 max-w-3xl mx-auto">
              <LivePulseCard />
            </div>
            
            <div className="text-center text-gray-500 p-10 border border-dashed border-gray-800 rounded-lg">
                Dashboard content coming soon. Use the Collaborators tab for networking insights.
            </div>
          </TabsContent>

          {/* Collaborators Tab Content */}
          <TabsContent value="collaborators">
            <CollaboratorView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;