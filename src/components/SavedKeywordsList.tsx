import React from 'react';
import { mockSavedKeywords, SavedKeyword } from '@/lib/mock-data';
import { Star, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SavedKeywordsListProps {
  onKeywordClick: (keyword: string) => void;
}

const KeywordItem: React.FC<{ keyword: SavedKeyword; onClick: (keyword: string) => void }> = ({ keyword, onClick }) => {
  const ChangeIcon = keyword.isUp ? ArrowUp : ArrowDown;
  const changeColor = keyword.isUp ? 'text-green-400' : 'text-red-400';

  return (
    <span 
      className="text-sm text-gray-400 hover:text-brand-primary transition-colors cursor-pointer"
      onClick={() => onClick(keyword.keyword)}
    >
      <span className="font-semibold text-white hover:underline">
        {keyword.keyword}
      </span>
      {' '}
      → {keyword.commentCount.toLocaleString()} comments today
      {' '}
      <span className={cn("font-medium", changeColor)}>
        {keyword.isUp ? '↑' : '↓'} {keyword.changePercent} %
      </span>
    </span>
  );
};

const SavedKeywordsList: React.FC<SavedKeywordsListProps> = ({ onKeywordClick }) => {
  const savedCount = mockSavedKeywords.length;

  return (
    <div className="w-full max-w-3xl mx-auto text-left mb-10 p-4 bg-gray-900 border border-gray-800 rounded-lg">
      <div className="flex items-center mb-3">
        <Star className="h-4 w-4 text-yellow-400 mr-2 fill-yellow-400" />
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Saved ({savedCount})
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {mockSavedKeywords.map((keyword, index) => (
          <React.Fragment key={keyword.id}>
            <KeywordItem keyword={keyword} onClick={onKeywordClick} />
            {index < savedCount - 1 && <span className="text-gray-600">•</span>}
          </React.Fragment>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        Metrics auto-refresh every 4 hours. Click to instantly reload the full view.
      </p>
    </div>
  );
};

export default SavedKeywordsList;