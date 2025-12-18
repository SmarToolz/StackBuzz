import React from 'react';
import { mockSavedKeywords, SavedKeyword } from '@/lib/mock-data';
import { Star, RefreshCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SavedKeywordsListProps {
  onKeywordClick: (keyword: string) => void;
}

const KeywordItem: React.FC<{ keyword: SavedKeyword; onClick: (keyword: string) => void }> = ({ keyword, onClick }) => {
  const changeColor = keyword.isUp ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30';
  const changeIndicator = keyword.isUp ? '↑' : '↓';

  return (
    <div 
      className="flex items-center space-x-2 p-2 rounded-md bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer group"
      onClick={() => onClick(keyword.keyword)}
    >
      <span className="font-medium text-white group-hover:text-brand-primary transition-colors">
        {keyword.keyword}
      </span>
      
      <span className="text-xs text-gray-400 whitespace-nowrap">
        {keyword.commentCount.toLocaleString()} comments
      </span>
      
      <Badge className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", changeColor)}>
        {changeIndicator} {keyword.changePercent} %
      </Badge>
      
      {/* Last Updated Time */}
      <span className="text-xs text-gray-500 whitespace-nowrap hidden sm:inline">
        Updated: {keyword.lastUpdated}
      </span>
      
      {/* Refresh Button (Triggers a new search/quota deduction) */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 text-gray-500 hover:text-brand-primary flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onClick(keyword.keyword); // Triggers the parent's search/quota logic
        }}
        title={`Refresh live data for ${keyword.keyword} (uses 1 search quota)`}
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
      
      {/* Placeholder for unpin/delete action */}
      <X className="h-3 w-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400" onClick={(e) => {
        e.stopPropagation(); // Prevent triggering the keyword click
        console.log(`Unpinning ${keyword.keyword}`);
        // In a real app, this would call a function to remove the keyword
      }} />
    </div>
  );
};

const SavedKeywordsList: React.FC<SavedKeywordsListProps> = ({ onKeywordClick }) => {
  const savedCount = mockSavedKeywords.length;

  return (
    <div className="w-full max-w-3xl mx-auto text-left mb-10 p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-2 fill-yellow-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            Saved Keywords ({savedCount})
          </h3>
        </div>
      </div>
      
      {savedCount > 0 ? (
        <div className="flex flex-wrap gap-3">
          {mockSavedKeywords.map((keyword) => (
            <KeywordItem key={keyword.id} keyword={keyword} onClick={onKeywordClick} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">
          No keywords saved yet. Click the star icon next to a search result to pin it here.
        </p>
      )}
      
      <p className="text-xs text-gray-600 mt-4 pt-3 border-t border-gray-900">
        Click a keyword or the refresh icon to instantly reload the full Trends view (uses one search quota).
      </p>
    </div>
  );
};

export default SavedKeywordsList;