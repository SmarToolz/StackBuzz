import React from "react";
import ViralPostList from "@/components/ViralPostList";

const TrendsPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <ViralPostList />
      </div>
    </div>
  );
};

export default TrendsPage;