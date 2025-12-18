import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// Mock quota limits based on pricing tiers
const MAX_BASIC_SEARCHES = 3;
// NOTE: In a real app, this would be determined by user metadata/session
const IS_PRO_USER = false; 

export const useSearchQuota = () => {
  // In a real app, this would be fetched from Supabase user metadata
  const [searchesRemaining, setSearchesRemaining] = useState(MAX_BASIC_SEARCHES);
  const [isPro, setIsPro] = useState(IS_PRO_USER); 

  const checkAndDeductQuota = useCallback((action: 'search' | 'refresh') => {
    if (isPro) {
      return true; // Pro users have unlimited quota
    }

    if (searchesRemaining > 0) {
      setSearchesRemaining(prev => prev - 1);
      // Note: We show the remaining count *after* deduction
      toast.success(`Quota used. ${searchesRemaining - 1} searches remaining this week.`);
      return true;
    } else {
      toast.error(
        `Quota exceeded. You have 0 searches remaining. Upgrade to Pro for unlimited access or wait for the weekly reset.`,
        {
          action: {
            label: "View Pricing",
            onClick: () => window.location.href = '/pricing',
          }
        }
      );
      return false;
    }
  }, [searchesRemaining, isPro]);

  return {
    searchesRemaining,
    isPro,
    checkAndDeductQuota,
    MAX_BASIC_SEARCHES,
  };
};