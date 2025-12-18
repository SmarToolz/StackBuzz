import { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

// Mock quota limits based on pricing tiers
const MAX_BASIC_SEARCHES_MONTHLY = 20;
const MAX_PRO_UPDATE_CREDITS = 20;
// NOTE: In a real app, this would be determined by user metadata/session
const IS_PRO_USER = false; 
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export const useSearchQuota = () => {
  // In a real app, these would be fetched from Supabase user metadata
  const [basicSearchesRemaining, setBasicSearchesRemaining] = useState(MAX_BASIC_SEARCHES_MONTHLY);
  const [proUpdateCreditsRemaining, setProUpdateCreditsRemaining] = useState(MAX_PRO_UPDATE_CREDITS);
  const [isPro, setIsPro] = useState(IS_PRO_USER); 
  
  // State to track last search time
  const [lastSearchTimestamp, setLastSearchTimestamp] = useState<number | null>(null);

  const isPulseLive = useMemo(() => {
    // If no search has been made, assume it's live
    if (!lastSearchTimestamp) return true; 
    // Check if less than 24 hours have passed since the last search
    return (Date.now() - lastSearchTimestamp) < TWENTY_FOUR_HOURS_MS;
  }, [lastSearchTimestamp]);


  const checkAndDeductQuota = useCallback((action: 'search' | 'refresh') => {
    
    let quotaPassed = false;

    if (isPro) {
      // Pro User Logic: Unlimited searches, but limited refreshes
      if (action === 'search') {
        // New searches are unlimited for Pro
        toast.success(`Pro Radar: Unlimited search used.`);
        quotaPassed = true;
      } else if (action === 'refresh') {
        if (proUpdateCreditsRemaining > 0) {
          setProUpdateCreditsRemaining(prev => prev - 1);
          toast.success(`Refresh credit used. ${proUpdateCreditsRemaining - 1} update credits remaining this month.`);
          quotaPassed = true;
        } else {
          toast.error(
            `Pro Update Credit exceeded. You have 0 update credits remaining. Buy Radar Surges: $5 for 5 extra credits.`,
            {
              action: {
                label: "View Pricing",
                onClick: () => window.location.href = '/pricing',
              }
            }
          );
          quotaPassed = false;
        }
      }
    } else {
      // Basic User Logic: Limited searches/refreshes
      if (basicSearchesRemaining > 0) {
        setBasicSearchesRemaining(prev => prev - 1);
        toast.success(`Quota used. ${basicSearchesRemaining - 1} searches remaining this month.`);
        quotaPassed = true;
      } else {
        toast.error(
          `Basic Quota exceeded. You have 0 searches remaining. Upgrade to Pro or buy Radar Surges ($5 for 5 credits).`,
          {
            action: {
              label: "View Pricing",
              onClick: () => window.location.href = '/pricing',
            }
          }
        );
        quotaPassed = false;
      }
    }
    
    // If quota check passed, record the timestamp for the 'Live Pulse' logic
    if (quotaPassed) {
        setLastSearchTimestamp(Date.now());
    }
    
    return quotaPassed;

  }, [basicSearchesRemaining, proUpdateCreditsRemaining, isPro]);

  return {
    basicSearchesRemaining,
    proUpdateCreditsRemaining,
    isPro,
    checkAndDeductQuota,
    MAX_BASIC_SEARCHES_MONTHLY,
    MAX_PRO_UPDATE_CREDITS,
    isPulseLive,
  };
};