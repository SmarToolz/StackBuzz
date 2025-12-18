import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Loader2, Download } from 'lucide-react';
import { ViralPost, mockPostInsights, PostInsight } from '@/lib/mock-data';
import PostInsightModal from './PostInsightModal';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { downloadCSV } from '@/lib/export-utils';
import SavedKeywordsList from './SavedKeywordsList';
import { useQuery } from '@tanstack/react-query';
import { fetchViralPosts } from '@/api/trends';
import { useSearchQuota } from '@/hooks/useSearchQuota';
import TrendSignalCard from './TrendSignalCard';
import { cn } from '@/lib/utils';

const ViralPostList: React.FC = () => {
  const [keyword, setKeyword] = useState('AI'); // Default initial keyword for input field
  const [searchQuery, setSearchQuery] = useState('AI'); // State to hold the keyword used for the query
  const [selectedPost, setSelectedPost] = useState<ViralPost | null>(null);
  const [insight, setInsight] = useState<PostInsight | null>(null);
  
  const { basicSearchesRemaining, proUpdateCreditsRemaining, isPro, checkAndDeductQuota } = useSearchQuota();

  // Use React Query to manage fetching state
  const { data: results, isLoading, isFetching } = useQuery<ViralPost[]>({
    queryKey: ['viralPosts', searchQuery],
    queryFn: () => fetchViralPosts(searchQuery),
    // Only run the query if searchQuery is defined and not empty
    enabled: !!searchQuery,
    initialData: [],
  });

  const handleSearchAction = (query: string) => {
    if (!query.trim()) {
      toast.error("Please enter a keyword to find trends.");
      return;
    }
    
    // 1. Check Quota and Deduct (Action is 'search' for new searches)
    if (!checkAndDeductQuota('search')) {
        return; // Quota exceeded, toast shown by hook
    }

    // 2. Perform Search
    setSearchQuery(query.trim());
    toast.info(`Running radar scan for "${query.trim()}"...`);
  };

  const handleSearchInput = () => {
    handleSearchAction(keyword);
  };
  
  const handleKeywordClick = (clickedKeyword: string) => {
    setKeyword(clickedKeyword);
    
    // 1. Check Quota and Deduct (Action is 'refresh' for saved keyword clicks)
    if (!checkAndDeductQuota('refresh')) {
        return; // Quota exceeded, toast shown by hook
    }
    
    // 2. Perform Search/Refresh
    setSearchQuery(clickedKeyword);
    toast.info(`Refreshing live data for "${clickedKeyword}"...`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchInput();
    }
  };

  const handlePostClick = (post: ViralPost) => {
    setSelectedPost(post);
    // Fetch or retrieve mock insight data
    const postInsight = mockPostInsights[post.id] || mockPostInsights[1]; // Default to post 1 insight if ID not found
    setInsight(postInsight);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setInsight(null);
  };
  
  const handleExport = () => {
    if (!results || results.length === 0) {
      toast.error("No data to export. Run a search first.");
      return;
    }
    downloadCSV(results, `stackbuzz_viral_trends_${searchQuery}.csv`);
    toast.success(`Exported ${results.length} viral trends for "${searchQuery}".`);
  };

  const isDataLoading = isLoading || isFetching;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Headline */}
      <h1 className="text-4xl font-extrabold text-center mb-4 text-white">
        Scan the Radar — Discover What’s Buzzing Now
      </h1>
      <p className="text-lg text-gray-400 text-center mb-10 max-w-2xl mx-auto">
        Type a keyword, watch the radar light up with live signals, top posts, and who to DM.
      </p>
      
      {/* Search Input (Radar Style) */}
      <div className="w-full text-center mb-10">
        <div className={cn(
            "relative max-w-3xl mx-auto",
            // Subtle pulsing glow effect
            "p-0.5 rounded-xl transition-all duration-500",
            isDataLoading 
                ? "animate-soft-pulse bg-gradient-to-r from-brand-primary/50 via-brand-primary to-brand-primary/50" 
                : "border-2 border-gray-800"
        )}>
            <div className="relative bg-black rounded-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary" />
                <Input
                    type="text"
                    placeholder="🔍 Track a trend (e.g. AI ethics, indie dev, creator tools)"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-14 pl-12 pr-4 text-lg bg-transparent border-none text-white focus:ring-0 focus:border-0"
                />
            </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Press Enter or click 'Run Radar' to scan.</p>
      </div>
      
      {/* Quota Status */}
      <div className="text-center text-sm text-gray-500 mb-4">
        {isPro ? (
            <span className="text-green-400 font-semibold">Pro Plan: Unlimited Searches. {proUpdateCreditsRemaining} update credits remaining.</span>
        ) : (
            <span>Basic Plan: <span className="font-semibold text-brand-primary">{basicSearchesRemaining}</span> searches remaining this month.</span>
        )}
      </div>
      
      {/* Saved Keywords List */}
      <SavedKeywordsList onKeywordClick={handleKeywordClick} />

      {/* Action Bar (Run Radar Button & Export) */}
      <div className="flex justify-between items-center mb-6">
        <Button 
          onClick={handleSearchInput}
          className="h-10 px-6 text-base font-semibold bg-brand-primary hover:bg-brand-hover"
          disabled={isDataLoading}
        >
          {isDataLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            "Run Radar"
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleExport}
          className="bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
          disabled={isDataLoading || !results || results.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Download CSV
        </Button>
      </div>

      {/* Results Display */}
      {isDataLoading ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Loader2 className="h-10 w-10 animate-spin text-brand-primary mb-4" />
          <p className="text-lg font-medium">Scanning the Substack ecosystem... (3 seconds)</p>
          <p className="text-sm">Analyzing velocity for "{searchQuery}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results && results.length > 0 ? (
            results.map((post) => (
              <TrendSignalCard 
                key={post.id} 
                post={post} 
                onClick={handlePostClick} 
              />
            ))
          ) : (
            <div className="text-center text-gray-500 p-10 border border-dashed border-gray-800 rounded-lg col-span-full">
                No viral signals found yet for "{searchQuery}". Try searching for a broad topic like "AI" or "Finance."
            </div>
          )}
        </div>
      )}

      {selectedPost && insight && (
        <PostInsightModal
          post={selectedPost}
          insight={insight}
          isOpen={!!selectedPost}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ViralPostList;