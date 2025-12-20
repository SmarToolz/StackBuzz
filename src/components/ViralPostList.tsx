import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Loader2, Star } from 'lucide-react';
import { ViralPost, mockPostInsights, PostInsight } from '@/lib/mock-data';
import PostInsightModal from './PostInsightModal';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import SavedKeywordsList from './SavedKeywordsList';
import { useQuery } from '@tanstack/react-query';
import { fetchViralPosts } from '@/api/trends';
import { useSearchQuota } from '@/hooks/useSearchQuota';
import TrendSignalCard from './TrendSignalCard';
import { cn } from '@/lib/utils';
import { useSavedKeywords } from '@/hooks/useSavedKeywords';

const ViralPostList: React.FC = () => {
  const [keyword, setKeyword] = useState('AI'); // Default initial keyword for input field
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the keyword used for the query
  const [selectedPost, setSelectedPost] = useState<ViralPost | null>(null);
  const [insight, setInsight] = useState<PostInsight | null>(null);
  
  const { basicSearchesRemaining, proUpdateCreditsRemaining, isPro, checkAndDeductQuota } = useSearchQuota();
  const { savedKeywords, addKeyword } = useSavedKeywords();

  // Use React Query to manage fetching state
  const { data: results, isLoading, isFetching } = useQuery<ViralPost[]>({
    queryKey: ['viralPosts', searchQuery],
    queryFn: () => fetchViralPosts(searchQuery),
    // Only run the query if searchQuery is defined and not empty
    enabled: !!searchQuery,
    initialData: [],
    // FIX: Disable refetching when the window regains focus
    refetchOnWindowFocus: false,
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
  
  const handlePinKeyword = () => {
    if (searchQuery) {
        addKeyword(searchQuery);
    }
  };

  const isDataLoading = isLoading || isFetching;
  const isKeywordSaved = savedKeywords.some(k => k.keyword.toLowerCase() === searchQuery.toLowerCase());

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
      <div className="w-full text-center mb-6">
        <div className={cn(
            "relative max-w-3xl mx-auto",
            // Subtle glow effect
            "p-0.5 rounded-xl transition-all duration-500",
            isDataLoading 
                ? "bg-gradient-to-r from-brand-primary/50 via-brand-primary to-brand-primary/50" 
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
        <p className="text-xs text-gray-500 mt-2 mb-6">Press Enter or click 'Run Radar' below to scan.</p>
        
        {/* Run Radar Button & Pin Button */}
        <div className="flex justify-center items-center space-x-4">
            <Button 
              onClick={handleSearchInput}
              className={cn(
                "h-12 px-8 text-lg font-bold transition-all duration-300",
                "bg-brand-primary hover:bg-brand-hover shadow-lg shadow-brand-primary/30",
                isDataLoading && "opacity-70"
              )}
              disabled={isDataLoading}
            >
              {isDataLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Run Radar"
              )}
            </Button>
            
            {searchQuery && !isDataLoading && (
                <Button
                    variant="outline"
                    className={cn(
                        "h-12 px-4 text-base font-semibold bg-gray-900 border-gray-700 text-white hover:bg-gray-800",
                        isKeywordSaved && "bg-yellow-900/30 border-yellow-400/50 text-yellow-400 hover:bg-yellow-900/50"
                    )}
                    onClick={handlePinKeyword}
                    disabled={isKeywordSaved}
                >
                    <Star className={cn("h-5 w-5 mr-2", isKeywordSaved ? "fill-yellow-400" : "text-yellow-400")} />
                    {isKeywordSaved ? "Keyword Pinned" : "Pin Keyword"}
                </Button>
            )}
        </div>
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
                {searchQuery ? (
                    <>No viral signals found yet for "{searchQuery}". Try searching for a broad topic like "AI" or "Finance."</>
                ) : (
                    <>Enter a keyword and click 'Run Radar' to start scanning for viral signals.</>
                )}
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