import React from "react";
import { useOutletContext } from "react-router-dom";
import LivePulseCard from "@/components/LivePulseCard";
import TopicHeatmap from "@/components/TopicHeatmap";
import { ViralPost } from "@/lib/mock-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      
      {/* 2. Topic Specific Heatmap wrapped in Accordion */}
      <Accordion type="single" collapsible defaultValue="heatmap">
        <AccordionItem value="heatmap" className="border-gray-800 bg-gray-900 rounded-lg px-4">
          <AccordionTrigger className="text-xl font-semibold text-white hover:no-underline">
            Optimal Posting Time Heatmap
          </AccordionTrigger>
          <AccordionContent>
            {/* The TopicHeatmap component itself already contains a Card structure, so we pass the posts directly */}
            <TopicHeatmap posts={viralPosts} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PulsePage;