import React from "react";

const SearchHistoryPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-brand-primary">Search History</h1>
        <p className="text-gray-400">This page will display a history of your trend searches and topic updates.</p>
        
        {/* Placeholder content */}
        <div className="mt-8 p-6 bg-gray-900 border border-gray-800 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-white">Recent Activity Log</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p className="border-b border-gray-800 pb-2">
              [2025-10-26 14:30] Searched for "AI Ethics" (12 viral posts found).
            </p>
            <p className="border-b border-gray-800 pb-2">
              [2025-10-25 09:15] Refreshed "Indie Hacking" (5 new collaborators identified).
            </p>
            <p className="border-b border-gray-800 pb-2">
              [2025-10-24 18:00] Searched for "Climate Tech" (No new signals).
            </p>
          </div>
          <p className="text-xs text-gray-500 pt-2">
            Feature coming soon: Detailed log of all topics searched. Click a log entry to re-run the search and view the full results on the Trends page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;