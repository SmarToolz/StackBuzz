import React, { useState } from "react";
import TopicSearch from "@/components/TopicSearch";
import LivePulseCard from "@/components/LivePulseCard";
import ActionableCreatorFeed from "@/components/ActionableCreatorFeed";
import { toast } from "sonner";

const DashboardPage: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState("AI Ethics");

  const handleTopicChange = (newTopic: string) => {
    if (newTopic.trim() === "") {
        toast.error("Please enter a topic to search.");
        return;
    }
    setCurrentTopic(newTopic);
    toast.info(`Dashboard updated for topic: "${newTopic}"`);
    // In a real app, this would trigger data fetching for LivePulseCard and ActionableCreatorFeed
  };

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Your Creator Radar
        </h1>

        {/* 1. Topic Input */}
        <TopicSearch initialTopic={currentTopic} onTopicChange={handleTopicChange} />

        {/* 2. Live Pulse Card */}
        <div className="mb-10 max-w-3xl mx-auto">
          <LivePulseCard />
        </div>

        {/* 3. Actionable Creator Feed */}
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Who to DM Today
        </h2>
        <ActionableCreatorFeed />
      </div>
    </div>
  );
};

export default DashboardPage;