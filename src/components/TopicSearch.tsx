import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TopicSearchProps {
  initialTopic: string;
  onTopicChange: (topic: string) => void;
}

const TopicSearch: React.FC<TopicSearchProps> = ({ initialTopic, onTopicChange }) => {
  const [topic, setTopic] = useState(initialTopic);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onTopicChange(topic);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center mb-12">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-4">
        What topic do you write about?
      </h2>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        <Input
          type="text"
          placeholder="e.g., AI Ethics, Climate Tech, Indie Hacking"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-14 pl-12 pr-4 text-lg bg-gray-900 border-gray-700 text-white focus:ring-brand-primary focus:border-brand-primary transition-all"
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">Press Enter to search and update the dashboard.</p>
    </div>
  );
};

export default TopicSearch;