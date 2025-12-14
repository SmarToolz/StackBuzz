import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  // Manual authentication handling (since verify_jwt is false)
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Missing Authorization header' }), { 
      status: 401, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
  
  // In a real scenario, you would verify the JWT here.
  // For this example, we'll assume the presence of a token is enough for a basic check.

  try {
    // Parse the request body to get the keyword
    const { keyword } = await req.json();

    if (!keyword) {
        return new Response(JSON.stringify({ error: 'Missing keyword in request body' }), { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }

    // --- Placeholder for actual external API call (e.g., Apify) ---
    // Replace this with your actual scraping logic later.
    const mockResponse = [
        { id: 10, title: `Real Trend: ${keyword} is exploding!`, author: "@DataBot", subscribers: "100k", commentCount: 999 },
        { id: 11, title: `The future of ${keyword} in 2025`, author: "@FutureWriter", subscribers: "50k", commentCount: 500 },
    ];

    return new Response(JSON.stringify(mockResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})