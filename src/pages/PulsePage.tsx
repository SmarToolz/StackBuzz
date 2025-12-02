import React from "react";
import { useOutletContext } from "react-router-dom";
import LivePulseCard from "@/components/LivePulseCard";
import TopicHeatmap from "@/components/TopicHeatmap";
import { ViralPost } from "@/lib/mock-data";

interface IntelligentStackContext {
    currentTopic: string;
    viralPosts: ViralPost[];
}

const PulsePage: React.FC = () => {
  const { currentTopic, viralPosts } = useOutletContext<IntelligentStackContext>();

  return (
    <div className="max-w-4xl mx-auto pt-8 space-y-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Live Pulse for "{currentTopic}"</h2>
      
      {/* 1. Live Pulse Card */}
      <LivePulseCard />
      
      {/* 2. Topic Specific Heatmap */}
      <TopicHeatmap posts={viralPosts} />
    </div>
  );
};

export default PulsePage;