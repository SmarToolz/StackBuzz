import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ActionableCreator } from '@/lib/mock-data';
import { Copy, MessageSquare, TrendingUp, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CollaboratorDetailModalProps {
  creator: ActionableCreator;
  isOpen: boolean;
  onClose: () => void;
}

const CollaboratorDetailModal: React.FC<CollaboratorDetailModalProps> = ({ creator, isOpen, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(creator.outreachLine);
    toast.success("Outreach line copied to clipboard!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-brand-primary">
            @{creator.handle} Activity Radar
          </DialogTitle>
          <p className="text-gray-400 text-sm mt-1">
            {creator.subscribers} subscribers · Category: {creator.category}
          </p>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Posting Cadence Graph */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-300">
              <Calendar className="h-5 w-5 mr-2 text-blue-400" />
              Weekly Posting Cadence
            </h3>
            <div className="h-48 w-full bg-gray-800 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={creator.postHistory} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', color: '#FFFFFF' }}
                    labelStyle={{ color: '#E86324' }}
                  />
                  <Bar dataKey="posts" fill="#E86324" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-300">
              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
              Top 3 Recent Posts
            </h3>
            <div className="space-y-3">
              {creator.recentPosts.map((post, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-md border border-gray-700">
                  <p className="text-base font-medium text-white truncate">{post.title}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-400 flex-shrink-0 ml-4">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.commentCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action: Copy Outreach Line */}
        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-2 text-brand-primary">
            Actionable Outreach Line
          </h3>
          <p className="text-sm text-gray-300 mb-4 italic p-3 bg-gray-800 rounded-md border border-gray-700">
            {creator.outreachLine}
          </p>
          <Button 
            onClick={handleCopy} 
            className="w-full bg-brand-primary hover:bg-brand-hover text-white"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy outreach line
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollaboratorDetailModal;