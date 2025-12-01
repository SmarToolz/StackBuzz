import React from "react";
import { useOutletContext } from "react-router-dom";
import SuperfansView from "@/components/SuperfansView";

interface IntelligentStackContext {
    currentTopic: string;
}

const SuperfansPage: React.FC = () => {
  const { currentTopic } = useOutletContext<IntelligentStackContext>();

  return (
    <div className="pt-8">
      <h2 className="text-3xl font-bold mb-6 text-white">My Superfans for "{currentTopic}"</h2>
      <SuperfansView />
    </div>
  );
};

export default SuperfansPage;