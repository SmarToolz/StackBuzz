import { useState, useCallback } from 'react';
import { SavedKeyword, mockSavedKeywords } from '@/lib/mock-data';
import { toast } from 'sonner';

export const useSavedKeywords = () => {
  // Use mock data as initial state
  const [savedKeywords, setSavedKeywords] = useState<SavedKeyword[]>(mockSavedKeywords);

  const addKeyword = useCallback((keyword: string) => {
    if (savedKeywords.some(k => k.keyword.toLowerCase() === keyword.toLowerCase())) {
      toast.info(`"${keyword}" is already pinned.`);
      return;
    }

    // Simulate adding a new keyword with mock data structure
    const newKeyword: SavedKeyword = {
      id: Date.now(), // Simple unique ID
      keyword: keyword,
      commentCount: Math.floor(Math.random() * 1000) + 500,
      changePercent: Math.floor(Math.random() * 30) + 5,
      isUp: Math.random() > 0.5,
      lastUpdated: "just now",
    };

    setSavedKeywords(prev => [newKeyword, ...prev]);
    toast.success(`"${keyword}" pinned successfully!`);
  }, [savedKeywords]);

  const removeKeyword = useCallback((id: number) => {
    setSavedKeywords(prev => prev.filter(k => k.id !== id));
    toast.success("Keyword unpinned.");
  }, []);

  return {
    savedKeywords,
    addKeyword,
    removeKeyword,
  };
};