import { useCallback } from 'react';
import { SavedKeyword } from '@/lib/mock-data';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/SupabaseAuthProvider';

// Define the structure of the data fetched from Supabase
interface DbSavedKeyword {
  id: number;
  user_id: string;
  keyword: string;
  comment_count: number;
  change_percent: number;
  is_up: boolean;
  last_updated: string;
}

// Helper function to map DB structure to frontend structure (SavedKeyword)
const mapToFrontend = (dbKeyword: DbSavedKeyword): SavedKeyword => ({
    id: dbKeyword.id,
    keyword: dbKeyword.keyword,
    commentCount: dbKeyword.comment_count,
    changePercent: dbKeyword.change_percent,
    isUp: dbKeyword.is_up,
    lastUpdated: new Date(dbKeyword.last_updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
});

// Query function to fetch saved keywords
const fetchSavedKeywords = async (userId: string): Promise<SavedKeyword[]> => {
  const { data, error } = await supabase
    .from('saved_keywords')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  // We cast the data to the expected DB structure before mapping
  return (data as DbSavedKeyword[]).map(mapToFrontend);
};

export const useSavedKeywords = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  // 1. Fetch Query
  const { data: savedKeywords = [], isLoading } = useQuery<SavedKeyword[]>({
    queryKey: ['savedKeywords', userId],
    queryFn: () => fetchSavedKeywords(userId!),
    enabled: !!userId, // Only run if user is logged in
  });

  // 2. Add Mutation
  const addMutation = useMutation({
    mutationFn: async (keyword: string) => {
      if (!userId) throw new Error("User not authenticated.");
      
      // Simulate initial mock data for a new keyword
      const newKeywordData = {
        user_id: userId,
        keyword: keyword,
        comment_count: Math.floor(Math.random() * 1000) + 500,
        change_percent: Math.floor(Math.random() * 30) + 5,
        is_up: Math.random() > 0.5,
      };

      const { data, error } = await supabase
        .from('saved_keywords')
        .insert([newKeywordData])
        .select()
        .single();

      if (error) {
        // Handle unique constraint error (keyword already exists)
        if (error.code === '23505') {
            throw new Error(`"${keyword}" is already pinned.`);
        }
        throw new Error(error.message);
      }
      return mapToFrontend(data as DbSavedKeyword);
    },
    onSuccess: (newKeyword) => {
      // Optimistically update the cache
      queryClient.setQueryData<SavedKeyword[]>(['savedKeywords', userId], (old) => {
        if (old) return [newKeyword, ...old];
        return [newKeyword];
      });
      toast.success(`"${newKeyword.keyword}" pinned successfully!`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const addKeyword = useCallback((keyword: string) => {
    addMutation.mutate(keyword);
  }, [addMutation]);

  // 3. Remove Mutation
  const removeMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!userId) throw new Error("User not authenticated.");
      
      const { error } = await supabase
        .from('saved_keywords')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
      return id;
    },
    onSuccess: (deletedId) => {
      // Optimistically update the cache
      queryClient.setQueryData<SavedKeyword[]>(['savedKeywords', userId], (old) => 
        old ? old.filter(k => k.id !== deletedId) : []
      );
      toast.success("Keyword unpinned.");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const removeKeyword = useCallback((id: number) => {
    removeMutation.mutate(id);
  }, [removeMutation]);

  return {
    savedKeywords,
    isLoading,
    addKeyword,
    removeKeyword,
  };
};