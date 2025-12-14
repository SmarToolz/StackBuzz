import React from "react";
import { useOutletContext } from "react-router-dom";
import SuperfansView from "@/components/SuperfansView";

interface IntelligentStackContext {
    currentTopic: string;
}

const SuperfansPage: React.FC = () => {
  // currentTopic is not used in this component, but context interface remains for consistency if needed elsewhere.
  const { currentTopic } = useOutletContext<IntelligentStackContext>();

  return (
    <div className="pt-8">
      <h2 className="text-3xl font-bold mb-6 text-white">My Superfans</h2>
      <SuperfansView />
    </div>
  );
};

export default SuperfansPage;