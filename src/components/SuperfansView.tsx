import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { MessageSquare, Zap, Link, Send } from 'lucide-react';
import { mockSuperfans, mockUserPosts, Superfan } from '@/lib/mock-data';

const SuperfanCard: React.FC<{ fan: Superfan }> = ({ fan }) => {
  const handleThank = () => {
    // Simulate opening a Substack DM link
    toast.success(`Simulating opening DM to ${fan.name} (${fan.handle}).`);
    console.log(`Action: Thank privately ${fan.handle}`);
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <div className="text-3xl font-extrabold text-brand-primary tabular-nums w-8 text-center">
          {fan.commentCount}
        </div>
        <div>
          <p className="text-lg font-semibold text-white">{fan.name}</p>
          <p className="text-sm text-gray-400">{fan.handle} · Last comment {fan.lastCommentDate}</p>
        </div>
      </div>
      <Button 
        onClick={handleThank} 
        className="bg-brand-primary hover:bg-brand-hover text-white"
        size="sm"
      >
        <Send className="h-4 w-4 mr-2" />
        Thank privately
      </Button>
    </Card>
  );
};

const SuperfansView: React.FC = () => {
  const [isSubstackConnected, setIsSubstackConnected] = useState(false);
  const [substackUrl, setSubstackUrl] = useState('');

  const handleConnect = () => {
    if (!substackUrl.includes('substack.com')) {
      toast.error("Please enter a valid Substack URL.");
      return;
    }
    setIsSubstackConnected(true);
    toast.success("Substack connected! Analyzing your superfans now.");
  };

  if (!isSubstackConnected) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-gray-900 border border-gray-800 rounded-lg space-y-6 text-center">
        <Zap className="h-10 w-10 text-brand-primary mx-auto" />
        <h3 className="text-2xl font-bold text-white">Connect Your Substack</h3>
        <p className="text-gray-400">
          Enter your Substack URL to pull your last 20 posts and identify your most engaged readers.
        </p>
        <div className="flex space-x-2">
          <Input
            placeholder="https://yournewsletter.substack.com"
            value={substackUrl}
            onChange={(e) => setSubstackUrl(e.target.value)}
            className="bg-black border-gray-700 text-white h-12 focus:ring-brand-primary"
          />
          <Button onClick={handleConnect} className="bg-brand-primary hover:bg-brand-hover flex-shrink-0">
            <Link className="h-4 w-4 mr-2" />
            Connect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white">
          Your Superfan Leaderboard
        </h3>
        <p className="text-gray-400 mt-2">
          These readers commented the most across your last {mockUserPosts.length} posts.
        </p>
      </div>

      {/* Superfan List */}
      <div className="space-y-4">
        {mockSuperfans.map((fan) => (
          <SuperfanCard key={fan.id} fan={fan} />
        ))}
      </div>
      
      {/* Post Summary */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-brand-primary flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Recent Post Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-400">
          {mockUserPosts.map((post) => (
            <div key={post.id} className="flex justify-between border-b border-gray-800 last:border-b-0 py-2">
              <span className="truncate">{post.title}</span>
              <span className="font-semibold text-white ml-4 flex-shrink-0">{post.commentCount} comments</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperfansView;