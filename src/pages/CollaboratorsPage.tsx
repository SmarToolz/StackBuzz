import React from "react";
import { useOutletContext } from "react-router-dom";
import CollaboratorView from "@/components/CollaboratorView";

interface IntelligentStackContext {
    currentTopic: string;
}

const CollaboratorsPage: React.FC = () => {
  const { currentTopic } = useOutletContext<IntelligentStackContext>();

  return (
    <div className="pt-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Potential Collaborators for "{currentTopic}"</h2>
      <CollaboratorView />
    </div>
  );
};

export default CollaboratorsPage;