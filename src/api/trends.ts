import { ViralPost } from "@/lib/mock-data";
import { supabase } from "@/integrations/supabase/client";

// NOTE: Replace 'agslsrysuytnjofjxcfy' with your actual Supabase Project ID if it changes.
const SUPABASE_PROJECT_ID = 'agslsrysuytnjofjxcfy';
const EDGE_FUNCTION_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/fetch-trends`;

/**
 * Fetches viral posts by calling the secure Supabase Edge Function.
 * @param keyword The topic keyword to search for.
 * @returns A promise resolving to an array of ViralPost data.
 */
export async function fetchViralPosts(keyword: string): Promise<ViralPost[]> {
  console.log(`[API] Calling Edge Function for keyword: "${keyword}"`);
  
  // We use the standard fetch API here to call the deployed Edge Function URL
  // and pass the current user's JWT token for authentication.
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error("User session not found. Please log in.");
  }

  const response = await fetch(EDGE_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ keyword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Edge Function Error Response:", errorData);
    throw new Error(`Failed to fetch trends: ${errorData.error || response.statusText}`);
  }

  const data = await response.json();
  
  // The Edge Function returns an array of ViralPost objects directly.
  return data as ViralPost[];
}