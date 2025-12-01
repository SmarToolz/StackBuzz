import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Flame, MessageSquare, User, Loader2, Download } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { ViralPost, mockViralPosts } from '@/lib/mock-data';
import PostInsightModal from './PostInsightModal';
import { mockPostInsights, PostInsight } from '@/lib/mock-data';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { downloadCSV } from '@/lib/export-utils';

const ViralPostList: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<ViralPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ViralPost | null>(null);
  const [insight, setInsight] = useState<PostInsight | null>(null);

  const handleSearch = (searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      toast.error("Please enter a keyword to find trends.");
      return;
    }
    
    setIsLoading(true);
    setResults([]);
    
    // Simulate 3-second live scrape/backend magic
    setTimeout(() => {
      // In a real app, this would be an API call based on the keyword
      setResults(mockViralPosts); 
      setIsLoading(false);
      toast.success(`Found ${mockViralPosts.length} viral trends for "${searchKeyword}"`);
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(keyword);
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
    if (results.length === 0) {
      toast.error("No data to export. Run a search first.");
      return;
    }
    downloadCSV(results, 'substrate_viral_trends.csv');
    toast.success(`Exported ${results.length} viral trends.`);
  };

  // Initial load simulation (optional, but good for first view)
  useEffect(() => {
    handleSearch("AI");
  }, []);


  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="w-full text-center mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-4">
          What topic are you researching?
        </h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="e.g., AI, Climate Tech, Marketing Funnels"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-14 pl-12 pr-4 text-lg bg-gray-900 border-gray-700 text-white focus:ring-brand-primary focus:border-brand-primary transition-all"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Press Enter to run a live scrape for fresh data.</p>
      </div>
      
      {/* Export Button */}
      <div className="flex justify-end mb-6">
        <Button 
          variant="outline" 
          onClick={handleExport}
          className="bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <Download className="h-4 w-4 mr-2" />
          Download CSV
        </Button>
      </div>

      {/* Results Display */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Loader2 className="h-10 w-10 animate-spin text-brand-primary mb-4" />
          <p className="text-lg font-medium">Running live scrape... (3 seconds)</p>
          <p className="text-sm">Fetching the freshest viral data right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((post) => (
              <Card 
                key={post.id} 
                className="bg-gray-900 border-gray-800 text-white cursor-pointer hover:border-brand-primary transition-all"
                onClick={() => handlePostClick(post)}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="text-left flex-grow min-w-0 pr-4">
                    <p className="text-lg font-bold truncate hover:text-brand-primary transition-colors">
                      {post.title}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      <User className="h-3 w-3 inline mr-1" /> {post.author} · {post.subscribers} subs
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Flame className="h-5 w-5 text-brand-primary" />
                    <span className="text-xl font-extrabold tabular-nums">
                      {post.commentCount}
                    </span>
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500 p-10 border border-dashed border-gray-800 rounded-lg">
                No viral posts found yet. Try searching for a broad topic like "AI" or "Finance."
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