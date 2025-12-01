import React from "react";

const SearchHistoryPage: React.FC = () => {
  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-brand-primary">Search History</h1>
      <p className="text-gray-400">This page will display a history of your trend searches and topic updates.</p>
      {/* Placeholder content */}
      <div className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded-lg">
        <p className="text-sm text-gray-500">Feature coming soon: Detailed log of all topics searched.</p>
      </div>
    </div>
  );
};

export default SearchHistoryPage;