import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ViralPost, PostInsight } from '@/lib/mock-data';
import { Lightbulb, MessageSquare, User } from 'lucide-react';

interface PostInsightModalProps {
  post: ViralPost;
  insight: PostInsight;
  isOpen: boolean;
  onClose: () => void;
}

const PostInsightModal: React.FC<PostInsightModalProps> = ({ post, insight, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-primary">
            Deep Dive: {post.title}
          </DialogTitle>
          <DialogDescription className="text-gray-400 flex items-center space-x-4 pt-2">
            <span className="flex items-center text-sm">
              <User className="h-4 w-4 mr-1 text-gray-500" /> {post.author} ({post.subscribers} subs)
            </span>
            <span className="flex items-center text-sm">
              <MessageSquare className="h-4 w-4 mr-1 text-gray-500" /> {post.commentCount} comments
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Instant Insight: Word Cloud */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-300">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
              Trending Reply Topics (Instant Insight)
            </h3>
            <div className="flex flex-wrap gap-2">
              {insight.wordCloud.map((word, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-gray-800 text-brand-primary border-brand-primary/50 hover:bg-gray-700 transition-colors"
                >
                  {word}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">These are the terms blowing up in the comments section.</p>
          </div>

          {/* Value Add: Suggested Title */}
          <div className="p-4 bg-gray-800 border border-brand-primary/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-brand-primary">
              Your Counter-Angle Strategy
            </h3>
            <p className="text-xl font-bold text-white italic">
              {insight.suggestedTitle}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Use this title to capture the existing conversation and offer a fresh perspective.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-brand-primary hover:bg-brand-hover">
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostInsightModal;