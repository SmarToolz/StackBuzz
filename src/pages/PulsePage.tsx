import React from "react";
import { useOutletContext } from "react-router-dom";
import LivePulseCard from "@/components/LivePulseCard";

interface IntelligentStackContext {
    currentTopic: string;
}

const PulsePage: React.FC = () => {
  const { currentTopic } = useOutletContext<IntelligentStackContext>();

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Live Pulse for "{currentTopic}"</h2>
      <LivePulseCard />
    </div>
  );
};

export default PulsePage;